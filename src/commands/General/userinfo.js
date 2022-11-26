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
            .setColor(0x00ff00)
            .setAuthor(target.user.id, target.user.avatarURL({dynamic: true, size: 512}))
            .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
            .addField({ text: `ID ${target.user.id}`})
            .addField({ text: `Roles${target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`})
            .addField({ text: `Member since <t:${parseInt(target.joinedTimestamp / 1000)}:R>`})
            .addField({ text: `Discord user since <t:${parseInt(target.user.createdTimestamp / 1000)}:R>`})

            interaction.reply({embeds: [Response], ephemeral: true})
    }
}