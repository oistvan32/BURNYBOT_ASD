const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "foxgirl",
  category: "SFW",
  description: "sends random foxgirl",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

        async function work() {
        let owo = (await neko.sfw.foxGirl());

        const foxGirl = new Discord.MessageEmbed()
        .setTitle("Véletlen Fox Girl")
        .setImage(owo.url)
        .setColor(`#ff0000`)
        .setURL(owo.url);
        message.channel.send(foxGirl);

}

      work();
}
                };