const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "ping",
        description: "Displays User And Bot Latency",
        usage: " ",
        noalias: "No Aliases",
        category: "info",
    },
    run: async (bot, message, args) => {

        message.channel.send("**Pinging...**").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`<:hourglass_flowing_sand:699128011743690794> ${ping}ms\n\n💓 ${Math.round(bot.ws.ping)}ms`)
            message.channel.send(embed)
            m.delete()
        })
    }
};
