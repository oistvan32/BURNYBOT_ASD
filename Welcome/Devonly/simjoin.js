const Discord = require('discord.js');

module.exports = {
    name: "simjoin",
    description: "simulates a join!",

    async run (bot, message, args) {
        if(message.author.id != "857211754604658698") return;
        bot.emit('guildMemberAdd', message.member);
    },
}