const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "utility",
description: "Shows info about a server",
usage: "[command]",
run: async (client, message, args) => {
//command
let servericon = message.guild.iconURL;
let serverembed = new Discord.MessageEmbed()
.setTitle("Szerver info")
.setColor("#ff0000")
.setThumbnail(servericon)
.addField("Server neve", message.guild.name)
.addField("Tulajdonos", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
.addField("Csatornák", message.guild.channels.cache.size, true)
.addField("Rangok", message.guild.roles.cache.size, true)
.addField("Létrehozva", message.guild.createdAt)
.addField("Mikor léptél be", message.member.joinedAt)
.addField("Összes tag", message.guild.memberCount)
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL);
message.channel.send(serverembed);
}
};