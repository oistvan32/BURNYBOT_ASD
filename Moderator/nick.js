const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Kérlek adj megy egy embert!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Kérlek add meg a nevet!");

    if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Nincs hozzá jogod! ')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    try {
      member.setNickname(arguments);
    } catch (err) {
      console.log(err);
      message.reply(
        "Nincsen jogom át írni a nevét!  " + member.toString() + ""
      );
    }
  },
};