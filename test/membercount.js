const discord = require("discord.js");

module.exports = {
  name: "membercount",
  category: "<:info:773053660380135424>info",
  description: "Get your id",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(
    `
Mindenki - ${message.guild.memberCount}
Tagok - ${message.guild.members.cache.filter(m => !m.user.bot).size}
Botok - ${message.guild.members.cache.filter(m => m.user.bot).size}`)
    .setColor("ff0000")
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
  }
}