const { EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: {
         name: 'guildMemberAdd',
    },
    async execute(interaction, client) {

        const user = interaction.user.id;
        const embed = new EmbedBuilder()
            .setTitle(`${user} Joined`)
            .setDescription('Hello')
    }
}