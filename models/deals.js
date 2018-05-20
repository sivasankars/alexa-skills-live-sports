var mongoose = require('mongoose');

var dealSchema = new mongoose.Schema({
    user: { type: String },
    deal: { type: Number }
}, { timestamps: true });

var notification = module.exports = mongoose.model('deals', dealSchema);