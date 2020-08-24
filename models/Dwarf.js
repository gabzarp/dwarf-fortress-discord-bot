const mongoose = require("../database/mongodb.js");
const Consumable = require("./Consumable");
const Dwarf = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true},
    money: {type: Number, default: 0},
    strength: {type: Number, default: 1},
    stamina: {type: Number, default: 3},
    consumables:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Consumable"}],
    equipments:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment"}],
});
module.exports = mongoose.model("Dwarf", Dwarf);