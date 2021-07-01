const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/rule34lol/.json?limit=100'
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nsfw',
    description: 'wdy think',
    run: async (client, message, args) => {

        if (message.channel.nsfw) {
            https.get(url, (result) => {
                var body = ''
                result.on('data', (chunk) => {
                    body += chunk
                })

                result.on('end', () => {
                    var response = JSON.parse(body)
                    var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                    if (index.post_hint !== 'image') {

                        var text = index.selftext
                        const textembed = new Discord.MessageEmbed()
                            .setTitle(subRedditName)
                            .setColor(1127128)
                            .setDescription(`[${title}](${link})\n\n${text}`)
                            .setURL(`https://reddit.com/${subRedditName}`)
                            .setTimestamp()
                            .setFooter(`Requsted by ${message.author.username}!`, "https://i.imgur.com/zPhDUWm.jpeg")

                        message.channel.send(textembed)
                    }

                    var image = index.preview.images[0].source.url.replace('&amp;', '&')
                    var title = index.title
                    var link = 'https://reddit.com' + index.permalink
                    var subRedditName = index.subreddit_name_prefixed

                    if (index.post_hint !== 'image') {
                        const textembed = new Discord.MessageEmbed()
                            .setTitle(subRedditName)
                            .setColor(1127128)
                            .setDescription(`[${title}](${link})\n\n${text}`)
                            .setURL(`https://reddit.com/${subRedditName}`)
                            .setTimestamp()
                            .setFooter(`Requsted by ${message.author.username}!`, "https://i.imgur.com/zPhDUWm.jpeg")
                        message.channel.send(textembed)
                    }
                    console.log(image);
                    const imageembed = new Discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setImage(image)
                        .setColor(1127128)
                        .setDescription(`[${title}](${link})`)
                        .setURL(`https://reddit.com/${subRedditName}`)
                        .setTimestamp()
                        .setFooter(`Requsted by ${message.author.username}!`, "https://i.imgur.com/zPhDUWm.jpeg")
                    message.channel.send(imageembed)
                }).on('error', function (e) {
                    console.log('Got an error: ', e)
                });
            });

            } else {
                let embed = new MessageEmbed()
                    .setTitle("This channel does not have nsfw enabled")
                    .setDescription(`To enable open channel settings and enable "nsfw channel"`)
                    .setColor(1127128)
                    .setThumbnail("https://i.imgur.com/zPhDUWm.jpeg")
                    .setTimestamp()
                    .setFooter(`Requsted by ${message.author.username}!`, "https://i.imgur.com/zPhDUWm.jpeg")
                message.channel.send(embed)
        }
    }
        
    
}