const Discord = require('discord.js')
const urban = require('urban.js')

module.exports = {
    name: "urban",
    category: "utility",
  description: "Shows you a deffinition from urban dictionary",
  usage: "COMMAND [your word]",
  run: async (client, message, args) => {
  //command
  const bargs =  message.content.split(' ');
  const searchString = bargs.slice(1).join(' ')
  if(!searchString)return message.channel.send(`Kérlek adj meg egy szót!`)
  
  
  
urban(searchString).then(urbans=>{
  
  message.channel.send({embed: {
          
      description: `__**${urbans.word}**__\n\n**Meghatározás:**\n${urbans.definition}\n\n**Példa:**\n${urbans.example}\n\n**Tags:** ${urbans.tags}\n\n👍 **${urbans.thumbsUp}** *Like* **|** 👎 **${urbans.thumbsDown}** *Dislike*`,
      author: {
          name: message.author.username,
          icon_url: message.author.avatarURL,
      },
      color: 0xff0000,
  

      timestamp: new Date(),
  
  }
})
})

  }
  };