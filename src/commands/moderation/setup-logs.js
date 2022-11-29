const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const logSchema = require("../../schemas/Logs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-logs")
    .setDescription("Setup your logs")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel for logging messages")
        .setRequired(false)
    ),

  async execute(interaction) {
    const { channel, guildId, options } = interaction;

    const logChannel = options.getChannel("channel") || channel;
    const embed = new EmbedBuilder();

    logSchema.findOne({ Guild: guildId }, async (err, data) => {
      if (!data) {
        await logSchema.create({
          Guild: guildId,
          Channel: logChannel.id,
        });

        embed
          .setDescription("Data was successfully sent to the database")
          .setColor(0x390099)
          .setImage('https://i.imgur.com/0y0FObC.gif')
          .setTimestamp();
      } else if (data) {
        logSchema.findOneAndDelete({ Guild: guildId });
        await logSchema.create({
          Guild: guildId,
          Channel: logChannel.id,
        });

        embed
          .setDescription("Data was successfully replaced with the new data")
          .setColor(0x390099)
          .setImage('https://i.imgur.com/0y0FObC.gif')
          .setTimestamp();
      }

      if (err) {
        embed
          .setDescription("Something went wrong....")
          .setColor(0x390099)
          .setImage('https://i.imgur.com/0y0FObC.gif')
          .setTimestamp();
      }

      return interaction.reply({ embeds: [embed], ephemeral: true });
    });
  },
};
