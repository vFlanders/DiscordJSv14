const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ss')
    .setDescription('Lists all available commands'),
    async execute(interaction) {
        let str
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
        const command = require(`./${file}`);
        str += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
        }

        return interaction.reply({
        content: str,
        ephemeral: true,
        });
    },
};