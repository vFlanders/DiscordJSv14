const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('return a button'),
    async execute(interaction, client, message) {

        if (!message.channel.nsfw) return message.channel.send('Niges');

        const button = new ButtonBuilder()
        .setCustomId('apina')
        .setLabel('Click me')
        .setStyle(ButtonStyle.Primary);

    await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)]
    });
    },

};