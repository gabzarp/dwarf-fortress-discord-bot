const mongoose = require("../database/mongodb.js");
const FortressLevel = new mongoose.Schema({
    level: {type: Number, default: 1},
    building: {type: mongoose.Schema.Types.ObjectId, ref: "Building"},
    progressNextLevel: {type: Number, default: 0},
    totalToNextLevel: {type: Number, default: 5},
});
module.exports = mongoose.model("FortressLevel", FortressLevel);