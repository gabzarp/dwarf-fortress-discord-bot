const { start, dig, getPlayerMoney } = require('../controllers/DwarfController.js')
const { levels } = require('../controllers/FortressController.js')
const { help } = require('../controllers/HelpController.js')
const { tavern } = require('../controllers/TavernController.js')

const routes = {
    'start' : start,
    'dig': dig,
    'help': help,
    'levels': levels,
    'money': getPlayerMoney,
    'tavern': tavern
}

const router = {
    router: (message)=>{
        if(message.author.bot) return;
  
        if(message.content.toLowerCase().indexOf(global.config.prefix.toLowerCase()) !== 0) return;
        const args = message.content.slice(global.config.prefix.length).split(" ");
        if(typeof routes[args[0]] !== 'undefined' ){
            routes[args[0]](message, args)
        }
        else{
            message.channel.send(`This command don't exist. Try #help for the list them`);
        }
    }
}
module.exports = router