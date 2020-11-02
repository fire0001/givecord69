const ms = require('ms');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaway Sponsor")){
        return message.channel.send('You Must need the Manage Server Perm or Giveaway Sponsor Role to do this command');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){ 
       const startembed = new Discord.MessageEmbed()
       .setTitle('My Prefix is ``g!``')
       .setDescription("**How to start a Giveaway?** \nType : ``g!start [#ChannelName] [Duration] [Winner(s)] [Giveaway Name]`` \n\n**Example:** g!start #blabla 2d 1 Fake Nitro \n\n**Instruction:**\n``[#ChannelName]`` - Where you want to start a giveaway ?\n``[Duration]`` - How long your giveaway is \n1d = 1 Day \n1h = 1 Hour \n1s = 1 Second\n``[Winner(s)]`` - How much Winner You want \n1 - 1 Winner \n2 - 2 Winners ... \n``[Giveaway Name]`` - Name of your Giveaway\nMake a Role Named 'Giveaway Sponsor'. So that the member e able to start a giveaway with Administrator Permissions or Manage Guild Permission!!")
       .setFooter(`Requested by ${message.author.username}`, `${message.author.avatarURL({dynamic: "true", format: "gif", format: "png", size: 256 ,size:256})}`) 
       .setTimestamp();
        return message.channel.send(startembed);
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('You have to specify a valid number of winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send('You have to specify a valid prize!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: "🎉🎉 GIVEAWAY GOING ON🎉🎉",
            giveawayEnded: "🎉🎉Giveaway Ended🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React 🎉 to join the Giveaway!",
            winMessage: "Congratulations, {winners} ! You won **{prize}**!",
            embedFooter: "by reacting to this message you agree to get a confirmation message.",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`)      
      .then(msg => {
          msg.delete({ timeout: 1000 });
      })
      .catch(console.error); 

};
