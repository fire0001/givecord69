module.exports = {
    config: {
        name: "purge",
        aliases: ["delete", "clear", 'prune'],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "delete [amount of messages]",
        accessableby: "Administrator"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        if (isNaN(args[0]))
            return message.channel.send('g!purge [Amount of messages want to delete(Must be 1-99)]');

        if (args[0] > 100)
            return message.channel.send("**Please Supply A Number Less Than 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please Supply A Number More Than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 2000 }))).catch(() => null)
    }
}
