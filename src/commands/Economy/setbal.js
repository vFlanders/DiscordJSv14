const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbal")
    .setDescription("Set Balance To An User")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
      .setName("target")
      .setDescription("User's balance you want to set")
      .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount you want to add")
        .setRequired(true)
    ),

    async execute(interaction, client) {
        const {options} = interaction;
        const amount = options.getInteger("amount");
        const selectedUser = options.getUser("target");
        const money = interaction.guild.emojis.cache.find(emoji => emoji.name === 'money');

        const selectedUserBalance = await client.fetchBalance(selectedUser.id, interaction.guild.id);

        await Balance.findOneAndUpdate({ _id: selectedUserBalance._id }, { balance: await client.toFixedNumber(selectedUserBalance.balance - selectedUserBalance.balance + amount)});

        await interaction.reply({ content: `You have set ${selectedUser}'s balance to $${selectedUserBalance.balance - selectedUserBalance.balance + amount}${money}`, ephemeral: true });
    }
};
