const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for money")
    .addNumberOption((option) =>
      option
        .setName("begamount")
        .setDescription("Amount to beg")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const userStoredBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    const begamount = interaction.options.getNumber("begamount");
    const selectedUser = interaction.user;

    const selectedUserBalance = await client.fetchBalance(selectedUser.id, interaction.guild.id);

    begamount = await toFixedNumber(begamount);

    await Balance.findOneAndUpdate(
      { _id: userStoredBalance._id },
      {
        balance: await client.toFixedNumber(
          userStoredBalance.balance + begamount
        ),
      }
    );

    await interaction.reply({
        content: `You begged for $${begamount} and got it`,
        ephemeral: true
    });
  },
};
