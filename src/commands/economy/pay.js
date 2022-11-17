const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Pay another user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user youd like to view balance of")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The Amount you would like to send")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const userStoredBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    const amount = interaction.options.getNumber("amount");
    const selectedUser = interaction.options.getUser("target");

    if (selectedUser.bot || selectedUser.id == interaction.user.id)
      return await interaction.reply({
        content: `You cannot send money to yourself, or a bot`,
        ephemeral: true,
      });
    else if (amount < 1.00)
      return await interaction.reply({
        content: `The Amount stated must be over $1.00`,
        ephemeral: true,
      });
    else if (amount > userStoredBalance.amount)
      return await interaction.reply({
        content: `You do not have enough funds to send that amount`,
        ephemeral: true,
      });

    const selectedUserBalance = await client.fetchBalance(
      selectedUser.id,
      interaction.guild.id
    );

    amount = await client.toFixedNumber(amount);

    await Balance.findOneAndUpdate(
      { _id: userStoredBalance._id },
      {
        balance: await client.toFixedNumber(userStoredBalance.balance - amount),
      }
    );

    await Balance.findOneAndUpdate(
      { _id: selectedUserBalance._id },
      {
        balance: await client.toFixedNumber(
          selectedUserBalance.balance + amount
        ),
      }
    );

    await interaction.reply({
      content: `You have sent $${amount} to ${selectedUser}`,
      ephemeral: true,
    });
  },
};
