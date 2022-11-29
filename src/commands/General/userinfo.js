const { ContextMenuCommandBuilder, EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("userinfo")
        .setType(ApplicationCommandType.User),
    /**
     * 
     * @param {ContextMenuCommandInteraction} interaction
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);
 
        const Response = new EmbedBuilder()
            .setColor(0x390099)
            .setAuthor({ name: `${target.user.tag}`})
            .setThumbnail(target.user.avatarURL())
            .addFields(
                { name: '**Roles:**', value: `${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}` },
                { name: '**Member Since: **', value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>` },
                { name: '**Discord User Since: **', value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>` },
                { name: '**Discord ID: **', value:  `${target.user.id}`}
            )
            .setTimestamp()
            .setImage('https://i.imgur.com/0y0FObC.gif')
            interaction.reply({embeds: [Response]})
    }
}