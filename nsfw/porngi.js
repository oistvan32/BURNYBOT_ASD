const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();
module.exports = {
 name: "pgif",
 description: "drop Porn git ",
 run: async (client, message, args) => {
   if (message.channel.nsfw) {
	const image = await nsfw.pgif();
	const embed = new Discord.MessageEmbed()
   		 .setTitle(`Porno gif`)
    		.setColor("ff0000")
    		.setImage(image);
			message.channel.send(embed);
   } else { 
	   message.channel.send("Ez nem NSFW csatorna!");
   }
  }
}