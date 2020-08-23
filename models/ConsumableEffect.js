const mongoose = require("../database/mongodb.js");
const ConsumableEffect = new mongoose.Schema({
    attribute: { type: String, required: true},
    effect: {type: Number, required: true},
});
module.exports = mongoose.model("ConsumableEffect", ConsumableEffect);