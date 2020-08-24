const mongoose = require("../database/mongodb.js");
const Building = new mongoose.Schema({
    name: { type: String, required: true },
    materials_stock:  [{ type: mongoose.Schema.Types.ObjectId, ref: "MaterialStock"}]
});
module.exports = mongoose.model("Building", Building);