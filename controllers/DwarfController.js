const Dwarf = require('../models/Dwarf')
const Fortress = require('../models/Fortress')
const FortressController = require('../controllers/FortressController')
var errors = {
    1: "Not enought stamina, hop into the tavern or wait the resting time",
    11000: 'This user already has an Dwarf',
    
}
const dwarfController = {
    start: async (message, args)=>{
        try {
            var dwarf = await Dwarf.create({name: args[2],userId: message.author.id})
            message.channel.send(`Welcome home ${dwarf.name}, grab a pickaxe and let's start digging!`);
        } catch (error) {
            console.log(error)
            message.channel.send(errors[error.code]);
        }
    },
    dig: async (message, args)=> {
        try {
            var dwarf = await Dwarf.findOne({userId: message.author.id})
            if (dwarf.stamina < 10) {
                let error = new Error('Not enough stamina')
                error.code = 1
                throw error
            }
            dwarf.stamina += -10;
            dwarf.save()
            var fortress = await Fortress.findOneAndUpdate({serverId: message.guild.id}, {$inc: {progressNextLevel: dwarf.strength}}, {new: true})
            console.log(fortress)
            if (fortress.progressNextLevel > 100) {
                FortressController.nextLevel(message);
                message.channel.send(`Magnificent! ${dwarf.name} broke throught the next level.`);
                return;
            }
            message.channel.send(`Dig we must. ${dwarf.name} ventured into the tunnels to do some digging. Next level progress: ${fortress.progressNextLevel}/100`);
        } catch (error) {
            console.log(error)
            message.channel.send(errors[error.code]);
        }
    }
}
module.exports = dwarfController;