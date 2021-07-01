const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "animesearch",
  category: "utility",
description: "Get info about an anime",
usage: "[command | Anime]",
run: async (client, message, args) => {
//command
const search = `${args}`;
if(!search)
return message.reply('Kérlek add meg az anime címét!');

malScraper.getInfoFromName(search)
  .then((data) => {
  const malEmbed = new Discord.MessageEmbed()
    .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
    .setThumbnail(data.picture)
    .setColor('#ffc1cc') //I personally use bubblegum pink!
    .addField('Angol cím', data.englishTitle, true)
    .addField('Japanese cím', data.japaneseTitle, true)
    .addField('Típus', data.type, true)
    .addField('Epizódok', data.episodes, true)
    .addField('Értékelés', data.rating, true)
    .addField('Ki adva', data.aired, true)
    .addField('Pontszám', data.score, true)
    .addField('Pontszámstatisztika', data.scoreStats, true)
    .addField('Link', data.url);

    message.channel.send(malEmbed);

  })
}
};