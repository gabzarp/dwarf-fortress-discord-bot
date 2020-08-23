const mongoose = require("../database/mongodb.js");
const Consumable = require("./Consumable");
const Dwarf = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true},
    money: {type: String},
    strength: {type: Number, default: 1},
    stamina: {type: Number, default: 100},
    consumables:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Consumable"}],
});
module.exports = mongoose.model("Dwarf", Dwarf);