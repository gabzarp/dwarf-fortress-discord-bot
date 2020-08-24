const Dwarf = require('../models/Dwarf')

const dropChance = {
    'copper': 30,
    'iron': 10,
    'mithrill': 1,
    'diamond': 0.5
}
const dropPrice = {
    'copper': 10,
    'iron': 20,
    'mithrill': 50,
    'diamond': 200
}

const lootController ={
    digLayerLoot: async (layers, message)=>{
        try {
            var loot_layer = await getLoot(layers);
            if (loot_layer.length <= 0) {
                return null
            }
            var reducer = async function(tally, vote) {
            if (!tally[vote]) {
                tally[vote] = 1;
            } else {
                tally[vote] = tally[vote] + 1;
            }
                return tally;
            }
            drops = await loot_layer.reduce(reducer, {})

            var stringLoot = '';
            var lootTotal = await Object.keys(drops).reduce(async (total, actual, index, mineral)=>{
                if (typeof total !== 'number') {
                    total = 0;
                }
                stringLoot = stringLoot + `${actual.charAt(0).toUpperCase() + actual.slice(1)} ${drops[actual]}x `
                return total + drops[actual] * dropPrice[actual]
            }, Promise.resolve())
            await Dwarf.findOneAndUpdate({userId: message.author.id}, {$inc : {money: lootTotal}})
            return {lootTotal, stringLoot}
        } catch (error) {
            console.log(error)
        }
    }
}
async function getLoot(layers){
    loot_layer = [];
    for (let index = 0; index < layers; index++) {
        Object.keys(dropChance).forEach((mineral, dropRate) => {
            if (dropChance[mineral] * actual_level.level >= (Math.random() * 100)) {
                loot_layer.push(mineral)
            }
        });  
    }
    return loot_layer;
}
module.exports = lootController;