const { ActivityType, Status } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        client.user.setActivity("over NG", { type: ActivityType.Watching });
        client.user.setStatus("dnd");
        console.log(`${client.user.tag} has logged in`);
    },
};