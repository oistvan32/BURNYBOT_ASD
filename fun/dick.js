const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../color.js");


module.exports = {
  name: "pp",
  aliases: ["dick", "pp", "ppsize"],
  description: "Show Member PP Size!",
  usage: "Dicksize <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    let sizes = [
      "8D",
      "8=D",
      "8==D",
      "8===D",
      "8====D",
      "8=====D",
      "8======D",
      "8=======D",
      "8========D",
      "8=========D",
      "8==========D",
      "8===========D",
      "8============D",
      "8=============D",
      "8==============D",
      "8===============D",
      "8================D",
      "8==================D"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = sizes[Math.floor(Math.random() * sizes.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Pp Machine`)
      .setDescription(`${Member.user.username} pénisze\n${Result}`)
      .setFooter(`Által kért:${message.author.username}`)
      .setColor("#ff0000")
      .setTimestamp();


    message.channel.send(embed);

    //End
  }
};