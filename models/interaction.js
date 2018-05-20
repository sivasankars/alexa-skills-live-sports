var mongoose = require('mongoose');

var interactionSchema = new mongoose.Schema({
    name: String,
    seq: { type: Number, default: 0 }
}, { timestamps: true });

var notification = module.exports = mongoose.model('interaction', interactionSchema);