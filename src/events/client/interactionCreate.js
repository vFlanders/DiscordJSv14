const {CommandInteraction} = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `⛔`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { customId } = interaction;
      if (customId == "apina") {
        const role = interaction.guild.roles.cache.get("888438262765613077");
        return interaction.member.roles
          .add(role)
          .then((member) =>
            interaction.reply({
              content: `${role} has been assigned to you`,
              ephemeral: true,
            })
          );
      }
    } else if (interaction.isSelectMenu()) {
      const { customId } = interaction;
      const { selectMenus } = client;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("No code for this menu");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
