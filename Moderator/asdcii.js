const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "írj egy szöveget",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('írj egy szöveget!');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Valami elromlott!Próbáld Újra!');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Maximum 2000 karakter lehet!')

            message.channel.send('```' + data + '```')
        })
    }
}