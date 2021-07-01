const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <MENTION>",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {


    let user;

    if (!args[0]) {
      user = message.member;
    } else {


      if (isNaN(args[0])) return message.channel.send(":x: Nincs ilyen felhasználó")


      user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: Unable to find this Person") })
    }

    if (!user) {
      return message.channel.send(":x: Nem találtam felhasználot")
    }


    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }

    //NOW BADGES
    let badges = await user.user.flags
    badges = await badges.toArray();

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "))
    })

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    //ACTIVITY
    let array = []
    if (user.user.presence.activities.length) {

      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "Nincs"
        let xname = data[i].details || "Nincs"
        let zname = data[i].state || "Nincs"
        let type = data[i].type

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        embed.setDescription(array.join("\n"))

      }
    }

      //EMBED COLOR BASED ON member
      embed.setColor(user.displayHexColor === "#0000" ? "#ff" : user.displayHexColor)
      
      //OTHER STUFF 
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

      //CHECK IF USER HAVE NICKNAME
      if (user.nickname !== null) embed.addField("Nickname", user.nickname)
      embed.addField("Csatlakozás", moment(user.user.joinedAt).format("LLLL"))
        .addField("Fiók életkora", moment(user.user.createdAt).format("LLLL"))
        .addField("Információk", `**ID**: \`${user.user.id}\`\n**#**: ${user.user.discriminator}\n**Bot**: ${user.user.bot}\n**Törölt felhasználó**: ${user.deleted}`)
        .addField("Jelvény/kitűző", newbadges.join(", ").toLowerCase() || "NINCS")
        .setFooter(user.user.presence.status, stat[user.user.presence.status])
        .setColor("#ff0000")




      return message.channel.send(embed).catch(err => {
        return message.channel.send("Error : " + err)
      })



    }



  }