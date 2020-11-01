const fs = require('fs');
const db = require('quick.db');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
client.config = config;

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway ${giveaway.guildID}`) 
const em = new Discord.MessageEmbed()
.setColor(`GREEN`)
.setTitle(`:mailbox_with_mail: You have successfully entered the giveaway ! :postbox:`)
.setDescription(`Your Giveaway entry for ${giveaway.prize} has been confirmed! Do not leave the server otherwise your giveaway entry will denied! \n[Giveaway Link](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})`)
member.send(em).catch(() => console.log(`Failed to DM ` + member.user.tag));
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, guild, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway in ${giveaway.guildID}`); 
const emd = new Discord.MessageEmbed()
.setColor(`RED`)
.setTitle(`:mailbox_with_mail: Your giveaway entry was denied! :postbox:`)
.setDescription(`Your Giveaway entry for ${giveaway.prize} has been denied! You may unreact or left the server! If you think its a mistake then refresh you discord and react again! \n[Giveaway Link](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})`)
.setFooter(`Invite **Giv'Cord** in your server! Type g!invite `) 
   member.send(emd).catch(() => console.log("Failed to DM "+ member.user.tag))
});

/* Load all events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

/* Load all commands */
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`👌 Command loaded: ${commandName}`);
    });
});

/* Load all commands */
fs.readdir("./mod/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./mod/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Moderation CMD loaded: ${commandName}`);
    });
});

/* Load all commands */
fs.readdir("./owner/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./owner/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Owner CMD loaded: ${commandName}`);
    });
});

/* Load all commands */
fs.readdir("./info/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./info/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Info CMD loaded: ${commandName}`);
    });
});



/* if Someone Mention the bot  !!!*/

client.on('message', async message => {

        if (message.mentions.has(client.user) && !message.mentions.has(message.guild.id)) {
            return message.channel.send(`My Prefix is - \`g!\` . Type \`g!help\` to see a list of commands!`)
        }
    } 
) 

// Login
client.login(config.token);
