module.exports = {
    name: "slowmode",
    category: "<:mod:789590144650051604> moderation",
    description: "Lets you set slowmode on the channel.",
    args: true,
    usage: "<time>",
    run: (client, message, args) => {
      const amount = parseInt(args[0]);
      if (message.member.hasPermission("MANAGE_CHANNEL"))
        if (isNaN(amount))
          return message.channel.send("Helytelen! Kérlek adj megy egy számot!");
      if (args[0] === amount + "s") {
        message.channel.setRateLimitPerUser(amount);
        if (amount > 1) {
          message.channel.send("Slowmode most ennyi: " + amount + " másodperc");
          return;
        } else {
          message.channel.send("Slowmode most ennyi:" + amount + " másodperc");
          return;
        }
      }
      if (args[0] === amount + "min") {
        message.channel.setRateLimitPerUser(amount * 60);
        if (amount > 1) {
          message.channel.send("Slowmode most ennyi: " + amount + " perc");
          return;
        } else {
          message.channel.send("Slowmode most ennyi:" + amount + " perc");
  
          return;
        }
      }
      if (args[0] === amount + "h") {
        message.channel.setRateLimitPerUser(amount * 60 * 60);
        if (amount > 1) {
          message.channel.send("Slowmode most ennyi:" + amount + " óra");
          return;
        } else {
          message.channel.send("Slowmode most ennyi:" + amount + " óra");
          return;
        }
      } else {
        message.channel.send(
          "Csak ezt a méreteket tudod használni: seconds(s), minutes(min) and hours(h) ! "
        );
      }
    }
  };