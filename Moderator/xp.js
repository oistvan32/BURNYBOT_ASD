const Discord = require(`discord.js`);
const Fs = require('fs');

module.exports = {
    name: "level",
    catgory: "xp",
    description: "Megtudod nézni a szintedet",
    run: async (bot, message, args) => {

            let UserJSON = JSON.parse(Fs.readFileSync("./DB/xp.json"));
            let mentioned = message.mentions.members.first();


            if (mentioned) {
                if (!UserJSON[mentioned.id]) {
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**HOPPÁ!**");
                    ErrorEmbed.setColor("#ff0000")
                    ErrorEmbed.setDescription("Nem találom az adott felhasználót!");
                    message.channel.send(ErrorEmbed);
                    return;
                }
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**Szint**");
                SuccessEmbed.setColor("#ff0000")
                SuccessEmbed.addField("XP:", `${UserJSON[mentioned.id].xp}`);
                SuccessEmbed.addField("Szint:", `${UserJSON[mentioned.id].level}`);
                message.channel.send(SuccessEmbed);
                return;
            } else {
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**Szint**");
                SuccessEmbed.setColor("#ff0000")
                SuccessEmbed.addField("XP", `${UserJSON[message.author.id].xp}`);
                SuccessEmbed.addField("Szint", `${UserJSON[message.author.id].level}`);
                message.channel.send(SuccessEmbed);
                return;
        }
    }
}
