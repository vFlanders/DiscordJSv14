const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Return a menu"),
  async execute(interaction, client) {
    const menu = new SelectMenuBuilder()
      .setCustomId('sub-menu')
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new SelectMenuOptionBuilder({
          label: `option 1`,
          value: `https://youtube.com`
        }),
        new SelectMenuOptionBuilder({
          label: `option 2`,
          value: `https://google.com`
        })
      );

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)]
    });
  },
};
