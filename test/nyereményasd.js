const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "gstart",
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "<:givewa:787595464925118505>giveaway",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`Kérlek add meg az időt!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `HIBA! Nem adtál meg időt!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Ez nem szám!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Kérlek adj meg egy valódi csatornát!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Nincsen ajándék!`);
    message.channel.send(`*Nyereményjáték kész a ${channel} csatornában!*`);
    let Embed = new MessageEmbed()
      .setTitle(`🎉Új nyereményjáték!🎉`)
      .setDescription(
        `${message.author} hozott nektek egy nyereményjátékot aminek az ajándéka: **${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`#ff0000`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `<a:Party:743831237684363324>Not enough people reacted for me to start draw a winner!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `A nyertes aki meg kapja: **${prize}**-t nem más mint... ${winner}!!! 🎉GRATULÁLOK!🎉`
      );
    }, ms(args[0]));
  },
};