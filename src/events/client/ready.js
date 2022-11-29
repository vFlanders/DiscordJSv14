const { ActivityType, Status } = require('discord.js');




module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        

        client.user.setActivity("/help", { type: ActivityType.Playing });
        client.user.setStatus("dnd");
        console.log(`${client.user.tag} has logged in`);

    

    },
};