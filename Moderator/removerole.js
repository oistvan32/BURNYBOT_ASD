const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "<:mod:789590144650051604> moderation",
  description: "Remove role from any user",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.reply(`HIBA! Kérlek adj meg egy rangot!`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("ff0000")
      .setDescription(`${rrole} rang elvéve ${target}-től/tól`)
      .setFooter(`Rangot el vette: ${message.author.username}`)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}