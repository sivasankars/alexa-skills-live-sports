var AmazonSpeech = require('ssml-builder/amazon_speech');
var session = require('../models/sessions');
var notification = require('../models/notification');
var deal = require('../models/deals');
var interaction = require('../models/interaction');

var applicationId = "amzn1.ask.skill.3b3e8d22-cea6-41f8-9066-d844fdcfc0fc";

module.exports = function (app, alexa) {

  alexa.express({
    expressApp: app,
    checkCert: false,
    debug: true
  });

  alexa.pre = function (request, response, type) {
    if (request.sessionDetails.application.applicationId !== applicationId) {
      // Fail ungracefully
      throw 'Invalid applicationId: ' + request.sessionDetails.application.applicationId;
    }

    var user = request.userId;
    session.create({ session: request.userId }, function (err, session) { });
    //interaction.create({ seq: 1 }, function (err, interaction) { console.log("ddsadsad", err, interaction); });
    interaction.findOneAndUpdate({ name: 'counter' }, { $inc: { seq: 1 } }, function (err, interaction) { });
  };

  alexa.error = function (exception, request, response) {
    response.say("Sorry, something is wrong on interactive sports services, Try again");
  };

  alexa.launch(function (request, response) {
    var speech = new AmazonSpeech()
      .say('Welcome to Codeworx, ')
      .pause('1s')
      .say('We provide the interactive sports services');
    var speechOutput = speech.ssml();
    response.say(speechOutput);
  });

  alexa.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
    function (request, response) {
      var helpOutput = "You can say 'some statement' or ask 'some question'. You can also say stop or exit to quit.";
      var reprompt = "What would you like to do?";
      // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
      response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
    }
  );

  alexa.intent("ScoreUpdate", function (request, response) {
    return notification.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, notifications) {
      response.say(notifications.message);
    });
  });

  alexa.intent("LetsPlay", {
    "dialog": {
      type: "delegate"
    },
    "slots": {
      "score": "AMAZON.NUMBER"
    },
    "utterances": ["{score}"]
  },
    function (request, response) {
      if (request.confirmationStatus == 'CONFIRMED') {
        var data = {};
        data.user = request.userId;
        data.deal = request.slot("score");
        deal.create(data, function (err, dealdata) { });
        response.say("Thank you, We have recorded that your guess for next over run as " + data.deal + ". Once your guess is right, your account will be credited with 1$ automatically.");
      } else if (request.confirmationStatus == 'DENIED') {
        response.say("We have discarded your guess, Try playing again");
      } else {
        response.say("Try playing again");
      }
    }
  );

}