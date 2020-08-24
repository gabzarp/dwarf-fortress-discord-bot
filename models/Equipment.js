const mongoose = require("../database/mongodb.js");
const Equipment = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['mine', 'attack', 'defense']},
    slot: { type: String, required: true, enum: ['weapon', 'pickaxe', 'helmet', 'armor', 'shield']},
    value: { type: Number, required: true}
});
module.exports = mongoose.model("Equipment", Equipment);