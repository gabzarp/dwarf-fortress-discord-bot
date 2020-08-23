const mongoose = require("../database/mongodb.js");
const Building = new mongoose.Schema({
    name: { type: String, required: true },
});
module.exports = mongoose.model("Building", Building);