const mongoose = require("../database/mongodb.js");
const FortressLevel = new mongoose.Schema({
    level: {type: Number},
    building: {type: mongoose.Schema.Types.ObjectId, ref: "Building"},
});
module.exports = mongoose.model("FortressLevel", FortressLevel);