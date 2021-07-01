const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async run (client, message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('HIBÁS! Kérlek add meg az országot pl.: covid all || covid Hungary)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Világ COVID-19 statisztika 🌎`)
                .addField('Igazolt esetek', confirmed)
                .addField('Felépült', recovered)
                .addField('Halottak', deaths)
                .setColor("#ff0000")


                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 statisztika **${countries}**`)
                .addField('Igazolt esetek', confirmed)
                .addField('Felépült', recovered)
                .addField('Halottak', deaths)
                .setColor("#ff0000")


                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Helytelen ország!')
            })
        }
    }
}