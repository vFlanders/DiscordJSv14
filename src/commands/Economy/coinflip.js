const {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin"),

  async execute(interaction, client) {
    const { options } = interaction;

    const answer = Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails";

    const message = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("**COINFLIP**")
          .setDescription(`${answer}`)
          .setColor(0x390099)
          .setImage("https://i.imgur.com/0y0FObC.gif"),
      ]
    });
  },
};
