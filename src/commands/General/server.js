const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Info about support server"),

    async execute(interaction) {
        const message = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x390099)
                    .setDescription("Hello")
                    .setImage("https://i.imgur.com/0y0FObC.gif")
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel("Invite")
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://discord.com/api/oauth2/authorize?client_id=1038023167408611389&permissions=8&scope=bot%20applications.commands"),
                    new ButtonBuilder()
                        .setLabel("Support Server")
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://discord.com/invite/VRFccUdntU")
                )
            ]
        })
    }
}
