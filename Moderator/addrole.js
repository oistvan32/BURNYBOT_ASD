const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "addrole",
  aliases: ["role", "P!role"],
  category: "<:mod:789590144650051604> moderation",
  description: "Add role to any user",
  run: async (client, message, args) => {
   if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Bocsánat nincs jogod szerkeszteni a rangokat! ");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to mute");
    } 
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)
    
    let arole = message.mentions.roles.first();
    
    if(!arole) return message.reply(`HIBA! Kérlek adj megy egy rangot!`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      
      .setColor("#ff0000")
      .setDescription(` ${target.user.username}-nek/nak oda lett adva: ${arole} nevű rang!`)
      
      await message.channel.send(embed)
      
      target.roles.add(arole)
    
  }
}