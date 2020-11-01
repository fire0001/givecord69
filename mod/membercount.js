const MessageEmbed = require('discord.js');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => { 

if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "MODERATOR")) return;

 
  const mem = new Discord.MessageEmbed() 
  .setDescription(`**Members**\n**${message.guild.memberCount}**`)
  .setColor()
   message.channel.send(mem).catch()
};
