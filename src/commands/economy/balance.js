const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Returns Balance')
    .addUserOption(option =>
         option
            .setName('target')
            .setDescription('The user youd like to view balance of'),
        ),
    
    async execute(interaction, client) {
        const selectedUser = interaction.options.getUser('target') || interaction.user;
        const storedBalance = await client.getBalance(selectedUser.id, interaction.guild.id);

        if (!storedBalance) return await interaction.reply({
            content: `${selectedUser.tag}, Doesnt have a balance`,
            ephemeral: true,
        });
        else {
            const embed = new EmbedBuilder()
            .setTitle(`${selectedUser.username}'s Balance:`)
            .setTimestamp()
            .addFields([
                {
                    name: `$${storedBalance.balance}`,
                    value: `\u200b`
                }
            ])
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.displayAvatarURL()
            });

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    },

};