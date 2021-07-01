const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")




module.exports = {
    name: "botinfo",
    category: "utility",
  description: "Sends detailed info about the client",
  usage: "[command]",
  run: async (client, message, args) => {
  //command
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username)
          .setTitle("__**Státusz:**__")
          .setColor("ff0000          ")
          .addField("⏳ Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("⌚️ Üzemidő", `${duration}`, true)
          .addField("📁 Emberek", `${client.users.cache.size}`, true)
          .addField("📁 Szerverek", `${client.guilds.cache.size}`, true)
          .addField("📁 Csatornák ", `${client.channels.cache.size}`, true)
          .addField("👾 Discord.js", `v${version}`, true)
          .addField("🤖 Node", `${process.version}`, true)
          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("🤖 CPU használata", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Arch", `\`${os.arch()}\``, true)
          .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
          .addField("API Késleltetés", `${(client.ws.ping)}ms`)  
      message.channel.send(botinfo)
  });
  }
  };