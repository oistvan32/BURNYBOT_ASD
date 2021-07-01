const Discord = require('discord.js')
const { Color } = require("../../color.js");

module.exports = {
    name: "8ball",
    description: "8ball command",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Kérlek írd le a kérdésed!')
        let replies = ["Igen...", "Az Outlook jónak tűnik.", "yus", "természetesen!", "Igen határozottan!", "No....", "Jobb, ha most nem mondod el.", "Outlook nem olyan jó....", "nah", "SOHA!!!!", "Most nem lehet megjósolni", "Nem tudom...", "Én szerintem *yet*...", "Nem esély", "Azt hiszem", "Csak ma!", "Ma nem :c", "Sajnos igen....", "Sajnos nem....", "Talán!?", "Kérdezd újra .. Később ."];
        
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
        .setAuthor(`🎱 ${message.author.username}`)
        .setColor("#ff0000")
        .addField("Kérdés:", question)
        .addField("Válasz:", replies[result])

        message.channel.send(ballembed)
    }
}