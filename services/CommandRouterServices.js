const { start, dig } = require('../controllers/DwarfController.js')

const routes = {
    'start' : start,
    'dig': dig
}

const router = {
    router: (message)=>{
        if(message.author.bot) return;
  
        if(message.content.toLowerCase().indexOf(global.config.prefix.toLowerCase()) !== 0) return;
        const args = message.content.slice(global.config.prefix.length).split(" ");
        routes[args[1]](message, args)
    }
}
module.exports = router