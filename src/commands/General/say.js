const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say something using embeds")
    // .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title for the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Text For the Description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("color").setDescription("Set an color for the embed")
    )
    .addStringOption((option) =>
      option.setName("author").setDescription("Set an author for the embed")
    )
    .addStringOption((option) =>
      option.setName("footer").setDescription("Set an footer for the embed")
    ),

  async execute(interaction) {
    const { channel, options } = interaction;
    const title = options.getString("title");
    const description = options.getString("description");
    const color = options.getString("color");
    const author = options.getString("author");
    const footer = options.getString("footer");

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color || (0x390099)) //0x390099
      .setAuthor({ name: `${author || " "}` })
      .setFooter({ text: `${footer}` })
      .setImage('https://i.imgur.com/0y0FObC.gif');

    const EmbedSend = await channel.send({ embeds: [embed] });

    interaction.reply({ content: "Text Was Sent!", ephemeral: true });
  },
};
