var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
    username: {unique: true, required: true, type: String},
    password: {required: true, type: String},
    pins: [Schema.Types.ObjectId]
}));