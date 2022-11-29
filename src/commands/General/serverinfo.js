const { CommandInteraction, EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Info About the server"),

    /**
     * 
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const {guild} = interaction;
        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;

        const embed = new EmbedBuilder()
            .setColor(0x390099)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: "**GENERAL**",
                    value: [
                        `Name: ${guild.name}`,
                        `Created: <t:${parseInt(createdTimestamp / 1000)}:R>`,
                        `Owner: <@${ownerId}>`,
                        `Description: ${description || "-"}`,
                    ].join("\n")
                    
                },
                {
                    name: "🧒 ⋮ USERS",
                    value: [
                        `- Members: ${members.cache.filter((m) => !m.user.bot).size}`,
                        `- Users: ${members.cache.filter((m) => m.user.bot).size}`,
                        `Total: ${memberCount}`,
                    ].join("\n")
                },
                {
                    name: "📕 ⋮ CHANNELS",
                    value: [
                        `- Text: ${channels.cache.filter((c) => c.type === ChannelType.GuildText).size}`,
                        `- Voice: ${channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}`,
                        `- Threads: ${channels.cache.filter((c) => c.type === ChannelType.GuildNewsThread && ChannelType.GuildPrivateThread && ChannelType.GuildPublicThread).size}`,
                        `- Categories: ${channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}`,
                        `- Stages: ${channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}`,
                        `- News: ${channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}`,
                        `Total: ${channels.cache.size}`,
                    ].join("\n")
                },
                {
                    name: "😀 ⋮ EMOJIS & STICKERS",
                    value: [
                        `- Animated: ${emojis.cache.filter((e) => e.animated).size}`,
                        `- Static: ${emojis.cache.filter((e) => !e.animated).size}`,
                        `- Stickers: ${stickers.cache.size}`,
                        `Total: ${stickers.cache.size + emojis.cache.size}`,
                    ].join("\n")
                },
                // {
                //     name: "⋮NITRO STATISTICS",
                //     value:
                //     `
                //     - Tier: ${guild.premiumTier}
                //     - Boosts: ${guild.premiumSubscriptionCount}
                //     - Boosters: ${members.cache.filter((m) => m.premiumSince).size}
                    
                    
                    
                //     `
                // },
                {
                    name: "📄 ⋮ ROLES",
                    value: [
                        `- Roles: ${guild.roles.cache.size}`,
                    ].join("\n")
                }
            )
            .setFooter({ text: "Last Checked" })
            .setTimestamp()
            .setImage('https://i.imgur.com/0y0FObC.gif');

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}