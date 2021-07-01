const db = require('quick.db');
const warnings = require('./warnings');

module.exports = {
    name: "deletewarns",
    description: "Delete a member's warns",


    async run (client, message, args){
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('Ehhez nincs jogod!');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Jelölj meg valakit vagy írd le az ID-jét ha nem tudod akkor !Userinfo! ');

        if(user.bot) return message.channel.send('BOT-ot nem tudtsz figyelmeztetni!');

        if(user.id === message.author.id) return message.channel.send('You can\'t clear your own warnings');

        if(warnings === null) return message.channel.send(`**${user.username}-nak/nek nincs warnja**`);


        db.delete(`warnings_${message.guild.id}_${user.id}`);

        message.channel.send('Sikeres törlés!')
    }
}