const { Client, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a member from the guild.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Member You Want To Mute")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("time")
                .setDescription("How long should the mute last?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason For The Mute")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("time");
        const convertedTime = ms(time);
        const reason = options.getString("reason") || "No Reason Provided";

        // const errEmbed = new EmbedBuilder()
        //     .setDescription('Something went wrong. Please try again later.')
        //     .setColor(0xc72c3b)

        // const succesEmbed = new EmbedBuilder()
        //     .setTitle("**:white_check_mark: Muted**")
        //     .setDescription(`Succesfully muted ${user}.`)
        //     .addFields(
        //         { name: "Reason", value: `${reason}`, inline: true },
        //         { name: "Duration", value: `${time}`, inline: true }
        //     )
        //     .setColor(0x5fb041)
        //     .setTimestamp();

        // if (member.roles.highest.position >= interaction.member.roles.highest.position)
        //     return interaction.reply({ embeds: [errEmbed], ephemeral: true }); // this if statement is optional (but recommended)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ content: `⛔: ${user} Cannot be muted`, ephemeral: true });

        if (!convertedTime)
            return interaction.reply({ content: `⛔: Couldnt be muted`, ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ content: `✅: ${user} Has Been Muted! \n Reason : ${reason} \n Time : ${time} Minutes`, ephemeral: true });
        } catch (err) {
            console.log(err);
        }
        
    }
}