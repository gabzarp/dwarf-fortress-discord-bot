const Dwarf = require('../models/Dwarf')
const Fortress = require('../models/Fortress')
const FortressController = require('../controllers/FortressController')
const { digLayerLoot } = require('../controllers/LootController')
var errors = {
    1: "Not enought stamina, hop into the tavern or wait the resting time",
    2: "You don't have a dwarf yet.",
    11000: 'This user already has an Dwarf',
    
}

const dwarfController = {
    start: async (message, args)=>{
        try {
            var dwarf = await Dwarf.create({name: args.slice(1).join(" "),userId: message.author.id})
            message.channel.send(`Welcome home ${dwarf.name}, grab a pickaxe and let's start digging!`);
        } catch (error) {
            console.log(error)
            message.channel.send(errors[error.code]);
        }
    },
    dig: async (message, args)=> {
        try {
            var dwarf = await Dwarf.findOne({userId: message.author.id})
            if (!dwarf) {
                let error = new Error("You don't have a dwarf yet.")
                error.code = 2
                throw error
            }
            if (dwarf.stamina <= 0) {
                let error = new Error('Not enough stamina')
                error.code = 1
                throw error
            }

            dwarf.stamina -= 1;
            dwarf.save()

            var fortress = await Fortress.findOne({serverId: message.guild.id}).populate('levels')
            actual_level = fortress.levels.slice(-1).pop()
            if (!actual_level || actual_level.progressNextLevel >= actual_level.totalToNextLevel ) {
                var newLevel = await FortressController.nextLevel(message);
                message.channel.send(`Magnificent! ${dwarf.name} broke throught the next level (${newLevel.level}).`);
            }
            else{
                actual_level.progressNextLevel += dwarf.strength;
                actual_level.save()
                message.channel.send(`Dig we must. ${dwarf.name} ventured into the tunnels to do some digging. Current Level: ${actual_level.level}. Next level progress: ${actual_level.progressNextLevel}/${actual_level.totalToNextLevel}`);
            }
            var loot = await digLayerLoot(dwarf.strength, message)
            if (!loot) {
                message.channel.send(`Unfortunaly you couldn't get anything of value`)
                return;
            }
            message.channel.send(`Looted: ${loot.stringLoot}. Loot money: ${loot.lootTotal} gold pieces.`)
            return;
       
        } catch (error) {
            console.log(error)
            message.channel.send(errors[error.code]);
        }
    },
    getPlayerMoney: async (message, args)=>{
        var dwarf = await Dwarf.findOne({userId: message.author.id});
        message.channel.send(`${dwarf.money} gold coins`)

    }
}
module.exports = dwarfController;