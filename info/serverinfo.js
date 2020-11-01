const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: " ",
        accessableby: "everyone",
        aliases: ["sinfo"]
    },
    run: async (bot, message, args) => { 
if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "MODERATOR")) return;
        let owner = [];
        await bot.users.fetch(message.guild.ownerID).then(o => owner.push(o.tag))
        try {
            let embed = new MessageEmbed()
                .setColor()
                .setThumbnail(message.guild.iconURL())
                .setAuthor(`Server Info`, message.guild.iconURL())
                .addField("**Server Name**", `${message.guild.name}`, false)
                .addField("**Server Owner**", `${owner}`, false)
                .addField("**Server ID**", `${message.guild.id}`, false)
                .addField("**Text Channels**", `${message.guild.channels.cache.filter(r => r.type === "text").size}`)
                .addField("**Voice Channels**", `${message.guild.channels.cache.filter(c => c.type === "voice").size}`)
                .addField("**Members**", `${message.guild.memberCount}`, false)
                .addField("**Roles**", `${message.guild.roles.cache.size}`, false)
.setFooter("Created At " + `${message.guild.createdAt}`)
            message.channel.send(embed);
        }
        catch {
            return message.channel.send('Something Went Wrong!')
        }
    }
}
