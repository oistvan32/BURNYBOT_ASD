module.exports = {
    name: "voicekick",
    category: "<:mod:789590144650051604> moderation",
    run: async (client, message, args) => {
      if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
        return message.channel.send(
          "Nincs jogom ki rúgni a voicból!"
        );
  
      if (!message.mentions.members.first())
        return message.channel.send(
          `Kérlek adj meg egy embert aki bent van a hang csatornában!`
        );
  
      let { channel } = message.mentions.members.first().voice;
  
      if (!channel)
        return message.channel.send(`User nincs bent egy hang csatornában sem!`);
  
      message.mentions.members.first().voice.kick();
      
      message.channel.send(`User ki lett rúgva a hang csatornából!`)
    }
  };