const mongoose = require("../database/mongodb.js");
const Fortress = new mongoose.Schema({
    name: { type: String, required: true },
    serverId: { type: String, required: true, unique: true},
    levels:  [{ type: mongoose.Schema.Types.ObjectId, ref: "FortressLevel"}],
});
module.exports = mongoose.model("Fortress", Fortress);