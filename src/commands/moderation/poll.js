const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll and send it to a certain channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe the poll.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Where do you want to send the poll to?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setTitle("**------ Poll ------**")
            .setColor(0x390099)
            .setDescription(description)
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("🔼");
            await m.react("🔽");
            await interaction.reply({ content: "✅: Poll was succesfully sent to the channel.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}