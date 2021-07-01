const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Kérlek adj megy egy embert akivel szeretnél játszani!')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}