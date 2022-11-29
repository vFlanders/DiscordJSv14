const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Beg for money"),

    async execute(interaction, client) {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const storedBalance = await client.fetchBalance(interaction.user.id, interaction.guild.id);

        await Balance.findOneAndUpdate({ _id: storedBalance._id },
         {
            balance: await client.toFixedNumber(storedBalance.balance + randomNumber)
         }
        );

        const embed = new EmbedBuilder()
         .setDescription(`**You Begged And Got $${randomNumber}**`)
         .setColor(0x390099)
         .setImage("https://i.imgur.com/0y0FObC.gif")

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}