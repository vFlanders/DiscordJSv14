const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    EmbedBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("locks channel")
      .addChannelOption((option) =>
        option.setName("channel").setDescription("Select a channel")
        .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
    async execute(interaction, client) {
      const channel = interaction.options.getChannel("channel") || interaction.channel;
  
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
      

      const embed = new EmbedBuilder()
        .setTitle("**CHANNEL LOCKED**")
        .setDescription(`:lock: ${channel} Was Successfully Locked!`)
        .setColor(0x390099)
        .setImage('https://i.imgur.com/0y0FObC.gif')

      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    },
  };