const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute a member from the guild")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Select the user you wish to unmute.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ content: `⛔: Something went wrong.`, ephemeral: true });
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ content: `⛔: Something went wrong.`, ephemeral: true });

        try {
            await member.timeout(null);

            interaction.reply({ content: `✅ ${user} Was Succesfully Unmuted`, ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}