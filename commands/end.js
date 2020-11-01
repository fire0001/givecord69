const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaway Sponsor")){
        return message.channel.send('You do not have the require permissions to reroll this giveaway.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){ 
   const Discord = require('discord.js');
       let endembed = new Discord.MessageEmbed()
.setDescription('**How to end a giveaway ?**\n\nType:``g!end [Message ID]``\n\nExample: ``g!end 79451363312``')
.setFooter(`Requested by ${message.author.tag}`,`${message.author.avatarURL({dynamic: "true", format: "gif", format: "png", size: 256 ,size:256})}`)
        return message.channel.send(endembed);
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway is already ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

};
