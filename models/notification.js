var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    message: String
}, { timestamps: true });

var notification = module.exports = mongoose.model('notification', notificationSchema);