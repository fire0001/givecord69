module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`)
let totalUsers = client.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    var activities = [ `${client.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
    setInterval(() => client.user.setActivity(`g!help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),3000)
    

};
