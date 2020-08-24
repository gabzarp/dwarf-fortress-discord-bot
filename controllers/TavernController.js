const Dwarf = require('../models/Dwarf')

const tavernController = {
    tavern: async (message, args)=>{
        if (typeof tavern[args[1]] !== 'undefined') {
            tavern[args[1]](message, args)
        }
        else{
            message.channel.send(`You can buy drinks at the taverns typing "#tavern buy beer"`);
        }
    },
    buy: async (message, args)=>{
        if (typeof inventory[args[2]] !== 'undefined') {
            var dwarf = await Dwarf.findOne({userId: message.author.id})

            if (dwarf.money < inventory[args[2]]) {
                message.channel.send(`You don't have enought money to buy ${args[2]}`);
            }
            else{
                dwarf.money = dwarf.money - inventory[args[2]];
                dwarf.stamina = 3;
                dwarf.save()
                message.channel.send(`The euphoria of alcohol fills your stamina`);
            }
        }
        else{
            if (typeof args[2] === 'undefined') {
                message.channel.send(`Please type your order.`);
            }
            else{
                message.channel.send(`Sorry but we do not serve ${args[2]} here.`);
            }
        }
    }
}
const tavern = {
    'buy': tavernController.buy
}
const inventory = {
    'beer': 10
}
module.exports = tavernController;