const Fortress = require('../models/Fortress')
const Building = require('../models/Building')
const Level = require('../models/FortressLevel')
const Discord = require('discord.js');

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
        var level = await Level.create({ level: fortress.levels.length + 1, totalToNextLevel: (fortress.levels.length + 1) * 50})
        if (level.level == 1) {
            var building = await Building.create({name: "Tavern"})
            level.building = building;
            level.save()
        }
        fortress.levels.push(level)
        fortress.save()
        return level;
    },
    levels: async(message)=>{
        var fortress = await Fortress.findOne({serverId: message.guild.id}).populate({path: 'levels', populate: { path: "building" } })
        console.log(fortress)
        var levels = fortress.levels.map(level => {
            console.log(level)
            return {name: `Level: ${level.level}`, value: `[ ${typeof level.building.name !== "undefined" ? level.building.name.toUpperCase() : 'EMPTY BUILDING'} ]`}
        });
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(fortress.name)
        .addFields(
            levels
        )
    
        message.channel.send(exampleEmbed);
    }
}
module.exports = fortressController;