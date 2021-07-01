const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "resetnick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Kérlek adj megy egy embert!");

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "Nincs jogom  " + member.toString() + " nickname!"
      );
    }
  },
};