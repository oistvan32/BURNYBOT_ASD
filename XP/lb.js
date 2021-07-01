const Discord = require(`discord.js`);
const Fs = require('fs');

module.exports = {
    name: "lb",
    catgory: "xp",
    description: "Ranglista az xp szintekről",
    run: async (bot, message, args) => {

            let UserJSON = JSON.parse(Fs.readFileSync("./DB/xp.json"));
            let mentioned = message.mentions.members.first();

            var Sorted = Object.entries(UserJSON).sort((a, b) => b[1].bal - a[1].level);
            if (Sorted.length > 10) Sorted = Sorted.slice(0, 10);
          
            var LBString = "";
            Sorted.forEach(user => {
                LBString += `${bot.users.cache.find(u => u.id == user[0])} - ${user[1].level}\n`;
            });
            var LBEmbed = new Discord.MessageEmbed()
                LBEmbed.setColor("#ff0000")
                LBEmbed.setTitle("**Ranglista**")
                LBEmbed.setDescription(LBString);
                LBEmbed.setFooter(bot.user.username, bot.user.displayAvatarURL())
                LBEmbed.setTimestamp();
            message.channel.send(LBEmbed);
    }
}