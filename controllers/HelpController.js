
const helpController = {
    help: async (message)=>{
        message.channel.send("#start 'yourname'; #dig; #tavern");
    }
}
module.exports = helpController;