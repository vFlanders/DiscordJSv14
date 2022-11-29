const { REST } = require("@discordjs/rest");
const { table } = require("console");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const commandFile = require(`../../commands/${folder}/${file}`);
        const properties = {folder, ...commandFile };
        commands.set(commandFile.data.name, properties);
        commandArray.push(commandFile.data.toJSON());

      }
    }

    const clientId = "1044883291720912967";
    const guildId = "888077778396778627";
    const rest = new REST({ version: "9" }).setToken(process.env.token);

    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application (/) commands. ");
    } catch (error) {
      console.error(error);
    }
  };
};
