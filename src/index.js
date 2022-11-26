require('dotenv').config();
const { token, mongodb } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;
const logs = require('discord-logs');
const {handleLogs} = require('./handlers/handleLogs');
const Levels = require('discord.js-leveling');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

logs(client, {
    debug: true
});


client.handleEvents();
handleLogs(client);
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
    await connect(mongodb).catch(console.error);
})();
