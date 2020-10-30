const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    let prefix = config.prefix;
    if (message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;


    let invite = new Discord.MessageEmbed()
    .setTitle("Invite & Support Link!")
    .addField("Invite Link", "[Click here to invite me](https://discordapp.com/api/oauth2/authorize?client_id=743116654157889607&permissions=523328&scope=bot)")
    .addField("Support Server", "[Click to join support Server](https://discord.gg/JqjJhFn)")
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic:"true",format:"gif",format:"png",size:256,size:256}))
    message.channel.send(`I have DMed You`).then(msg => {msg.delete({timeout:2000})});
await message.react(`✅`);
return message.author.send(invite).catch(() => message.channel.send(`Failed to DM you <@` + message.author + `>. Make sure your DMs are open. After opening DMs again do this command to get invite link`).then(msg => {message.delete({timeout:10000})}));
}
