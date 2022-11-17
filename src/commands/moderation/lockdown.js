const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    PermissionsBitField
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("lockdown")
      .setDescription("locks channel")
      .addChannelOption((option) =>
        option.setName("channel").setDescription("Select a channel")
        .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
    async execute(interaction, client) {
      const channel = interaction.options.getChannel("channel");
  
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: false,
        AttachFiles: false,
      });
  
      await channel.permissionOverwrites.edit(
        "888438064945434644",
        {
          SendMessages: true,
          AttachFiles: true,
        }
      );
  
      await interaction.reply({
        content: `:lock: ${channel} Was Succesfully Locked!`,
        ephemeral: true
      });
    },
  };