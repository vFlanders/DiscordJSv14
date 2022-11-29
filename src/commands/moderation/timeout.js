const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout Specific Member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member You Want To Timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of minutes to timeout member for")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("reason")
      .setDescription("The Reason To Timeout This Member")
    ),

    
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason") || ("No Reason Provided");
    const time = interaction.options.getInteger("time");
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    const embed = new EmbedBuilder()
      .setTitle("**TIMEOUT SET SUCCESSFULLY**")
      .setColor(0x390099)
      .setImage('https://i.imgur.com/0y0FObC.gif')
      .addFields({ name: "**USER**", value: `${user.tag}`, inline: true }, { name: "**REASON**", value: `${reason}`, inline: true }, { name: "**TIME**", value: `${time}`, inline: true })

    if (!reason) reason = "No Reason Provided";

    await member.timeout(time * 60 * 1000, reason).catch(console.error);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
