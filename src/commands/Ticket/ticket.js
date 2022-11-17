const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} = require("discord.js");
const ticketSchema = require("../../schemas/Ticket");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket actions")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Add or remove member from the ticket")
        .setRequired(true)
        .addChoices(
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" }
        )
    )
    .addUserOption(option => option.setName("member").setDescription("Select a member to join this ticket").setRequired(true)),

    async execute(interaction) {
        const {guildId, options, channel} = interaction;
        const action = options.getString("action");
        const member = options.getUser("member");

        const embed = new EmbedBuilder()
        

        switch (action) {
            case "add":
                ticketSchema.findOne({GuildID: guildId, ChannelID: channel.id}, async (err, data) => {
                    if (err) throw err;
                    if (!data)
                        return interaction.reply({embeds: [embed.setColor("Red").setDescription("something went wrong")], ephemeral: true})

                    if (data.MembersID.includes(member.id))
                        return interaction.reply({embeds: [embed.setColor("Red").setDescription("something went wrong")], ephemeral: true})

                    data.MembersID.push(member.id);

                    channel.permissionOverwrites.edit(member.id, {
                        SendMessages: true,
                        ViewChannel: true,
                        ReadMessageHistory: true
                    });

                    interaction.reply({embeds: [embed.setColor("Green").setDescription(`${member} has been added to ticket`)]});

                    data.save();
                });
                break;
            case "remove":
            ticketSchema.findOne({GuildID: guildId, ChannelID: channel.id}, async (err, data) => {
                if (err) throw err;
                if (!data)
                    return interaction.reply({embeds: [embed.setColor("Red").setDescription("something went wrong")], ephemeral: true})

                if (!data.MembersID.includes(member.id))
                    return interaction.reply({embeds: [embed.setColor("Red").setDescription("something went wrong")], ephemeral: true})

                data.MembersID.remove(member.id);

                channel.permissionOverwrites.edit(member.id, {
                    SendMessages: false,
                    ViewChannel: false,
                    ReadMessageHistory: false
                });

                interaction.reply({embeds: [embed.setColor("Green").setDescription(`${member} has been removed to ticket`)]});

                data.save();
            });
            break;
        }

    }
};
