const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
const money = require("./money.json");
var weather = require('weather-js');
const superagent = require('superagent');
const db = require('quick.db');
const fs = require("fs");
const axios = require('axios');
const ms = require("ms");
const { log } = require("console");

const { Player, Track} = require("discord-player")
const player =new Player(bot)
bot.player = player;

bot.player.on("trackStart", (message, track) => message.channel.send(`Most megy: ${track.title}`))
bot.player.on("trackAdd", (message, truck ,queue) => message.channel.send(`${message.content.split(" ").slice(1).join(" ")} hozzá lett adva a várólistához!`))



////////////////////////////////////////
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});






////////////////////////////////////////

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://coughyyee:youtube@youtube.k1ujk.mongodb.net/Data', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to mongo!'))


///////////////////////////////////////
let botname = "BurnyBOT BOT"

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        `${bot.guilds.cache.size}.szerveren |?!Help`

        
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;


    if(message.author.bot) return;
if(message.channel.type === "dm") return;


if(!money[message.author.id]) {
    money[message.author.id] = {
        money: 100
    };
}



if(!money[message.author.id]) {
    money[message.author.id] = {
        money: 100,
        user_id: message.author.id

    };
}

fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err);
});
let SelfMoney = money[message.author.id].money;

if(cmd === `${prefix}money`){
    let profilkép = message.author.displayAvatarURL();

    let MoneyEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .addField("Egyenleg", `${SelfMoney}FT`)
    .setThumbnail(profilkép)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())

    message.channel.send(MoneyEmbed)
}

if(cmd === `${prefix}FreeMoney`){
    message.channel.send("150FT-ot kaptál")

    money[message.author.id] = {
        money: SelfMoney + 150
    }

}



if(message.guild){
    let drop_money = Math.floor(Math.random()*50 + 1)
    let random_money = Math.floor(Math.random()*900 + 1)

    if(drop_money === 26){
        let üzenetek = ["Kiraboltál egy hajléktalant!.", "Elloptál egy biciklit!", "Feléd fujt a szél és hozott magával egy kis pénzt!", "Kiraboltál egy boltot!"]
        let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

        let DropMoneyEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .addField("Szerencséd volt!", `${üzenetek[random_üzenet_szam]} Ezért kaptál: ${random_money}FT-ot!`)
        .setColor("#ff0000")
        .setThumbnail(message.author.displayAvatarURL())

        message.channel.send(DropMoneyEmbed);

        money[message.author.id] = {
            money: SelfMoney + random_money
        }

    }
}


if(cmd === `${prefix}shop`){
    let ShopEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setDescription(`${prefix}vasarol-vip (ÁR: 50.000FT)`)
        .setColor("#ff0000")
        .setFooter(bot.user.username, bot.user.displayAvatarURL())

        message.channel.send(ShopEmbed);
}






if(cmd === `${prefix}slot`){
    let min_money = 50;
    if(SelfMoney < min_money) return message.reply(`Túl kevés pénzed van! (Minimum ${min_money}FT-nak kell lennie a számládon!) Egyenleged: ${SelfMoney}.`)
    let tét = Math.round(args[0] *100)/100
    if(isNaN(tét)) return message.reply("Kérlek adj meg egy összeget! (Pl: 5)")
    if(tét > SelfMoney) return message.reply("az egyenlegeednél több pénzt nem rakhatsz fel a slotra!")
    let slots = ["🍌", "🍎", "🍍", "🥒", "🍇"]
    let result1 = Math.floor(Math.random() * slots.length)
    let result2 = Math.floor(Math.random() * slots.length)
    let result3 = Math.floor(Math.random() * slots.length)
    if(slots[result1] === slots[result2] && slots[result3]){
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 Szerencse játék | slot machine 🎉')
        .addField(message.author.username, `Nyertél! Ennyit kaptál: ${tét*1.6}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
        message.channel.send(wEmbed)
        
        money[message.author.id] = {
            money: SelfMoney + tét*1.6,
            user_id: message.author.id
        }
    } else {
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 Szerencse játék | slot machine 🎉')
        .addField(message.author.username, `Vesztettél! Ennyit buktál: ${tét}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
        message.channel.send(wEmbed)
        
        money[message.author.id] = {
            money: SelfMoney - tét,
            user_id: message.author.id
        }



    }
}
if(!money[message.author.id]) {
    money[message.author.id] = {
        money: 100,
        user_id: message.author.id

    };
}
if(cmd === `${prefix}lb`){
    let toplist = Object.entries(money)
    .map(v => `${v[1].money}FT <@${message.id}>`)
    .sort((a, b) => b.split("FT")[0] - a.split("FT")[0])
    .slice(0, 10)

    let LbEmbed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("#ff0000")
    .addField("Pénz top lista | TOP10", toplist, true)
    .setTimestamp(message.createdAt)
    .setFooter(botname)

    message.channel.send(LbEmbed)
}
if(cmd === `${prefix}pay`){
    let pay_money = Math.round(args[0]*100)/100
    if(isNaN(pay_money)) return message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
    if(pay_money > SelfMoney) return message.reply("az egyenlegednél több pénzt nem adhatsz meg!")
    let pay_user = message.mentions.members.first();
    if(args[1] && pay_user){
        if(!money[pay_user.id]) {
            money[pay_user.id] = {
                money: 100,
                user_id: pay_user.id
            }
        }
        money[pay_user.id] = {
            money: money[pay_user.id].money + pay_money,
            user_id: pay_user.id
        }
        money[message.author.id] = {
            money: SelfMoney - pay_money,
            user_id: message.author.id
    }
    message.channel.send(`Sikeresen átutaltál <@${pay_user.id}> számlájára ${pay_money}FT-ot!`)
    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err);
    });
} else {
    message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
}
}
if(cmd === `${prefix}work`){
    let cd_role_id = "808711773870882836";
    let cooldown_time = "10"; //mp

    if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként használhatod!`)
    message.member.roles.add(cd_role_id)

let üzenetek = ["Jó munkát végeztél!", "A főnököd adott egy kis borravalót!"]
let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)
let random_money = Math.floor(Math.random()*1900 +1)
let workEmbed = new Discord.MessageEmbed()
.setTitle("Munka!")
.addField(`${üzenetek[random_üzenet_szam]}`, `A számládhoz került: ${random_money}FT!`)
.setColor("#ff0000")
.setTimestamp(message.createdAt)
.setFooter(botname)
message.channel.send(workEmbed)
money[message.author.id] = {
    money: SelfMoney + random_money,
    user_id: message.author.id
}

money[message.author.id] = {
    money: selfMoney + random_money,
    user_id: message.author.id
}
setTimeout(() => {
message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}





///////////////////prefix/////////////////////////
if(cmd === `prefix`) {

    let sEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":mailbox_with_mail:|Prefix Változás!")
    .setDescription(`A Jelenlegi prefixem **${message.guild.name}** szerverén **${prefix}**`)
    
    
    message.channel.send(sEmbed)
    }
    
    
if(cmd === `Prefix`) {
    
    let sEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":mailbox_with_mail:|Prefix Változás!")
    .setDescription(`A Jelenlegi prefixem **${message.guild.name}** szerverén **${prefix}**`)
        
        
    message.channel.send(sEmbed)
    }

/////////////////////////////////////




    if(cmd === `${prefix}Szia`){
        message.channel.send("Szia");
    }

    if(cmd === `Sziasztok`){
        message.channel.send("Szia:wave: ");
    }

    if(cmd === `Dedcset`){
        message.channel.send("Hol? Itt biztos nem!:man_facepalming: ");
    }

    if(cmd === `Deathchat`){
        message.channel.send("Hol? Itt biztos nem!:man_facepalming: ");
    }

    

if(cmd === `xD`){
    message.channel.send("xD vicci:rofl: ");
}

if(cmd === `XD`){
    message.channel.send("xD vicci:rofl: ");
}

    if(cmd === `${prefix}Te-ki-vagy`){
        message.channel.send("Én egy Bot vagyok akit @O.Istvan hozott létre");
    }

    
if(cmd === `Komoly`){
    message.channel.send("Tudom:muscle: ");
}

    if(cmd === `${prefix}Szeretlek`){
        message.channel.send("én is<3");
    }

        if(cmd === `${prefix}Kis-pénz`){
            message.channel.send("kis foci,na csumi✌🏻");
    }

    if(cmd === `${prefix}Monke-flip`){
        message.channel.send("https://tenor.com/view/monkiflip-monki-flip-gif-18149595");
    }

    if(cmd === `${prefix}Invite`){
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=844537272510578688&permissions=8&scope=bot");
    }

    

    if(cmd === `${prefix}Orbán`){
        message.channel.send("Nem félünk és nem fázunk, Orbán Viktor a királyunk\n https://tenor.com/view/aj%C3%B3isten-k%C3%BCldte-nek%C3%BCnk-orb%C3%A1n-viktort-orb%C3%A1n-viktor-orb%C3%A1n-viktor-nyugger-gif-20940378");
    }


    if(cmd === `${prefix}invite`){
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=844537272510578688&permissions=8&scope=bot");
    }

    
    if(cmd == `${prefix}Ping`) {
        message.channel.send(`BurnyBOT bot pingje a következő : **${bot.ws.ping}ms**`)
    }

    if(cmd == `${prefix}Info`) {
        message.channel.send(`BurnyBOT jelenleg ennyi szerveren van bent: **${bot.guilds}**`)
    }


    if(cmd === `${prefix}Szerverünk`){
        message.channel.send("DC LINK:https://discord.gg/JJ5gUUfj2e");
    }

    if(cmd === `${prefix}Kapcsolat`){
        message.channel.send("Szia,ha bármi kérdésed van ved fel a kapcsolatot O.Istvan#5621-el ");


    }

    
    if(cmd == `${prefix}ping`) {
        message.channel.send(`BurnyBOT bot pingje a következő : **${bot.ws.ping}ms**`)
    }




// // // // // // // // // HELP COMMAND// // // // // // // // // // 



if(cmd === `${prefix}Help`){
    let TesztEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":mailbox_with_mail:|Parancsok")
    .setAuthor(message.author.username)
    .setTimestamp(message.createdAt)
    .setDescription("**:wrench:Moderátor:\n**`Ban, Unban, Kick, Voicekick, Töröl, Ping, Createcategory, Createtext, Createvoice, Addrole, Removerole, Warn, Warnings, Deletewarns, Mute, Unmute, Tempmute, Setnick, Resetnick, Slowmode`\n\n **:rofl:Fun:**\n `Cica, Kutya, Gay, Kor, Funfact, Emojify, Szipu, Cigi, Ship, Ascii, 8ball, Meme, Gecg, Cattext, Flip, Baka, Smug, Animesearch, Urban, Ratewaifu, Animalears, Kacsa, Lizard, Wallpaper, Foxgirl, Hack, Pp, Chat`\n\n **:page_with_curl:Általános:**\n `Invite, Say, Szavazás, Számol, Avatar, Időjárás, Level, Report, Ötlet, Covid`\n\n **:video_game:Játékok:**\n `Kpo, Tictactoe`\n\n **🎉Speciális:**\n `Gstart`\n\n **🔍Infó:**\n `Whois, Userinfo, Badges, Serverinfo, Membercount, Botinfo `\n\n **:slot_machine:Casino:**\n `Slot, Work, Pay`\n\n**🔞NSFW**\n `2danal, 2dboobs, 2dfeet, 2dfeetgif, 2dtits, Ass, Cumslut, Cumart, Ero, Eroyuri, Lesbian, Pussy, Pgif, Spank ,Trap`    ")        
    .setFooter(bot.user.username, bot.user.displayAvatarURL())

    message.channel.send(TesztEmbed)

}
    






if(cmd === `${prefix}help`){
    let TesztEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle(":mailbox_with_mail:|Parancsok")
    .setAuthor(message.author.username)
    .setTimestamp(message.createdAt)
    .setDescription("**:wrench:Moderátor:\n**`Ban, Unban, Kick, Voicekick, Töröl, Ping, Createcategory, Createtext, Createvoice, Addrole, Removerole, Warn, Warnings, Deletewarns, Mute, Unmute, Tempmute, Setnick, Resetnick, Slowmode`\n\n **:rofl:Fun:**\n `Cica, Kutya, Gay, Kor, Funfact, Emojify, Szipu, Cigi, Ship, Ascii, 8ball, Meme, Gecg, Cattext, Flip, Baka, Smug, Animesearch, Urban, Ratewaifu, Animalears, Kacsa, Lizard, Wallpaper, Foxgirl, Hack, Pp, Chat`\n\n **:page_with_curl:Általános:**\n `Invite, Say, Szavazás, Számol, Avatar, Időjárás, Level, Report, Ötlet, Covid`\n\n **:video_game:Játékok:**\n `Kpo, Tictactoe`\n\n **🎉Speciális:**\n `Gstart`\n\n **🔍Infó:**\n `Whois, Userinfo, Badges, Serverinfo, Membercount, Botinfo `\n\n **:slot_machine:Casino:**\n `Slot, Work, Pay`\n\n**🔞NSFW**\n `2danal, 2dboobs, 2dfeet, 2dfeetgif, 2dtits, Ass, Cumslut, Cumart, Ero, Eroyuri, Lesbian, Pussy, Pgif, Spank ,Trap`    ")        
    .setFooter(bot.user.username, bot.user.displayAvatarURL())

    message.channel.send(TesztEmbed)

}
/////////////////////////////////////////////
  

//under if(message.author.bot)

if(db.has(`removeafk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`removeafk-${message.author.id}+${message.guild.id}`)
        await db.delete(`removeafk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }
    //checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;




///////////////////////funfact////////////////
      if (cmd === `${prefix}funfact`) {
        let valaszto = [
        '🍷 Elraktam a "Welcome” feliratú lábtörlőt.    Minek hazudjak?',
        '🧻 Kezdek bekattanni, kijövök a zuhany alól és kezet mosok...',
        '🍷 Ma le kell vinnem a szemetet! Úgy izgulok... Azt sem tudom, mit vegyek fel...',
        '🧻 Most, hogy ilyen csend van az utcákon, lehetne aszfaltozni.',
        '🍺 Minden este a hírek után beteszek egy horrorfilmet, hogy megnyugodjak.',
        '🍺 Nyugi... Nem fogtok beleőrülni, ha 2-3 hétig nem mentek ki a házból!! Ezt beszéltük ma a mosógéppel és a hűtővel...',
        '🍷 Ma a lakás minden helyiségébe tettem egy pohár italt. Este csinálok egy kocsmatúrát.',
        '🧻 Nagyon szeretek utazni, most épp a konyhában voltam, a ház fővárosában...',
        '🍺 Új probléma jelent meg a nőknél:  Van mit felvenni, de nincsen hová...',
        '🧻 A hétvégi gyónást otthon végeztem el a feleségemmel. Nem olyan megbocsátó, mint Isten...',
        '🍷 Kérem az apukákat, hogy tanítás alatt ne lófráljanak boxergatyában és sörrel a kezükben a tanuló háta mögött 🤣',
        '🧻 Mai jó tanácsom ebben a vérzivataros helyzetben. Soha ne hagyjátok ki a reggelit! A napi 17 étkezés közül ez a legfontosabb',
        `🍺 Itthoni életkép.
       Tanulási idő alatt. Hang a szobából.
       - Anya! Kaphatok egy szendvicset?
       Apa: Óra alatt nem zabálunk! 🤣🤣`,
        '🧻 Nem vagyok sorozatfüggő, de már nagyon várom az Operatív törzs évadzáró epizódját.',
        '🍷 Ha esetleg jönne a koronavírus új hulláma, a karantént ugyanezzel a családdal kell eltöltenem, vagy választhatok másikat is?'
        ]
        let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Szerencsejáték - Gambling")
        .setDescription(valaszto[Math.floor(Math.random() * valaszto.length)])
        .setFooter(" BurnyBOT Viccek")
        message.channel.send(embed)
        
    }

    if (cmd === `${prefix}Funfact`) {
        let valaszto = [
        '🍷 Elraktam a "Welcome” feliratú lábtörlőt.    Minek hazudjak?',
        '🧻 Kezdek bekattanni, kijövök a zuhany alól és kezet mosok...',
        '🍷 Ma le kell vinnem a szemetet! Úgy izgulok... Azt sem tudom, mit vegyek fel...',
        '🧻 Most, hogy ilyen csend van az utcákon, lehetne aszfaltozni.',
        '🍺 Minden este a hírek után beteszek egy horrorfilmet, hogy megnyugodjak.',
        '🍺 Nyugi... Nem fogtok beleőrülni, ha 2-3 hétig nem mentek ki a házból!! Ezt beszéltük ma a mosógéppel és a hűtővel...',
        '🍷 Ma a lakás minden helyiségébe tettem egy pohár italt. Este csinálok egy kocsmatúrát.',
        '🧻 Nagyon szeretek utazni, most épp a konyhában voltam, a ház fővárosában...',
        '🍺 Új probléma jelent meg a nőknél:  Van mit felvenni, de nincsen hová...',
        '🧻 A hétvégi gyónást otthon végeztem el a feleségemmel. Nem olyan megbocsátó, mint Isten...',
        '🍷 Kérem az apukákat, hogy tanítás alatt ne lófráljanak boxergatyában és sörrel a kezükben a tanuló háta mögött 🤣',
        '🧻 Mai jó tanácsom ebben a vérzivataros helyzetben. Soha ne hagyjátok ki a reggelit! A napi 17 étkezés közül ez a legfontosabb',
        `🍺 Itthoni életkép.
       Tanulási idő alatt. Hang a szobából.
       - Anya! Kaphatok egy szendvicset?
       Apa: Óra alatt nem zabálunk! 🤣🤣`,
        '🧻 Nem vagyok sorozatfüggő, de már nagyon várom az Operatív törzs évadzáró epizódját.',
        '🍷 Ha esetleg jönne a koronavírus új hulláma, a karantént ugyanezzel a családdal kell eltöltenem, vagy választhatok másikat is?'
        ]
        let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Szerencsejáték - Gambling")
        .setDescription(valaszto[Math.floor(Math.random() * valaszto.length)])
        .setFooter(" BurnyBOT Viccek")
        message.channel.send(embed)
        
    }


// // // // // // // // // // // BAN// // // // // // // // // // // // 




















// // // // // // // // // // // // SAY// // // // // // // // // // // // // 
    if(cmd === `${prefix}Say`){
        let szöveg = args.join(" ");

        if(szöveg) {
            let dumaEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(message.author.username)
        .addField("Szöveg:", szöveg)
        .setFooter(`${botname} | ${message.createdAt}`)

        message.channel.send(dumaEmbed)
        } else {
            message.reply("írj szöveget!")
        }
    }

    if(cmd === `${prefix}say`){
        let szöveg = args.join(" ");

        if(szöveg) {
            let dumaEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(message.author.username)
        .addField("Szöveg:", szöveg)
        .setFooter(`${botname} | ${message.createdAt}`)

        message.channel.send(dumaEmbed)
        } else {
            message.reply("írj szöveget!")
        }
    }
// // // // // // // // // // KICK// // // // // // // // // 
    if(cmd === `${prefix}Kick`){
        let kick_user = message.mentions.members.first();
        if(args[0] && kick_user){

            
            if(!message.member.hasPermission("KICK_MEMBERS")) return;

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("KICK")
                .setColor("RED")
                .setFooter(bot.user.username, bot.user.displayAvatarURL())
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                kick_user.kick(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("#ff0000")
            .setDescription("HIBA:**->** Kérlek adj meg egy indokot ")
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            if(!message.member.hasPermission("ADMINISTRATOR")) return;


            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("#ff0000")
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setDescription("HIBA:**->** Felhasználó nem található!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}kick`){
        let kick_user = message.mentions.members.first();
        if(args[0] && kick_user){

            
            if(!message.member.hasPermission("KICK_MEMBERS")) return;

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("KICK")
                .setColor("RED")
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                kick_user.kick(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("#ff0000")
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setDescription("HIBA:**->** Kérlek adj meg egy indokot ")
            if(!message.member.hasPermission("ADMINISTRATOR")) return;


            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("#ff0000")
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setDescription("HIBA:**->** Felhasználó nem található!")

            message.channel.send(parancsEmbed);

        }
    }

////////////////////////////////
if(message.content.startsWith(`${prefix}Ban`)){
const userReg = RegExp(/<@!?(\d+)>/);
const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
if(!userID){
    return message.channel.send(new Discord.MessageEmbed()
    .setAuthor('404 hiba', message.author.avatarURL())
    .setDescription('**->** Felhasználó nem található!')
    .setTimestamp(message.createdAt)
    .setColor("#ff0000"));
} 
const mentionedUser = await message.guild.members.fetch(userID)

if (!message.member.hasPermission('BAN_MEMBERS')) {
    return message.channel.send(new Discord.MessageEmbed()
        .setAuthor('403 hiba', message.author.avatarURL())
        .setDescription('**->** Nincs jogod embereket tiltani.')
        .setTimestamp(message.createdAt)
        .setColor("#ff0000"))
}
else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
    return message.channel.send(new Discord.MessageEmbed()
        .setAuthor('403 hiba', message.author.avatarURL())
        .setDescription('**->** Nincs jogom embereket tiltani.')
        .setTimestamp(message.createdAt)
        .setColor("#ff0000"))
}
else if (!mentionedUser) {
    return message.channel.send(new Discord.MessageEmbed()
        .setAuthor('403 hiba', message.author.avatarURL())
        .setDescription('**->** Szüksége lenne egy emberre akit tiltani kellene.')
        .setTimestamp(message.createdAt)
        .setColor("#ff0000"))
}

const allBans = await message.guild.fetchBans()

if (allBans.get(mentionedUser.id)) {
    return message.channel.send(new Discord.MessageEmbed()
        .setAuthor('403 hiba', message.author.avatarURL())
        .setDescription('**->** Ő már tiltva van!')
        .setTimestamp(message.createdAt)
        .setColor("#ff0000"))
}

const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

if (mentionedMember) {
    const mentionedPotision = mentionedMember.roles.highest.position
    const memberPosition = message.member.roles.highest.position
    const botPotision = message.guild.me.roles.highest.position

    if (memberPosition <= mentionedPotision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Őt nem birod tiltani mivel magasabban van a rangja mint a tiéd!')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    else if (botPotision <= mentionedPotision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error hiba', message.author.avatarURL())
            .setDescription('**->** Őt nem lehet tiltani mivel a felhasználó rangja nagyobb mint az enyém')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
const reason = args.slice(1).join(' ') || 'Nincs megadva'

message.guild.members.ban(mentionedUser.id, { reason: reason })

message.channel.send(new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.avatarURL())
.addField('**Felhasználó**', `${mentionedUser}`)
.addField("**Történés**", "Ban")
.addField("**Indok**", `${reason ? `${reason}` : ''}`)
.setTimestamp(message.createdAt)
.setThumbnail(mentionedUser.user.displayAvatarURL())
.setColor("#ff0000"))          
}
}

if(message.content.startsWith(`${prefix}ban`)){
    const userReg = RegExp(/<@!?(\d+)>/);
    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
    if(!userID){
        return message.channel.send(new Discord.MessageEmbed()
        .setAuthor('404 hiba', message.author.avatarURL())
        .setDescription('**->** Felhasználó nem található!')
        .setTimestamp(message.createdAt)
        .setColor("#ff0000"));
    } 
    const mentionedUser = await message.guild.members.fetch(userID)
    
    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Nincs jogod embereket tiltani.')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Nincs jogom embereket tiltani.')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    else if (!mentionedUser) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Szüksége lenne egy emberre akit tiltani kellene.')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    
    const allBans = await message.guild.fetchBans()
    
    if (allBans.get(mentionedUser.id)) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('403 hiba', message.author.avatarURL())
            .setDescription('**->** Ő már tiltva van!')
            .setTimestamp(message.createdAt)
            .setColor("#ff0000"))
    }
    
    const mentionedMember = message.guild.members.cache.get(mentionedUser.id)
    
    if (mentionedMember) {
        const mentionedPotision = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPotision = message.guild.me.roles.highest.position
    
        if (memberPosition <= mentionedPotision) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('403 hiba', message.author.avatarURL())
                .setDescription('**->** Őt nem birod tiltani mivel magasabban van a rangja mint a tiéd!')
                .setTimestamp(message.createdAt)
                .setColor("#ff0000"))
        }
        else if (botPotision <= mentionedPotision) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Error hiba', message.author.avatarURL())
                .setDescription('**->** Őt nem lehet tiltani mivel a felhasználó rangja nagyobb mint az enyém')
                .setTimestamp(message.createdAt)
                .setColor("#ff0000"))
        }
    const reason = args.slice(1).join(' ') || 'Nincs megadva'
    
    message.guild.members.ban(mentionedUser.id, { reason: reason })
    
    message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
    .addField('**Felhasználó**', `${mentionedUser}`)
    .addField("**Történés**", "Ban")
    .addField("**Indok**", `${reason ? `${reason}` : ''}`)
    .setTimestamp(message.createdAt)
    .setThumbnail(mentionedUser.user.displayAvatarURL())
    .setColor("#ff0000"))          
    }
    }
    
    














// // // // // // // // // //MUTE/UNMUTE// // // // // 
    if(message.content.startsWith("!Mute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.channel.send("Kérlek említs meg egy embert ! ");
        }
        else{
            mention.roles.add("819915313617436692")
            message.channel.send("<@" + mention.id + ">Sikeresen némítva lett!")
        }
    }
    if(message.content.startsWith("!Unmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.channel.send("Kérlek említs meg egy embert ! ");
        }
        else{
            mention.roles.remove("819915313617436692")
            message.channel.send("<@" + mention.id + "> Sikeresen feloldást nyert a némítás alól!")
        }
    }

    if(message.content.startsWith("!mute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.channel.send("Kérlek említs meg egy embert ! ");
        }
        else{
            mention.roles.add("819915313617436692")
            message.channel.send("<@" + mention.id + ">Sikeresen némítva lett!")
        }
    }
    if(message.content.startsWith("!unmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.channel.send("Kérlek említs meg egy embert ! ");
        }
        else{
            mention.roles.remove("819915313617436692")
            message.channel.send("<@" + mention.id + "> Sikeresen feloldást nyert a némítás alól!")
        }
    }


/////////////log///////////
if(cmd == `${prefix}log`) {
    console.log(`${message.author.username} használta a(z) ${prefix}log parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`);
    try {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: Nincs jogosultságod a parancs használatához! (Szükséges jog: \`Adminisztrátor\`)`);
    if(!args[0]) return message.channel.send(`:x: Kérlek add meg, hogy **be** vagy **ki** szeretnéd kapcsolni! (**${prefix}log [be/ki] [#csatorna]**)`);
        if(args[0] == 'be') {
        let channel = message.mentions.channels.first()
        if(!args[1]) return message.channel.send(`:x: Kérlek jelöld meg azt a csatornát, ahol a logolás **be** legyen kapcsolva! (**${prefix}log [be/ki] [#csatorna]**)`);
        db.set(`log_${message.guild.id}`,channel.id);
        message.channel.send(`:white_check_mark: A log sikeresen **bekapcsolva** a **${channel}** csatornán!`);
      } else if(args[0] == "ki") {
        if(!args[1]) return message.channel.send(`:x: Kérlek jelöld meg azt a csatornát, ahol a logolás **ki*** legyen kapcsolva! (**${prefix}log [be/ki] [#csatorna]**)`);
        db.delete(`log_${message.guild.id}`);
        message.channel.send(`:white_check_mark: A log sikeresen **kikapcsolva** a **${args[1]}** csatornán!`);
    }
    }catch(error) {
      console.log(error);
      message.channel.send(`:x: Hiba történt a parancs elvégzése során, consolba leírtam! A **${bot.user.username}** nevű rangnak adj minden jogot, és húzd fel legfelülre!`);
    }
  }
  bot.on("messageUpdate", async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) {
      return;
    }
      let logcsatorna = db.get(`log_${oldMessage.guild.id}`);
      let logembed = new Discord.MessageEmbed()
      .setTitle("Egy felhasználó megváltoztatta az üzenetét")
      .addField("Szerkesztette:", oldMessage.author.tag)
      .addField("Csatorna:", oldMessage.channel)
      .addField("Üzenet szerkesztés előtt:", oldMessage.content, true)
      .addField("Üzenet szerkesztés után:", newMessage.content, true)
      .setColor("GREEN")
      .setFooter(`${bot.user.username}`, bot.user.avatarURL)
      .setTimestamp();
      message.guild.channels.get(logcsatorna).send(logembed);
  }) 





// // // // // // // // // SZAVAZÁS// // // // // 
if(cmd === `${prefix}Szavazás`){
    if(args[0]){
        let he_embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag + `| Szavazást indított!`)
        .setDescription(args.join(" "))
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setTimestamp(message.createdAt)
        .setFooter(bot.user.username)

        message.channel.send(he_embed).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })
    } else {
        message.reply("Kérlek add meg a szavazást!")
    }
}

if(cmd === `${prefix}szavazás`){
    if(args[0]){
        let he_embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag + `| Szavazást indított!`)
        .setDescription(args.join(" "))
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setTimestamp(message.createdAt)
        .setFooter(bot.user.username)

        message.channel.send(he_embed).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })
    } else {
        message.reply("Kérlek add meg a szavazást!")
    }
}
// // // // // // // // // CREATEROLE// // // // // // // // 
if(cmd === `${prefix}Createrole`){
    if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
        if(message.member.hasPermission("MANAGE_ROLES")){
            if(args[0]){
                message.guild.roles.create({
                    data: {
                        "name": args[0],
                        }
                    }).then(message.reply(`${message.author.tag} létrehozta : ${args[0]} névű rangot!`))

                } else message.reply(`Használata: ${prefix}Createrole <rang neve>`)

            } else message.reply("Ehhez a parancshoz nincs jogod! A következő jog kell hozzá: manage_roles")
        } else message.reply("A botnak nincsen administrator joga! Kérlek adj egy BOT rangot!")
    }

    if(cmd === `${prefix}createrole`){
        if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
            if(message.member.hasPermission("MANAGE_ROLES")){
                if(args[0]){
                    message.guild.roles.create({
                        data: {
                            "name": args[0],
                            }
                        }).then(message.reply(`${message.author.tag} létrehozta : ${args[0]} névű rangot!`))
    
                    } else message.reply(`Használata: ${prefix}Createrole <rang neve>`)
    
                } else message.reply("Ehhez a parancshoz nincs jogod! A következő jog kell hozzá: manage_roles")
            } else message.reply("A botnak nincsen administrator joga! Kérlek adj egy BOT rangot!")
        }
// // // // // // // // // // // REPORT// // // // // // 
    if(cmd ===`${prefix}Report`){
        // privát szűrése
    if(message.channel.type === 'dm') return message.reply("Itt nem tudod használni!");
    // felhasználó lekérése
    const report_usr = message.mentions.users.first();
    // csatorna id az egyszerűség kedvéért
    const channel_id = "845563236517543946";
    // 6 + 24 mivel prefix levágva = 30
    const indok = message.content.slice(30);
 
    // ha nincs felhasználó
    if(!report_usr){
        return message.reply('Nem adtad meg a felhasználót!');
    }
    
    // ha nincs indok
    if(!indok){
        return message.reply("Nem adtál meg indokot!");
    }
 
    //embed
    const embed = new Discord.MessageEmbed()
    .setTitle('Report')
    .setDescription(`*${report_usr} jelentve lett!*\n **Indoka: ${indok}**\n *Bejelentő: ${message.author.username}*\n Szerverren?: ${message.guild.name}`)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp()
    .setColor("#ff0000")
    // majd küldés
        bot.channels.cache.get(channel_id).send(embed)
    }    


    if(cmd ===`${prefix}report`){
        // privát szűrése
    if(message.channel.type === 'dm') return message.reply("Itt nem tudod használni!");
    // felhasználó lekérése
    const report_usr = message.mentions.users.first();
    // csatorna id az egyszerűség kedvéért
    const channel_id = "845563236517543946";
    // 6 + 24 mivel prefix levágva = 30
    const indok = message.content.slice(30);
 
    // ha nincs felhasználó
    if(!report_usr){
        return message.reply('Nem adtad meg a felhasználót!');
    }
    
    // ha nincs indok
    if(!indok){
        return message.reply("Nem adtál meg indokot!");
    }
 
    //embed
    const embed = new Discord.MessageEmbed()
    .setTitle('Report')
    .setDescription(`*${report_usr} jelentve lett!*\n **Indoka: ${indok}**\n *Bejelentő: ${message.author.username}*\n Szerverren?: ${message.guild.name}`)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp()
    .setColor("#ff0000")
    // majd küldés
        bot.channels.cache.get(channel_id).send(embed)
    }
    
   




//// // // // // // // // CLEAR// // // // // // // // 
if(cmd === `${prefix}Töröl`){
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){

            if(args[0] && isNaN(args[0]) && args [0] <=100 || 0 < args[0] && args[0] < 101){

                message.channel.send(`Törölve lett: ${Math.round(args[0])} üzenet!`)
                message.channel.bulkDelete(Math.round(args[0]))
    
            } else {
                message.reply(`Használat: ${prefix}Töröl <1-100>`)
            }
        } else message.reply("A BurnyBOT-nak adminnaknak kell lennie a szervren, hogy működjön ez a parancs!")
    
    } else message.reply("Ehhez a parancshoz nincs jogod")
}   

if(cmd === `${prefix}töröl`){
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){

            if(args[0] && isNaN(args[0]) && args [0] <=100 || 0 < args[0] && args[0] < 101){

                message.channel.send(`Törölve lett: ${Math.round(args[0])} üzenet!`)
                message.channel.bulkDelete(Math.round(args[0]))
    
            } else {
                message.reply(`Használat: ${prefix}Töröl <1-100>`)
            }
        } else message.reply("A BurnyBOT-nak adminnaknak kell lennie a szervren, hogy működjön ez a parancs!")
    
    } else message.reply("Ehhez a parancshoz nincs jogod")
}

////////////////////////////ROSSZ SZAVAK/////////////////////////////////////////
const { badwords } = require("./badwords.json")

     let confirm = false;
        let i;
        for(i = 0; i < badwords.length; i++){
            if(message.content.toLowerCase().includes(badwords[i].toLowerCase())){
                confirm = true
            }
        }
        if(confirm) {
            message.delete()
            return message.channel.send("Ezen a szerveren a csúnyaszavak használata NEM engedélyezett!")
        }







        /////////////////////////////////JÁTÉK



        
        if(cmd === `${prefix}Kpo`) {
            let válaszArray = ["kő", "kő", "papír", "olló"];
            let válaszNum = Math.floor(Math.random() * válaszArray.length) + 1;
            if(MessageArray[1] === `kő` || MessageArray[1] === `papír` || MessageArray[1] === `olló`) {
        
            message.reply(`Te: ${MessageArray[1]} BurnyBot: ${válaszArray[válaszNum]}`);
            } else message.reply("Kérlek adj meg egy tárgyat! pl kő, papír, olló")
        }

        if(cmd === `${prefix}kpo`) {
            let válaszArray = ["kő", "kő", "papír", "olló"];
            let válaszNum = Math.floor(Math.random() * válaszArray.length) + 1;
            if(MessageArray[1] === `kő` || MessageArray[1] === `papír` || MessageArray[1] === `olló`) {
        
            message.reply(`Te: ${MessageArray[1]} BurnyBot: ${válaszArray[válaszNum]}`);
            } else message.reply("Kérlek adj meg egy tárgyat! pl kő, papír, olló")
        }


        if(cmd === `${prefix}FI`) {
            let válaszArray = ["fej","fej", "írás","fej","írás","írás",];
            let válaszNum = Math.floor(Math.random() * válaszArray.length) + 1;
            if(MessageArray[1] === `fej` || MessageArray[1] === `írás` || MessageArray[1] === `írás`|| MessageArray[1] === `fej`) {
        
            message.reply(`Te: ${MessageArray[1]} BurnyBot: ${válaszArray[válaszNum]}`);
            } else message.reply("Kérlek adj meg egy tárgyat! pl fej, írás")
        }





/////////////////////Create csatorna/voice/kategoria//////////////
if(cmd === `${prefix}createtext`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createtextc <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'text'}), message.channel.send('A csatorna elkészült, görgess fel.').then(m => m.delete ({ timeout:7000 }));
}

if(cmd === `${prefix}Createtext`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createtextc <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'text'}), message.channel.send('A csatorna elkészült, görgess fel.').then(m => m.delete ({ timeout:7000 }));
}

if(cmd === `${prefix}createvoice`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createvoicec <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'voice'}), message.channel.send('A csatorna elkészült, görgess fel.').then(m => m.delete ({ timeout:7000 }));
}

if(cmd === `${prefix}Createvoice`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createvoicec <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'voice'}), message.channel.send('A csatorna elkészült, görgess fel.').then(m => m.delete ({ timeout:7000 }));
}	


if(cmd === `${prefix}createcategory`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createvoicec <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'category'}), message.channel.send('A kategória elkészült, görgess le.').then(m => m.delete ({ timeout:7000 }));
}

if(cmd === `${prefix}Createcategory`) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(szuksegembed).then(m => m.delete ({ timeout: 7000 })); //ez kedves emberektől van
    if(!args[0]) return message.channel.send('  Hiba ``Használd: !createvoicec <Csatorna Neve>``').then(m => m.delete ({ timeout: 7000 }));
    message.guild.channels.create(args.slice(0).join(" "), {type: 'category'}), message.channel.send('A kategória elkészült, görgess le.').then(m => m.delete ({ timeout:7000 }));
}	









    /////////////////////////////////////////
if(cmd === `${prefix}welcomesys`) {
	let wsyse = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setTitle("Welcome Rendszer - Hamarosan")
	.addField(`${prefix}setwelcomec`, `A welcome channel megadása.`)
	.addField(`${prefix}setwelcomemess`, `A welcome rendszer üzenetének átalakítása.`)
	.addField(`Ezért válassz minket!`, `Megbízható rendszer, hetekig futó bot (Restart szükséges ilyenkor)`)
	.addField(`Megbízható források, kevés a lagg és alig észrevehető késleltetések`, `Mindig a legjobbat adjuk`)
	.addField(`Welcome Message Rendszere`, `Itt igazából ezt tudod meg...`)
    .addField("${user} - Belépő nevének megadása", "${tagok} - Tagok létszámának megadása", "#csatornaneve - Csatorna hozzáadása, kattinthatóra")
	message.channel.send(wsyse)
}
////////////////////////AVATAR//////////////////
if(cmd === `${prefix}avatar`) {
    let msg = await message.channel.send("Kérlek várj, az avatár érkezik a boltból...");
    let mentionedUser = message.mentions.users.first() || message.author
    

    let aEmbed = new Discord.MessageEmbed()
    aEmbed.setImage(mentionedUser.displayAvatarURL())
    aEmbed.setColor("#ff0000")
    aEmbed.setTitle(`${mentionedUser.username} avatárja`)
    aEmbed.setDescription(`[Link](${mentionedUser.displayAvatarURL()})`)
    aEmbed.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({ dynamic: true }));
    aEmbed.setTimestamp()

    message.channel.send(aEmbed);
    
    msg.delete();
    message.delete();

}

if(cmd === `${prefix}Avatar`) {
    let msg = await message.channel.send("Kérlek várj, az avatár érkezik a boltból...");
    let mentionedUser = message.mentions.users.first() || message.author
    

    let aEmbed = new Discord.MessageEmbed()
    aEmbed.setImage(mentionedUser.displayAvatarURL())
    aEmbed.setColor("#ff0000")
    aEmbed.setTitle(`${mentionedUser.username} avatárja`)
    aEmbed.setDescription(`[Link](${mentionedUser.displayAvatarURL()})`)
    aEmbed.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({ dynamic: true }));
    aEmbed.setTimestamp()

    message.channel.send(aEmbed);
    
    msg.delete();
    message.delete();

}

///////////////////////






if (cmd === `${prefix}szipu`) {
    message.channel.send(`${message.author.username} kicsit beájult.`).then(async msg => {
        setTimeout(() => {
            msg.edit('Szipuuu');
        }, 1500);
        setTimeout(() => {
            msg.edit('szipuuu á');
        }, 1500);
        setTimeout(() => {
            msg.edit('szipuuu áá');
        }, 2000);
        setTimeout(() => {
            msg.edit('szipuuu ááá');
        }, 2500);
        setTimeout(() => {
            msg.edit('szipuuu áá');
        }, 3000);
        setTimeout(() => {
            msg.edit('szipuuu á');
        }, 3500);
        setTimeout(() => {
            msg.edit('szipuuu');
        }, 4000);
        setTimeout(() => {
            msg.edit(`${message.author.username} végzett a higítós zacskóval!`);
        }, 4500);
    });
};


if (cmd === `${prefix}Szipu`) {
    message.channel.send(`${message.author.username} kicsit beájult.`).then(async msg => {
        setTimeout(() => {
            msg.edit('Szipuuu');
        }, 1500);
        setTimeout(() => {
            msg.edit('szipuuu á');
        }, 1500);
        setTimeout(() => {
            msg.edit('szipuuu áá');
        }, 2000);
        setTimeout(() => {
            msg.edit('szipuuu ááá');
        }, 2500);
        setTimeout(() => {
            msg.edit('szipuuu áá');
        }, 3000);
        setTimeout(() => {
            msg.edit('szipuuu á');
        }, 3500);
        setTimeout(() => {
            msg.edit('szipuuu');
        }, 4000);
        setTimeout(() => {
            msg.edit(`${message.author.username} végzett a higítós zacskóval!`);
        }, 4500);
    });
};








if (cmd === `${prefix}cigi`) {
    message.channel.send(`${message.author.username} cigi szünetet tart!`).then(async msg => {
        setTimeout(() => {
            msg.edit('🚬');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁ ');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁ ');
        }, 2000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁ ');
        }, 2500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁');
        }, 3000);
        setTimeout(() => {
            msg.edit('🚬 ☁');
        }, 3500);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 4000);
        setTimeout(() => {
            msg.edit(`${message.author.username} végzett a tüdőt károsító szórakozásával! **Cigizni nem megoldás!**`);
        }, 4500);
    });
};



if (cmd === `${prefix}Cigi`) {
    message.channel.send(`${message.author.username} cigi szünetet tart!`).then(async msg => {
        setTimeout(() => {
            msg.edit('🚬');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁ ');
        }, 1500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁ ');
        }, 2000);
        setTimeout(() => {
            msg.edit('🚬 ☁☁☁ ');
        }, 2500);
        setTimeout(() => {
            msg.edit('🚬 ☁☁');
        }, 3000);
        setTimeout(() => {
            msg.edit('🚬 ☁');
        }, 3500);
        setTimeout(() => {
            msg.edit('🚬 ');
        }, 4000);
        setTimeout(() => {
            msg.edit(`${message.author.username} végzett a tüdőt károsító szórakozásával! **Cigizni nem megoldás!**`);
        }, 4500);
    });
};







if(cmd === `${prefix}infó`) {
    let user = message.mentions.users.first() || message.author;
    if(user.presence.status === `dnd`) user.presence.status = "Elfoglalt";
    if(user.presence.status === `offline`) user.presence.status = "Láthatatlan";
    if(user.presence.status === `online`) user.presence.status = "Elérhető";
    if(user.presence.game === null) user.presence.game = "Nem játszik vagy Saját Státusz";
    const member = message.guild.member(user)
    const embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail(user.avatarURL)
    .setTitle(`${user.username} Információi`, user.displayAvatarURL)
    .addField("Felhasználóneve:", user.username)
    .addField("ID:", user.id)
    .addField("Rangjai:", user.roles)
    .addField("Játékban:", user.presence.game)
    .addField("Állapota:", user.presence.status)
    .addField("Létrehozva:", user.createdAt.toDateString())
    .addField("Csatlakozott a szerverhez:", member.joinedAt.toDateString())
    .setTimestamp()
  
    message.channel.send(embed)
  }



  if(cmd === `${prefix}Infó`) {
    let user = message.mentions.users.first() || message.author;
    if(user.presence.status === `dnd`) user.presence.status = "Elfoglalt";
    if(user.presence.status === `offline`) user.presence.status = "Láthatatlan";
    if(user.presence.status === `online`) user.presence.status = "Elérhető";
    if(user.presence.game === null) user.presence.game = "Nem játszik vagy Saját Státusz";
    const member = message.guild.member(user)
    const embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail(user.avatarURL)
    .setTitle(`${user.username} Információi`, user.displayAvatarURL)
    .addField("Felhasználóneve:", user.username)
    .addField("ID:", user.id)
    .addField("Rangjai:", user.roles)
    .addField("Játékban:", user.presence.game)
    .addField("Állapota:", user.presence.status)
    .addField("Létrehozva:", user.createdAt.toDateString())
    .addField("Csatlakozott a szerverhez:", member.joinedAt.toDateString())
    .setTimestamp()
  
    message.channel.send(embed)
  }










if(cmd === `${prefix}időjárás`){
    if(args[0]){
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
            if (err) message.reply(err);

            if(result.length === 0){
                message.reply("Kérlek adj meg egy létező település nevet!")
                return;
            }

            let current = result[0].current;
            let location = result[0].location;

            let WeatherEmbed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Időjárás itt: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("#ff0000")
            .addField("Időzóna:", `UTC${location.timezone}`, true)
            .addField("Fokozat típusa:", `${location.degreetype}`, true)
            .addField("Hőfok", `${current.temperature}°C`, true)
            .addField("Hőérzet:", `${current.feelslike}°C`, true)
            .addField("Szél", `${current.winddisplay}`, true)
            .addField("Páratartalom:", `${current.humidity}%`, true)

            message.channel.send(WeatherEmbed);
        })

    } else {
        message.reply("Kérlek adj meg egy település nevet!")
    }
}

if(cmd === `${prefix}Időjárás`){
    if(args[0]){
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
            if (err) message.reply(err);

            if(result.length === 0){
                message.reply("Kérlek adj meg egy létező település nevet!")
                return;
            }

            let current = result[0].current;
            let location = result[0].location;

            let WeatherEmbed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Időjárás itt: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("#ff0000")
            .addField("Időzóna:", `UTC${location.timezone}`, true)
            .addField("Fokozat típusa:", `${location.degreetype}`, true)
            .addField("Hőfok", `${current.temperature}°C`, true)
            .addField("Hőérzet:", `${current.feelslike}°C`, true)
            .addField("Szél", `${current.winddisplay}`, true)
            .addField("Páratartalom:", `${current.humidity}%`, true)

            message.channel.send(WeatherEmbed);
        })

    } else {
        message.reply("Kérlek adj meg egy település nevet!")
    }
}

//////////////////////Számológép/////////////////////////////

if(cmd === `${prefix}számol`) {
    var plus = Math.floor(Number(args[0]) + Number(args[2]));
    if (isNaN(plus)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    var minus = Math.floor(args[0]) - (args[2]);
    if (isNaN(minus)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    var multiply = Math.floor(args[0]) * (args[2]);
    if (isNaN(multiply)) message.channel.send("Hiba: Kérlek adj meg számokat!");

    var divide = Math.floor(args[0]) / (args[2]);
    if (isNaN(divide)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    if (args[1] ==  "+") return message.channel.send(args[0] + " + " + args[2] + " = " + plus + "");
    if (args[1] ==  "-") return message.channel.send(args[0] + " - " + args[2] + " = " + minus + "");
    if (args[1] ==  "*") return message.channel.send(args[0] + " * " + args[2] + " = " + multiply + "");
    if (args[1] ==  "x") return message.channel.send(args[0] + " x " + args[2] + " = " + multiply + "");
    if (args[1] ==  "/") return message.channel.send(args[0] + " / " + args[2] + " = " + divide + "");

    else message.channel.send("valami hiba van!");


  }


  if(cmd === `${prefix}Számol`) {
    var plus = Math.floor(Number(args[0]) + Number(args[2]));
    if (isNaN(plus)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    var minus = Math.floor(args[0]) - (args[2]);
    if (isNaN(minus)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    var multiply = Math.floor(args[0]) * (args[2]);
    if (isNaN(multiply)) message.channel.send("Hiba: Kérlek adj meg számokat!");

    var divide = Math.floor(args[0]) / (args[2]);
    if (isNaN(divide)) return message.channel.send("Hiba: Kérlek adj meg számokat!");

    if (args[1] ==  "+") return message.channel.send(args[0] + " + " + args[2] + " = " + plus + "");
    if (args[1] ==  "-") return message.channel.send(args[0] + " - " + args[2] + " = " + minus + "");
    if (args[1] ==  "*") return message.channel.send(args[0] + " * " + args[2] + " = " + multiply + "");
    if (args[1] ==  "x") return message.channel.send(args[0] + " x " + args[2] + " = " + multiply + "");
    if (args[1] ==  "/") return message.channel.send(args[0] + " / " + args[2] + " = " + divide + "");

    else message.channel.send("valami hiba van!");


  }
//////////////////////////////////KUTYA////////////////////

if(cmd === `${prefix}kutya`) {
	   let msg = await message.channel.send('Generálás... ')

  var dog;

  dog = await superagent
      .get("https://random.dog/woof.json");

  while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
      dog = await superagent
          .get("https://random.dog/woof.json");
      console.log(dog.body)
  }
  msg.delete()
  var embed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Unrealy | Kutya")
      .setImage(dog.body.url)
      .setFooter(`Forrás: Athox`)
  message.channel.send(embed);
}
if(cmd === `${prefix}Kutya`) {
    let msg = await message.channel.send('Generálás... ')

var dog;

dog = await superagent
   .get("https://random.dog/woof.json");

while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
   dog = await superagent
       .get("https://random.dog/woof.json");
   console.log(dog.body)
}
msg.delete()
var embed = new Discord.MessageEmbed()
   .setColor("#ff0000")
   .setTitle("Unrealy | Kutya")
   .setImage(dog.body.url)
   .setFooter(`Forrás: Athox`)
message.channel.send(embed);
}

///////////////////////////////MACSKA////////////////////////
if(cmd === `${prefix}Cica`) {
    let msg = await message.channel.send("Generálás...") 

 let {body} = await superagent
 .get(`http://aws.random.cat/meow`)
 //console.log(body.file) 
 if(!{body}) return message.channel.send("Nem sikerült a kép legenerálása!")

 let cEmbed = new Discord.MessageEmbed()
 .setColor("#ff0000")
 .setAuthor('Unrealy | Cica', message.guild.iconURL())
 .setImage(body.file)
 .setTimestamp()
 .setFooter('Forrás: BurnyBOT')

 message.channel.send(cEmbed)

 msg.delete();
}
if(cmd === `${prefix}cica`) {
    let msg = await message.channel.send("Generálás...") 

 let {body} = await superagent
 .get(`http://aws.random.cat/meow`)
 //console.log(body.file) 
 if(!{body}) return message.channel.send("Nem sikerült a kép legenerálása!")

 let cEmbed = new Discord.MessageEmbed()
 .setColor("#ff0000")
 .setAuthor('Unrealy | Cica', message.guild.iconURL())
 .setImage(body.file)
 .setTimestamp()
 .setFooter('Forrás: BurnyBOT')

 message.channel.send(cEmbed)

 msg.delete();
}
///////////////////////////FASZOM////////////////

if(cmd === `${prefix}Resetprefix`) {
	if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Nncs jogod ehhez")
	prefixe = JSON.parse(fs.readFileSync("./botconfig.json"))
	
	prefixe[message.guild.id] = {
		prefixe: "!"
	}

   fs.writeFile("./botconfig.json", JSON.stringify(prefixe), (err) => {
	 if (err) console.log(err)
   })
   if (prefix == "!") return message.reply("Már az alap prefixem van, ami a !")
   let sEmbed = new Discord.MessageEmbed()
   .setColor("#ff0000")
   .setTitle("Prefix Változás!")
   .setDescription(`A Jelenlegi prefixem **${message.guild.name}** szerverén resetelve lett **!?**`)

   message.channel.send(sEmbed)
	
}


if(cmd === `${prefix}Setprefix`) {
	if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Nncs jogod ehhez")
	if(!args[0] || args[0 === "help"]) return message.reply(`Használd ${prefix}setprefix <új prefix>`);
		
	
	prefixe = JSON.parse(fs.readFileSync("./botconfig.json"))
	
	prefixe[message.guild.id] = {
		prefixe: args[0]
	}

   fs.writeFile("./botconfig.json", JSON.stringify(prefixe), (err) => {
	 if (err) console.log(err)
   })
   let sEmbed = new Discord.MessageEmbed()
   .setColor("#ff0000")
   .setTitle("Prefix Változás!")
   .setDescription(`Az új prefixem **${message.guild.name}** szerverén **${args[0]}** lett!`)

   message.channel.send(sEmbed)
}


/////////////////////KOR PARANCS//////////////////////////
if(cmd == `${prefix}Kor`){
    const embed = new Discord.MessageEmbed();
    let sum = Math.floor(Math.random() * 25) + 1;

    embed.setColor("#ff0000");
    embed.addField("Megtippelem a kóród!",` A te kóród: ${sum}?`);

    message.channel.send(embed);
}

if(cmd == `${prefix}kor`){
    const embed = new Discord.MessageEmbed();
    let sum = Math.floor(Math.random() * 25) + 1;

    embed.setColor("#ff0000");
    embed.addField("Megtippelem a kóród!",` A te kóród: ${sum}?`);

    message.channel.send(embed);
}





if(cmd == `${prefix}Gay`){
    const embed = new Discord.MessageEmbed();
    let sum = Math.floor(Math.random() * 100) + 1;

    embed.setColor("#ff0000");
    embed.addField(":rainbow_flag:| Megmondom hány %-ban vagy meleg",` Ennyire vagy meleg ${sum}%-ban!`);

    message.channel.send(embed);
}
 
exports.run = async (bot, message, args) =>
{
    const member = message.mentions.members.first() ||
message.guild.members.cache.get(args[0]);
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()

    .setColor("BROWN")
    .setTitle(`${member} figyelmeztetve ${message.author} által`)
    .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()


     message.channel.send(embed);
}





if(cmd == `${prefix}gay`){
    const embed = new Discord.MessageEmbed();
    let sum = Math.floor(Math.random() * 100) + 1;

    embed.setColor("#ff0000");
    embed.addField(":rainbow_flag: |Megmondom hány %-ban vagy meleg",` Ennyire vagy meleg ${sum}%-ban!`);

    message.channel.send(embed);
}
const axios = require("axios")
if (cmd === `${prefix}insta`) {
    let getInfo = async () => {
      if(!args[0]) return message.channel.send("Kérlek adj meg egy felhasználónevet!");
      let response = await axios.get(`https://apis.duncte123.me/insta/${args.slice(0).join(" ")}`);
      let info = response.data;
      return info;
    };
    let infoValue = await getInfo();
    console.log(infoValue);

    const embed = new Discord.MessageEmbed()
    .setTitle(`Instagram Statisztika`)
    .setColor('#76a7f8')
    .setThumbnail(`${infoValue.user.profile_pic_url}`)
    .setDescription(`**Neve:** ${infoValue.user.username}
    **Teljes Neve:** ${infoValue.user.full_name}
    **Tudnivaló (BIO):** ${infoValue.user.biography}
    **Feltöltések:** ${infoValue.user.uploads.count}
    **Követők:** ${infoValue.user.followers.count}
    **Követések:** ${infoValue.user.following.count}
    **Privát:** ${infoValue.user.is_private? 'Igen':'Nem'}
    **Visszaigazolt:** ${infoValue.user.is_verified? 'Igen':'Nem'}`)
    .setTimestamp()
    .setFooter(`Forrás: useme | Instagram`, client.user.displayAvatarURL())

    message.channel.send(embed)
  }
////////////////////////////////////////////////////////

bot.on("message", async (message) => {
    let prefix = "?!"
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    if(command === "play"){
        if(!message.member.voice.channel) return message.reply("Nem vagy bent egy voice csatornában sem!")
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Nem vagy velem egy voice csatornában!")
        if(!args[0]) return message.reply("Kérel adj meg egy URL-t vagy egy zene címet!")

        bot.player.play(message, args.join(" "), {firstResult: true});
        }
        if(command === "queue"){
            if(!message.member.voice.channel) return message.reply("Nem vagy bent egy voice csatornában sem!")
            if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply("Nem vagy velem egy voice csatornában!")

            const queue = bot.player.getQueue(message);

            if(!bot.player.getQueue(message)) return message.reply("A várólistán nem szerepel semmi!")
            
            message.channel.send(`**Várólista - ${message.guild.name}\nJelenleg ${queue.playing.title} | ${queue.playing.author}\n\n ` + (queue.tracks.map((track, i ) => {
                return `**${i + 1}** - ${track.title} | ${track.author} (A zenét kérte: ${track.requestedBy.username})`
                
            }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `és még **${queue.tracks.length - 5}db zene...` : `A lejátszási listában: **${queue.tracks.length}db zene van!`}`
            ));
                  
        }
    
})

///////////////////////////////////////////////////////////
if(cmd === `${prefix}ötlet`){
    if(args[0]){
        let he_embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag + `| Tetszik az ötlet?[✅=IGEN| 🔄=IS IS |❌=NEM ]`)
        .setDescription(args.join(" "))
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setTimestamp(message.createdAt)
        .setFooter(bot.user.username)

        message.channel.send(he_embed).then(async msg => {
            await msg.react("✅")
            await msg.react("🔄")
            await msg.react("❌")
        
        })
    } else {
        message.reply("Kérlek add meg az ötleted!")
    }
}

if(cmd === `${prefix}Ötlet`){
    if(args[0]){
        let he_embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag + `| Tetszik az ötlet?[✅=IGEN| 🔄=IS IS |❌=NEM ]`)
        .setDescription(args.join(" "))
        .setColor("#ff0000")
        .setTimestamp(message.createdAt)
        .setTimestamp(message.createdAt)
        .setFooter(bot.user.username)

        message.channel.send(he_embed).then(async msg => {
            await msg.react("✅")
            await msg.react("🔄")
            await msg.react("❌")
        
        })
    } else {
        message.reply("Kérlek add meg az ötleted!")
    }
}
  fs.writeFile("./money.json", JSON.stringify(money), (err) => {
    if(err) console.log(err);
});

if(cmd === `${prefix}csók`){



    let pay_user = message.mentions.members.first();
 
    let kissgif = [
        'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
        'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
        'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
        'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
        'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
        'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
        'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif'
    
    ]
    let random_kissgif = Math.floor(Math.random()*kissgif.length)
    
 
 
    message.channel.send(`${message.author.username}` + ' megcsókolta ' + `<@${pay_user.id}>😘🥰`)
    message.channel.send(`${kissgif[random_kissgif]}`)
}

if(cmd === `${prefix}Csók`){
 
    let pay_user = message.mentions.members.first();
 
    let kissgif = [
        'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
        'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
        'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
        'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
        'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
        'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
        'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
        'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif'
    
    ]
    let random_kissgif = Math.floor(Math.random()*kissgif.length)
    
    message.channel.send(`${message.author.username}` + ' megcsókolta ' + `<@${pay_user.id}>😘🥰`)
    message.channel.send(`${kissgif[random_kissgif]}`)
}
});

//////////////////////////////////////////////////////////////
const distube = require('distube');
bot.distube = new distube(bot, { searchSongs: false, emitNewSongOnly: true })
bot.distube
    .on('playSong', (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
    ))
    .on('addSong', (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
		//console.error(e)
		message.channel.send(`An error encountered: ${e}`)

	})


//////////////////////////////////////////////////

// xpfile definiálása 
const xpfile = require(`./DB/xp.json`);
const { arg } = require("mathjs");
const { MessageButtonStyles } = require("discord-buttons");
  // #### XP RENDSZER ####
    bot.on("message", function(message){
        if(message.author.bot) return;
        let addXP = Math.floor(Math.random() * 8) + 3;
        const randomAmountOfXp = Math.floor(Math.random() * 15) + 1; // Min 1, Max 30

        if(!xpfile[message.author.id]){
            xpfile[message.author.id] = {
                xp: 0,
                level: 1,
                regxp: 100
            }

            

            
            fs.writeFileSync(`./DB/xp.json`,JSON.stringify(xpfile),function(err){
                if(err) console.log(err)
            })
        }

        xpfile[message.author.id].xp += addXP

        if(xpfile[message.author.id].xp > xpfile[message.author.id].regxp){
            xpfile[message.author.id].xp -= xpfile[message.author.id].regxp 
            xpfile[message.author.id].regxp *= 1
            xpfile[message.author.id].regxp = Math.floor(xpfile[message.author.id].regxp)
            xpfile[message.author.id].level += 1

            message.reply(`Gratulálok elérted ezt a szintet: **${xpfile[message.author.id].level}** 👌 🎉`)
        }

        fs.writeFileSync(`./DB/xp.json`,JSON.stringify(xpfile),function(err){
            if(err) console.log(err)
        });
//////////////////////////////////////////////////////////////////


        



    });




    




bot.login(tokenfile.token);