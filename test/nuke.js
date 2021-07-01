const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");

module.exports = {
	name: "rthkljlrhnernjegjrbnbghbhz2bh43bhj534bh54hbbhfSFegtwdvadgAgvjwdfbghebohebklejnblejnbeh3bhjrbh3j45343bhj43bhj43bh4334343343",
	usage: `${prefix}nuke`,
	description: "delete and clone channel",
	run: async(client, message ) => {
		if(message.member.hasPermission("MANAGE_CHANNELS")) {
			message.channel.clone();
			message.channel.delete();
			
		} else { 
			message.channel.send("you don't have the permission for that ! (manage channel)")}
	}

}