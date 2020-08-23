const mongoose = require("../database/mongodb.js");
const Consumable = new mongoose.Schema({
    name: { type: String, required: true },
    effect:  [{ type: mongoose.Schema.Types.ObjectId, ref: "ConsumableEffect"}],
});
module.exports = mongoose.model("Consumable", Consumable);