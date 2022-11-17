const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick Specific Member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Member You Want To Kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The Reason To Kick This Member")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members.fetch(user.id).catch(console.error)

    if (!reason) reason = "No Reason Provided";

    await member.kick(reason).catch(console.error);

    await interaction.reply({content: `✅: ${user.tag} Was Succesfully Kicked!`,ephemeral: true,});
  },
};
