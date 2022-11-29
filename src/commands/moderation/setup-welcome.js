const {Message, Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const welcomeSchema = require("../../schemas/Welcome");
const { model, Schema } = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-welcome")
    .setDescription("Set up your welcome message for the discord bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => 
        option.setName("channel")
        .setDescription("Channel for welcome messages.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("welcome-message")
        .setDescription("Enter your welcome message.")
        .setRequired(true)
    )
    .addRoleOption(option =>
        option.setName("welcome-role")
        .setDescription("Enter your welcome role.")
        .setRequired(true)    
    ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
        const roleId = options.getRole("welcome-role");

        const embed = new EmbedBuilder()
            .setTitle("**WELCOME SETUP**")
            .setDescription(`Welcome Channel Was Successfully Set As ${welcomeChannel}`)
            .setColor(0x390099)
            .setImage('https://i.imgur.com/0y0FObC.gif');


        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }


        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    Role: roleId.id
                });
            }
            interaction.reply({embeds: [embed], ephemeral: true});
        })
    }
}