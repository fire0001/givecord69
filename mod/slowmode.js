const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => { 

  if(!message.member.hasPermission('ADMINISTRATOR')) return;

  if(!args[0]) return message.channel.send("Spefify the length of slowmode in seconds! (1-21600 Seconds)") 
message.delete();
  let duration = args[0] 

  message.channel.setRateLimitPerUser(duration)
  .catch(() => {
    message.channel.send("Failed to set slowmode in this channel, check your slowmode length.")
  })
  message.channel.send("Slowmode setted to " + duration + " seconds!").then(msg => {
        msg.delete({ timeout: 2000 });
      })
      .catch(console.error);
}

