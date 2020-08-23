const Fortress = require('../models/Fortress')
const Level = require('../models/FortressLevel')
var errors = {
    11000: 'This user already has an Dwarf'
}
const fortressController = {
    createFortress: async (guild)=>{
        try {
            await Fortress.create({name: guild.name, serverId: guild.id})
        } catch (error) {
            console.log(error)
            message.channel.send(errors[error.code]);
        }
    },
    nextLevel: async (message)=>{
        var fortress = await Fortress.findOne({serverId: message.guild.id})
        var level = await Level.create({ level: fortress.levels.length + 1})
        fortress.levels.push(level)
        fortress.progressNextLevel = 0;
        fortress.save()
    }
}
module.exports = fortressController;