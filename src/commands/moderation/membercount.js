const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("membercount")
      .setDescription("Shows number of members in the server.")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction, client) {
      const embed = new EmbedBuilder()
        .setTitle("MEMBERCOUNT")
        .setFields([
          {
            name: "📋 ⋮ Total",
            value: `${interaction.guild.memberCount}`,
            inline: true,
          },
          {
            name: "🧒 ⋮ Humans",
            value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`,
            inline: true,
          },
          {
            name: "🤖 ⋮ Robots",
            value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
            inline: true,
          },
        ])
        .setColor(0x390099)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
          text: `${interaction.guild.name}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        })
        .setImage('https://i.imgur.com/0y0FObC.gif');
  
      await interaction.reply({ embeds: [embed], ephemeral: true });
    },
  };