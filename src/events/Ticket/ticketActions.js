const {
  ButtonInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const TicketSetup = require('../../schemas/TicketSetup');
const ticketSchema = require("../../schemas/Ticket");

module.exports = {
  name: "interactionCreate",

  async execute(interaction) {
    const { guild, member, customId, channel } = interaction;
    const { ManageChannels, SendMessages } = PermissionFlagsBits;

    if (!interaction.isButton()) return;

    if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

    const docs = await TicketSetup.findOne({ GuildID: guild.id});

    if (!docs) return;

    if (!guild.members.me.permissions.has((r) => r.id === docs.Handlers))
      return interaction.reply({
        content: "I dont have permissions for this",
        ephemeral: true,
      });

    const embed = new EmbedBuilder().setColor("Aqua");

    ticketSchema.findOne({ ChannelID: channel.id }, async (err, data) => {
      if (err) throw err;
      if (!data) return;

      const fetchedMember = await guild.members.cache.get(data.MembersID);

      switch (customId) {
        case "close":
          if (data.closed == true)
            return interaction.reply({
              content: "Ticket is already getting deleted....",
              ephemeral: true,
            });

          const transcript = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
          });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Closed: true }
          );

          const transcriptEmbed = new EmbedBuilder()
            .setTitle(`Transcript Type: ${data.Type}\nID: ${data.TicketID}`)
            .setFooter({
              text: member.user.tag,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

          const transcriptProcess = new EmbedBuilder()
            .setTitle("Saving Transcript....")
            .setDescription("Ticket will close in 10 seconds")
            .setColor("Red")
            .setFooter({
              text: member.user.tag,
              iconURL: member.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

          const res = await guild.channels.cache.get(docs.Transcripts).send({
            embeds: [transcriptEmbed],
            files: [transcript],
          });

          channel.send({ embeds: [transcriptProcess] });

          setTimeout(function () {
            member
              .send({
                embeds: [
                  transcriptEmbed.setDescription(
                    `Access to your ticket transcript: ${res.url}`
                  ),
                ],
              })
              .catch(() => channel.send("Couldnt send transcript"));
            channel.delete();
          }, 10000);

          break;

        case "lock":
          if (!member.permissions.has(ManageChannels))
            return interaction.reply({
              content: "You dont have permissions for that",
              ephemeral: true,
            });

          if (data.Locked == true)
            return interaction.reply({
              content: "Ticket is already locked",
              ephemeral: true,
            });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: true }
          );
          embed.setDescription("Ticket was locked successfully");

          data.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, {
              SendMessages: false,
            });
          });

          

          return interaction.reply({ embeds: [embed] });

        case "unlock":
          if (!member.permissions.has(ManageChannels))
            return interaction.reply({
              content: "You don't have permissions for that",
              ephemeral: true,
            });

          if (data.Locked == false)
            return interaction.reply({
              content: "Ticket is already unlocked",
              ephemeral: true,
            });

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: false }
          );
          embed.setDescription("Ticket was unlocked successfully");

          data.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, {
              SendMessages: true,
            });
          });

          return interaction.reply({ embeds: [embed] });

        case "claim":
            if(!member.permissions.has(ManageChannels))
              return interaction.reply({
                content: "You don't have permissions for that",
                ephemeral: true,
              });
            
            if (data.Claimed == true)
                return interaction.reply({content: `Ticket already claimed by <@${data.ClaimedBy}>`, ephemeral: true});

            await ticketSchema.updateOne({ChannelID: channel.id}, { Claimed: true, ClaimedBy: member.id });

            embed.setDescription(`Ticket was successfully claimed by ${member}`);

            interaction.reply({embeds: [embed]});

            break;
      }
    });
  },
};
