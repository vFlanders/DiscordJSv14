const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription(
      "Try your luck at slots and try to win the big prize by getting the same emoji of one special emoji."
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount to bet")
        .setMinValue(10)
        .setMaxValue(50)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const slotItems = [
      "🎃",
      "🕸️",
      "🦇",
      "🧙‍",
      "🌙",
      "🐺",
      "🧟",
      "🍬",
      "⛱️",
      "🕷️",
      "🍫",
      "👽",
      "👻",
      "💀",
      "☠️",
      "🤡",
      "🤖",
      "🍭",
      "❓",
    ];

    const { options } = interaction;

    const storedBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    const amount = options.getInteger("amount");
    const money = interaction.guild.emojis.cache.find(emoji => emoji.name === 'money');

    if (amount < 10)
      return await interaction.reply({
        embeds: [
          (embed = new EmbedBuilder()
            .setTitle("**BALANCE**")
            .setDescription(`**Minimum bet is $10${money}**`)
            .setColor(0x390099)
            .setImage("https://i.imgur.com/0y0FObC.gif")),
        ],
        ephemeral: true,
      });
    else if (amount > storedBalance.balance)
      return await interaction.reply({
        embeds: [
          (embed = new EmbedBuilder()
            .setTitle("**BALANCE**")
            .setDescription(`**You do no have enough money**`)
            .setColor(0x390099)
            .setImage("https://i.imgur.com/0y0FObC.gif")),
        ],
        ephemeral: true,
      });
    let jackpot = false;
    let win = false;
    let number = [];

    for (let i = 0; i < 3; i++) {
      number[i] = Math.floor(Math.random() * slotItems.length);
    }

    if (number[0] == number[1] && number[1] == number[2]) {
      jackpot = true;
    }

    if (number[0] == number[1] && number[1] != number[2]) {
      win = true;
    }

    if (number[0] != number[1] && number[1] == number[2]) {
      win = true;
    }

    if (number[0] == number[2]) {
        win = true;
    }

    if (jackpot) {
      await Balance.findOneAndUpdate(
        { _id: storedBalance._id },
        {
          balance: await client.toFixedNumber(
            storedBalance.balance + (amount * 5)
          ),
        }
      );
      let slotsEmbed1 = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s slots game`)
        .setDescription(
          `► ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          } ◄\n\n**YOU WON!! You won the jackpot of $${amount * 5}${money}**`
        )
        .setColor(0x390099)
        .setImage("https://i.imgur.com/0y0FObC.gif");
      interaction.reply({ embeds: [slotsEmbed1] });
    } else if (win) {
      await Balance.findOneAndUpdate(
        { _id: storedBalance._id },
        {
          balance: await client.toFixedNumber(
            storedBalance.balance + (amount * 2)
          ),
        }
      );
      let slotsEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s slots game`)
        .setDescription(
          `► ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          } ◄\n\nNice You won $${amount * 2}${money}!`
        )
        .setColor(0x390099)
        .setImage("https://i.imgur.com/0y0FObC.gif");
      interaction.reply({ embeds: [slotsEmbed], ephemeral: true });
    } else {
      await Balance.findOneAndUpdate(
        { _id: storedBalance._id },
        { balance: await client.toFixedNumber(storedBalance.balance - amount) }
      );
      let slotsEmbed2 = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s slots game`)
        .setDescription(
          `► ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          } ◄\n\nKeep trying!`
        )
        .setColor(0x390099)
        .setImage("https://i.imgur.com/0y0FObC.gif");
      interaction.reply({ embeds: [slotsEmbed2], ephemeral: true });
    }
  },
};
