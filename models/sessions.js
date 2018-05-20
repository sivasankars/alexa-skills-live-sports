var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    session: { type: String, index: { unique: true } }
}, { timestamps: true });

var notification = module.exports = mongoose.model('session', sessionSchema);