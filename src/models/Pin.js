var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("Pin", new Schema({
    title: {required: true, type: String},
    author: {required: true, type: String},
    src: {required: true, type: String},
    date: {required: true, type: Date, default: Date.now}
}));