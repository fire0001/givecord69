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
    updateCountdownEvery: 3000,
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
.setDescription(`Your Giveaway entry for [${giveaway.prize}](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been confirmed! Do not leave the server otherwise your giveaway entry will denied! `)
.setFooter('You agreed to get this message by reacting a message')
.setTimestamp()
member.send(em).catch(() => console.log(`Failed to DM ` + member.user.tag));
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, guild, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway in ${giveaway.guildID}`); 
const emd = new Discord.MessageEmbed()
.setColor(`RED`)
.setTitle(`:mailbox_with_mail: Your giveaway entry was denied! :postbox:`)
.setDescription(`Your Giveaway entry for [${giveaway.prize}](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied! You may unreact or left the server! If you think its a mistake then refresh you discord and react again!`)
.setFooter(`Invite Giv'Cord in your server! Type g!invite `) 
.setTimestamp()
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
//Discord Boats Stats

const BOATS = require('boats.js');
const Boats = new BOATS('rekJ1WtI7qsNIlBwyZA5lktdU5VvzifUhGyy5Qns6jgltTesbav2N04yOwI3xdzZ3Dcs0KG2TQiUzo71LyGASRhHHiS5E1DlfPPyMRLmtvMMsMCMJtiVj3QskLo7Lu0kvjRxJaEL7kP4lzNVQstB7VIFSPK');
 
Boats.postStats( 28, '743116654157889607').then(() => {
    console.log('Successfully updated server count.')
}).catch((err) => {
    console.error(err)
});

// DBL Status 
const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MzExNjY1NDE1Nzg4OTYwNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA0NjQ5NDI4fQ.Iypg2XDkhpRxQAyNLSArlD3tNMocIdUWLrOUtvbwAC0"
, client);

client.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
});


// Login
client.login(config.token);
