const Discord = require('discord.js');
const MessageEmbed = require('discord.js');

module.exports.run = async (client, message,args) => {
if (message.member.hasPermission('SEND_MESSAGES')) {
let helpembed = new Discord.MessageEmbed()
.setTitle('Command List | Help Center')
.setURL('https://discord.gg/3kKXz6WFaR')
.setDescription(`**Giveaway Commands** \n\`g!start\` - Guideline to Start a Giveaway .\n\`g!starte\` -Guide to Start a giveaway with @everyone ping.\n\`g!reroll\` -Guideline to Re roll a giveaway.\n\`g!end\` -Guideline to End a giveaway.`)
.addField(`Information Commands`,`\`g!serverinfo\` - Server Info  \n\`g!invite*\` - Support Server and Bot Invite Link (Make sure DMs Are open) \n\`g!channelinfo\` - Channel Information. \n\`g!ping*\` - Your Network Ping.\n \`g!flip*\` - Flip Coin (Heads/Tails).\n\`g!membercount\` - Current Server Member `) 
.addField(`Moderation Commands`,`\`g!slowmode\` - Control Slowmode via bot.\n\`g!whois\` - User's Information.\n\`g!purge\` - Delete upto 99 messages! `)
.addField(`Note : `,`\nModeration,Information and Giveaway Commands are available for Manage Server or above Permissions.Commands mark with * are available for everyone.`, true)
.setFooter(`Requested by ${message.author.tag}` , `${message.author.displayAvatarURL()}`)
.setTimestamp();

return message.author.send(helpembed).catch(() => message.react('❎'));
    
   }
 }
