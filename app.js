var express = require("express");
var path = require("path");
var alexa = require("alexa-app");
var mongoose = require('mongoose');
var notification = require('./models/notification');
var session = require('./models/sessions');
var interaction = require('./models/interaction');
var deal = require('./models/deals');
var bodyParser = require('body-parser');
var async = require('async');

var PORT = process.env.PORT || 8080;
var app = express();

// Create the database connection 
mongoose.connect('mongodb://139.59.20.225/alexa');
mongoose.connection.on('connected', function () { console.log('Mongoose default connection open '); });
mongoose.connection.on('error', function (err) { console.log('Mongoose default connection error'); });
mongoose.connection.on('disconnected', function () { console.log('Mongoose default connection disconnected'); });

var alexa = new alexa.app("alexa");
app.use(bodyParser.json())
app.use(express.static('src'))
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
app.set("view engine", "ejs");

var alexa = require('./alexa/index.js')(app, alexa);

app.post('/notification', (req, res) => {
    notification.create({
        message: req.body.message
    }, function (err, notification) {
        res.send(notification);
    });
});

app.get('/notifications', (req, res) => {
    notification.find({}, {}, { sort: { 'createdAt': -1 } }, function (err, notifications) {
        res.send(notifications);
    });
});

app.get('/users', (req, res) => {
    session.find({}, {}, { sort: { 'createdAt': -1 } }, function (err, notifications) {
        res.send(notifications);
    });
});

app.get('/dashboard', (req, res) => {
    async.parallel({
        session: function (callback) {
            session.count({}, function (err, data) {
                callback(err, data);
            });
        },
        notification: function (callback) {
            notification.count({}, function (err, data) {
                callback(err, data);
            });
        },
        interaction: function (callback) {
            interaction.findOne({}, {}, {}, function (err, interaction) {
                var data = interaction.seq;
                callback(err, data);
            });
        },
        deal: function (callback) {
            deal.count({}, function (err, data) {
                callback(err, data);
            });
        }
    }, function (err, results) {
        res.send(results);
    });
});


app.listen(PORT, () => console.log("Listening on port " + PORT + "."));