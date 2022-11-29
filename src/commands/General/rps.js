const {
  SlashCommandBuilder,
  Client,
  ChatInputCommandInteraction,
  ComponentType,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const Balance = require("../../schemas/balance");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Rock paper scissor")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount you want to bet")
        .setRequired(true)
    ),

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { user, guild, options } = interaction;
    let choices = ["rock", "paper", "scissor"];
    let win = false;
    const botchoice = `${choices[Math.floor(Math.random() * choices.length)]}`;
    console.log(`The bot choosed ${botchoice}`);

    const storedBalance = await client.fetchBalance(
      interaction.user.id,
      interaction.guild.id
    );
    const amount = options.getInteger("amount");

    const Embed = new EmbedBuilder()
      .setColor(0x390099)
      .setAuthor({
        name: "Rock Paper Scissor",
        iconURL: user.displayAvatarURL(),
      })
      .setDescription(`<@${user.id}> Choose Your Move Wisely!`)
      .setImage(
        "https://static.vecteezy.com/system/resources/previews/000/691/497/original/rock-paper-scissors-neon-icons-vector.jpg"
      );

    if (win) {
      await Balance.findOneAndUpdate(
        { _id: storedBalance._id },
        {
          balance: await client.toFixedNumber(
            storedBalance.balance + amount * 2
          ),
        }
      );
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("rock")
        .setLabel("Rock")
        .setEmoji(`✊`),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("paper")
        .setLabel("Paper")
        .setEmoji(`✋`),

      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("scissor")
        .setLabel("Scissor")
        .setEmoji(`✌`)
    );

    const Page = await interaction.reply({
      embeds: [Embed],
      components: [row],
    });
    const col = Page.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: ms("20s"),
    });
    col.on("collect", (i) => {
      switch (i.customId) {
        case "rock":
          {
            if (botchoice == "rock") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🔀 ⋮ Game Tied**`)
                    .addFields(
                      { name: "Your choice", value: "✊Rock", inline: true },
                      { name: "My choice", value: "✊Rock", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }

            if (botchoice == "paper") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**😥 ⋮ You Lost The Game**`)
                    .addFields(
                      { name: "Your choice", value: "✊Rock", inline: true },
                      { name: "My choice", value: "✋Paper", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
            if (botchoice == "scissor") {
              win = true;
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🎊 ⋮ You Won The Game!**`)
                    .addFields(
                      { name: "Your choice", value: "✊Rock", inline: true },
                      { name: "My choice", value: "✌️Scissor", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
          }
          break;
        case "paper":
          {
            if (botchoice == "rock") {
              win = true;
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🎊 ⋮ You Won The Game!**`)
                    .addFields(
                      { name: "Your choice", value: "✋Paper", inline: true },
                      { name: "My choice", value: "✊Rock", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }

            if (botchoice == "paper") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🔀 ⋮ Game Tied**`)
                    .addFields(
                      { name: "Your choice", value: "✋Paper", inline: true },
                      { name: "My choice", value: "✋Paper", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
            if (botchoice == "scissor") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**😥 ⋮ You Lost The Game**`)
                    .addFields(
                      { name: "Your choice", value: "✋Paper", inline: true },
                      { name: "My choice", value: "✌️Scissor", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
          }
          break;

        case "scissor":
          {
            if (botchoice == "rock") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**😥 ⋮ You Lost The Game**`)
                    .addFields(
                      { name: "Your choice", value: "✌️Scissor", inline: true },
                      { name: "My choice", value: "✊Rock", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }

            if (botchoice == "paper") {
              win = true;
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🎊 ⋮ You Won The Game!**`)
                    .addFields(
                      { name: "Your choice", value: "✌️Scissor", inline: true },
                      { name: "My choice", value: "✋Paper", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
            if (botchoice == "scissor") {
              return interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x390099)
                    .setAuthor({
                      name: "Rock Paper Scissor",
                      iconURL: user.displayAvatarURL(),
                    })
                    .setDescription(`**🔀 ⋮ Game Tied**`)
                    .addFields(
                      { name: "Your choice", value: "✌️Scissor", inline: true },
                      { name: "My choice", value: "✌️Scissor", inline: true }
                    )
                    .setImage("https://i.imgur.com/0y0FObC.gif"),
                ],
                components: [],
              });
            }
          }
          break;
      }
    });
    if (win) {
      await Balance.findOneAndUpdate(
        { _id: storedBalance._id },
        {
          balance: await client.toFixedNumber(
            storedBalance.balance + (amount * 2)
          ),
        }
      );
    };
    col.on("end", (collected) => {
      if (collected.size > 0) return;

      interaction.editReply({
        embeds: [Embed.setDescription(`You didn't choose your move`)],
        components: [],
      });
    });
  },
};
