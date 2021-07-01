const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "GKWAFJBGJKA",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('⚔|Moderáció:')
        .addField('`Kick`', 'Tag kirúgás')
        .addField('`Ban`', 'Tag kitiltás')
        .addField('`Töröl`', 'Üzenetek törlése')
        .addField('`Ping`', 'A bot pingje')
        .addField('`Createcategory`','Kategória létrehozása')
        .addField('`Createtext`','Szoba létrehozása')
        .addField('`Createvoice`','Voice létrehozása')
        .addField('`Userinfo`','Fiók információ')
        .addField('`Warn`','Tag figyelmeztetése')
        .addField('`Warnings`','Megjeleníti hány warnod van')
        .addField('`Deletewarns`','Warn törlése')
        .addField('`Setnick`','Becenév be állítása ')
        .addField('`Resetnick`','Becenév tölrése ')

        .setColor("#ff0000")


        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('😂|Fun:')
        .addField('`ascii`', 'Ki írja a szöveget')
        .addField('`Cica`', 'Létre hozz neked egy gifet!')
        .addField('`Kutya`', 'Létre hozz neked egy gifet!')
        .addField('`Gay`', 'Megmondja mennyire vagy gay')
        .addField('`Kor`', 'Kitalálja hány éves vagy')
        .addField('`Funfact`', 'Mond neked tényeket')
        .addField('`Szipu`', 'Csak probáld ki')
        .addField('`Cigi`', 'Cigi szünet')
        .addField('`Meme`', 'Véletlen meme')
        .addField('`Gecg`', 'Véletlen animés meme')
        .addField('`Cattext`', 'Cicás emojik')
        .addField('`Ship`', 'Össze shipel 2 embert')
        .addField('`8ball`', 'Mindenre vissza szól ')
        .addField('`flip`', 'Fej vagy írás ')
        .addField('`Baka`', 'BAKAAA!!!!')
        .addField('`Smug`', 'SMUGGGG!!')
        .addField('`Animesearch`', 'Keres animét!')


       

        .setColor("#ff0000")

        .setTimestamp()


        const utility = new Discord.MessageEmbed()
        .setTitle('📄|Általános:')
        .addField('`Say`', 'Ki írja a szöveget')
        .addField('`Invite`', 'BurnyBOT meghívó linkje')
        .addField('`Időjárás`', 'Az aktuális időjárás')
        .addField('`Számol`', 'Számológép')
        .addField('`Level`', 'Hányas a szinted')
        .addField('`Report`', 'Ember reportolása')
        .addField('`Ötlet`', 'Ötlet szavazás')
        .addField('`Covid`', 'Covid statisztika')
        .addField('`Szavazás`', 'Tagok közti szavazás')
        .setColor("#ff0000")


        .setTimestamp()

        const NSFW = new Discord.MessageEmbed()
        .setTitle('🔞|NSFW:')
        .addField('`2danal`', '-----')
        .addField('`2dboobs`', '-----')
        .addField('`2dfeet`', '-----')
        .addField('`2dfeetgif`', '-----')
        .addField('`2dtits`','-----')
        .addField('`Ass`','-----')
        .addField('`Cumslut`','-----')
        .addField('`Cumart`','-----')
        .addField('`Ero`','-----')
        .addField('`Eroyuri`','-----')
        .addField('`Lesbian`','-----')
        .addField('`Pussy`','-----')
        .addField('`Spank`','-----')
        .addField('`Trap`','-----')

        .setColor("#ff0000")

      
        .setTimestamp()

        const Háttérképek = new Discord.MessageEmbed()
        .setTitle('🖼|Wallpaper:')
        .addField('`Animalears`', 'Kemonomimi wallpaper ')
        .addField('`Foxgirl`', 'Véletlen Fox Girl wallpaper ')
        .addField('`Kacsa`', 'Véletlen kacsás wallpaper')
        .addField('`Lizard`', 'Véletlen gyík wallpaper ')
        .addField('`Wallpaper`', 'Véletlen animés wallpaper')
        .setColor("#ff0000")


        .setTimestamp()



        const faszomgame = new Discord.MessageEmbed()
        .setTitle('🎮|Játékok:')
        .addField('`Kpo`', 'Kő,papír,olló')
        .setColor("#ff0000")
          .setTimestamp()



        
        const casinogugi = new Discord.MessageEmbed()
        .setTitle('🎰|Casino:')
        .addField('`Work`', 'Dolgozás ')
        .addField('`Slot`', 'Szerencse gép ')
        .addField('`Pay`', 'Utalás a másik félnek ')
        .setColor("#ff0000")
        .setTimestamp()





        const pages = [
                moderation,
                fun,
                utility,
                NSFW,
                Háttérképek,
                faszomgame,
                casinogugi
              
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}