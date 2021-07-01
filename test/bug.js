module.exports = {
    name: "bug",
    description: "feedback a bug (console.log)",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Please specify a bug!')

        message.reply(`✉ | ${message.author.username}, Thanks for finding the bug! :)`)

        console.log('Bug: ' + `(username)` + message.author.username,'#'+message.author.discriminator, `(UserId)`+ message.author.id, `(serverName)`+message.guild.name, `(serverId)`+ message.guild.id)
    }
}