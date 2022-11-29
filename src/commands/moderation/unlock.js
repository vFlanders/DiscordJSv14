const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    EmbedBuilder,
    CommandInteraction
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("unlocks channel")
      .addChannelOption((option) =>
        option.setName("channel").setDescription("Select a channel")
        .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
    async execute(interaction, client) {
      
      const channel = interaction.options.getChannel("channel") || interaction.channel;
  
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: true,
        AttachFiles: true,
      });
  
      await channel.permissionOverwrites.edit(
        "888438064945434644",
        {
          SendMessages: true,
          AttachFiles: true,
        }
      );

      const embed = new EmbedBuilder()
        .setTitle("**CHANNEL UNLOCKED**")
        .setDescription(`:unlock: ${channel} Was Successfully Unlocked!`)
        .setColor(0x390099)
        .setImage('https://i.imgur.com/0y0FObC.gif')
  
      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    },
  };