const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require('../../schemas/balance');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Returns Balance")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to view balance of")
    ),

  async execute(interaction, client) {
    const selectedUser =
      interaction.options.getUser("target") || interaction.user;
    const storedBalance = await client.getBalance(
      selectedUser.id,
      interaction.guild.id
    );

    const money = interaction.guild.emojis.cache.find(emoji => emoji.name === 'money');

    if (!storedBalance)
      return await interaction.reply({
        content: `${selectedUser.tag}, Doesn't have a balance`,
        ephemeral: true,
      });
    else {
      const embed = new EmbedBuilder()
        .setTitle(`${selectedUser.username}'s Balance:`)
        .setTimestamp()
        .setColor(0x390099)
        .setDescription(`$${storedBalance.balance} ${money}`)
        .setFooter({
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage('https://i.imgur.com/0y0FObC.gif');

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
