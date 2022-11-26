const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ChannelType,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-counter")
    .setDescription("Adds voice channel member counter")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription(
          "Select the channel where the tickets should be created"
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    ),

  async execute(interaction, client) {
    const {options, guild} = interaction;
    const category = options.getChannel("category")

    guild.channels.create({
        name: `${interaction.guild.MemberCount}`,
        type: ChannelType.GuildVoice,
        parent: (category),
    })
  },
};
