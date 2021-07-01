const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('Nincs hozzá jogod! ');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Jelölj meg valakit vagy írd le az ID-jét! ');

        if(user.bot) return message.channel.send('BOT-ot nem tudtsz figyelmeztetni!');

        if(message.author.id === user.id) return message.channel.send('Saját magad NEM tudod warnolni!');

        if(message.guild.owner.id === user.id) return message.channel.send('A szerver tulajdonosát NEM tudod figyelmeztetni!');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3) return message.channel.send(`${user} elérte a 3 figyelmeztetést!`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`Figyelmeztetve lettél ${message.guild.name}! Ezzel az indokkal:  \`${reason}\``)
            await message.channel.send(`**${user.username}** figyelmeztetve lett!`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`Figyelmeztetve lettél ${message.guild.name}! Ezzel az indokkal: \`${reason}\``)
            await message.channel.send(`**${user.username}** figyelmeztetve lett!`)
        }
    }
}