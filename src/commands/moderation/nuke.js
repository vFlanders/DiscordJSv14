const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Delete the channel and clones it so pings are removed.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to nuke")
        .setRequired(false)
    ),
  async execute(interaction) {
    const channel =
      interaction.options.getChannel("channel") || interaction.channel;

    const message = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🤯 Nuke Channel")
          .setDescription(`Are you sure you want to nuke ${channel}?`)
          .setColor(0x390099)
          .setImage('https://i.imgur.com/0y0FObC.gif'),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Yes")
            .setStyle(ButtonStyle.Success)
            .setCustomId("yes")
            .setEmoji("✅"),
          new ButtonBuilder()
            .setLabel("No")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("no")
            .setEmoji("🗑️")
        ),
      ],
      fetchReply: true,
      ephemeral: true,
    });

    const collector = message.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 60000,
      max: 1,
    });

    collector.on("collect", async (i) => {
      collector.stop();
      await i.deferUpdate();
      if (i.customId === "yes") {
        channel.clone().then((newChannel) => {
          channel.delete();
          newChannel.setPosition(channel.position);
          newChannel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("🗑️ Nuke Channel")
                .setDescription(
                  `${channel.name} has been nuked by ${interaction.user}`
                )
                .setColor(0x390099)
                .setImage('https://i.imgur.com/0y0FObC.gif'),
            ],
            ephemeral: true,
          });
          if (channel.id !== interaction.channelId) {
            interaction.editReply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("🗑️ Nuke Channel")
                  .setDescription(`${channel.name} has been nuked correctly`)
                  .setColor(0x390099)
                  .setImage('https://i.imgur.com/0y0FObC.gif'),
              ],
              components: [],
              ephemeral: true,
            });
          }
        });
      } else if (i.customId === "no") {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle("🗑️ Nuke Channel")
              .setDescription(`${channel} has not been nuked`)
              .setColor(0x390099)
              .setImage('https://i.imgur.com/0y0FObC.gif'),
          ],
          components: [],
          ephemeral: true,
        });
      }
    });
  },
};
