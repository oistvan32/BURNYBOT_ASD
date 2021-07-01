const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "rickastley",
    category: "fun",
    description: "rick astley",
    run: async (client, message, args) => {
        let EMBED = new MessageEmbed()
            .setTitle("Did someone say rick astley???")
            .setColor(1127128)
            .setThumbnail("https://i.imgur.com/zPhDUWm.jpeg")
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setDescription('https://youtu.be/dQw4w9WgXcQ')
        message.channel.send(EMBED)
    }

}