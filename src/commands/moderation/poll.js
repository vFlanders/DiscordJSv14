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
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options, message } = interaction;

        const channel = options.getChannel("channel") || interaction.channel;
        const description = options.getString("description");

        const plusone = interaction.guild.emojis.cache.find(emoji => emoji.name === 'plusone');
        const minusone = interaction.guild.emojis.cache.find(emoji => emoji.name === 'minusone');

        const embed = new EmbedBuilder()
            .setTitle("**❓ POLL ❓**")
            .setColor(0x390099)
            .setDescription(description)
            .setImage('https://i.imgur.com/0y0FObC.gif')
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react(plusone);
            await m.react(minusone);
            await interaction.reply({ content: "Poll was successfully sent to the channel.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}