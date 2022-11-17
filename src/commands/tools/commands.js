const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription(`Retur's A List Of Commands`),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle(`**__Commands:__**`)
        // .setDescription('Cool description')
        .setColor(0x2f3136)
        // .setImage(client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
            url: `https://youtube.com`,
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag
        })
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text : client.user.tag
        })
        .setFields([
            {
                name: `ㅤ`,
                value: `**------ Moderator ------** \n\n /ban : Bans An User \n /unban : Unbans An User \n /kick : Kicks An User \n /timeout : Timeouts An User\n /clear : Clears Certain Amount Of Messages \n /mute : Mutes An User \n /unmute : Unmutes An User \n\n **------ Misc ------** \n\n /button : Button Example \n /getavatar : Get Your Avatar \n /menu : Menu Example \n /poll : Makes An Poll \n /verify : Adds An Verify Button`,
                inline: true
            }
        ])
        
        await interaction.reply({
            embeds: [embed]
        })
    }

}