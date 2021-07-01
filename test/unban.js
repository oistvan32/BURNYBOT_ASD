const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Unban A Member!",
  usage: "Unban <Member ID>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `Nincs elegendő jogóm `
      );

    if (!args[0])
      return message.channel.send(
        `Kérlek add meg az ID-jét`
      );

    if (isNaN(args[0])) return message.channel.send(`Kérlek igazi ID-t adj meg!`);

    if (args[0] === message.author.id)
      return message.channel.send(`Ő már unbannolva van vagy nem is volt kitiltásban része! `);

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send(`Server Owner Is Already Unban!`);

    if (args[0] === client.user.id)
      return message.channel.send(`I Am Already Unban!`);

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send(
        "Kérlek olyan ID-t adj meg aki nincs ki bannolva!"
      );

    let Reason = args.slice(1).join(" ") || "Nincsen indok!";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send(
        `Nem tudom unbannolni mert nincs bannolva!`
      );
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member Unbanned!`)
      .setColor("#ff0000")
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}}`)
      .addField(`Unbanned Member`, `${Member.user.tag} (${Member.user.id}`)
      .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};