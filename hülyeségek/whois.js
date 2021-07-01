const Discord = require("discord.js")

module.exports = {
name: "whois",
aliases: ["info"],
category: "utility",
description: "Get information about a user",
usage: "[command | user] or [command]",
run: async (client, message, args) => {
//command

{
const user = message.mentions.users.first();
if(!user)
    return message.reply('Kérlek adj meg egy embert!');

var playing = ("[ " + user.presence.activities + " ]")

const whothefuq = new Discord.MessageEmbed()
      .setTitle("Fiók Info:")
      .addField("Teljes név", `${user.tag}`)
      .addField("ID", user.id)
      .addField("Játszik",playing, true)
      .addField("Státusz", `${user.presence.status}`, true)
      .addField("Fiók létrehozva", user.createdAt)
      .setColor("#ff0000")
      .setTimestamp()
      .setThumbnail(user.avatarURL())  
  message.channel.send(whothefuq)

};
}
   


};