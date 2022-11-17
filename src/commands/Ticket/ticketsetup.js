const {
  Client,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ChannelType,
  Embed,
} = require("discord.js");
const TicketSetup = require("../../schemas/TicketSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketsetup")
    .setDescription("Create a ticket message")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "Select the channel where the tickets should be created"
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription(
          "Select the channel where the tickets should be created"
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addChannelOption((option) =>
      option
        .setName("transcripts")
        .setDescription(
          "Select the channel where the tickets should be created"
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addRoleOption((option) =>
      option
        .setName("handlers")
        .setDescription("Select the ticket  handlers role")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("everyone")
        .setDescription("Tag the everyone role")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Format: (Name of the button, Emoji)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("firstbutton")
        .setDescription("Format: (Name of the button, Emoji)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("secondbutton")
        .setDescription("Format: (Name of the button, Emoji)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("thirdbutton")
        .setDescription("Format: (Name of the button, Emoji)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("fourthbutton")
        .setDescription("Format: (Name of the button, Emoji)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;

    try {
      const channel = options.getChannel("channel");
      const category = options.getChannel("category");
      const transcripts = options.getChannel("transcripts");

      const handlers = options.getRole("handlers");
      const everyone = options.getRole("everyone");

      const description = options.getString("description");
      const firstbutton = options.getString("firstbutton").split(",");
      const secondbutton = options.getString("secondbutton").split(",");
      const thirdbutton = options.getString("thirdbutton").split(",");
      const fourthbutton = options.getString("fourthbutton").split(",");

      const emoji1 = firstbutton[1];
      const emoji2 = secondbutton[1];
      const emoji3 = thirdbutton[1];
      const emoji4 = fourthbutton[1];

      await TicketSetup.findOneAndUpdate(
        {GuildID: guild.id},
        {
          Channel: channel.id,
          Category: category.id,
          Transcripts: transcripts.id,
          Handlers: handlers.id,
          Everyone: everyone.id,
          Description: description,
          Buttons: [firstbutton[0], secondbutton[0], thirdbutton[0], fourthbutton[0]]
        },
        {
          new: true,
          upsert: true,
        }
      );
  
      const button = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId(firstbutton[0])
          .setLabel(firstbutton[0])
          .setStyle(ButtonStyle.Danger)
          .setEmoji(emoji1),
        new ButtonBuilder()
          .setCustomId(secondbutton[0])
          .setLabel(secondbutton[0])
          .setStyle(ButtonStyle.Danger)
          .setEmoji(emoji2),
        new ButtonBuilder()
          .setCustomId(thirdbutton[0])
          .setLabel(thirdbutton[0])
          .setStyle(ButtonStyle.Danger)
          .setEmoji(emoji3),
        new ButtonBuilder()
          .setCustomId(fourthbutton[0])
          .setLabel(fourthbutton[0])
          .setStyle(ButtonStyle.Danger)
          .setEmoji(emoji4)
      );

      const embed = new EmbedBuilder()
      .setDescription(description);
  
      await guild.channels.cache.get(channel.id).send({
        embeds: [embed],
        components: [button],
      });
  
      interaction.reply({
        content: "Ticket message has been sent!",
        ephemeral: true,
      });

    } catch (err) {
      console.log(err);
      const errEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("Something went wrong....");

        return interaction.reply({embeds: [errEmbed], ephemeral: true});
    }

    const embed = new EmbedBuilder().setDescription(
      "Open a ticket in the discord server"
    );

  },
};
