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
        .setTitle(`${interaction.guild.name}`)
        .setFields([
          {
            name: "Total Members",
            value: `${interaction.guild.memberCount}`,
          },
          {
            name: "Humans",
            value: `${interaction.guild.members.cache.filter(member => !member.user.bot).size}`,
          },
          {
            name: "Robots",
            value: `${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
          },
        ])
        .setColor(0x390099)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({
          text: `${interaction.guild.name}`,
          iconURL: `${client.user.displayAvatarURL()}`,
        });
  
      await interaction.reply({ embeds: [embed], ephemeral: true });
    },
  };