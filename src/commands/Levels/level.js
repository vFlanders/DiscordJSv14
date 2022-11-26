const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  const Levels = require("discord.js-leveling");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("level")
      .setDescription(`Set user's level`)
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addSubcommand((subcommand) =>
        subcommand
          .setName("add")
          .setDescription("Add levels to user")
          .addUserOption((option) =>
            option
              .setName("target")
              .setDescription("Select a user")
              .setRequired(true)
          )
          .addIntegerOption((option) =>
            option
              .setName("amount")
              .setDescription("Amount of Level.")
              .setMinValue(0)
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remove")
          .setDescription("Remove level from a user")
          .addUserOption((option) =>
            option
              .setName("target")
              .setDescription("Select a user")
              .setRequired(true)
          )
          .addIntegerOption((option) =>
            option
              .setName("amount")
              .setDescription("Amount of levels.")
              .setMinValue(0)
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("set")
          .setDescription("Set a user's level.")
          .addUserOption((option) =>
            option
              .setName("target")
              .setDescription("Select a user")
              .setRequired(true)
          )
          .addIntegerOption((option) =>
            option
              .setName("amount")
              .setDescription("Amount of level.")
              .setMinValue(0)
              .setRequired(true)
          )
      ),
  
    async execute(interaction) {
      const { options, guildId } = interaction;
  
      const sub = options.getSubcommand();
      const target = options.getUser("target");
      const amount = options.getInteger("amount");
      const embed = new EmbedBuilder();
  
      try {
          switch (sub) {
              case "add":
                  await Levels.appendLevel(target.id, guildId, amount);
                  embed.setDescription(`Added ${amount} of level's to ${target}.`).setColor(0x390099).setTimestamp();
              case "remove":
                  await Levels.subtractLevel(target.id, guildId, amount);
                  embed.setDescription(`Removed ${amount} of level's from ${target}.`).setColor(0x390099).setTimestamp();
              case "set":
                  await Levels.setLevel(target.id, guildId, amount);
                  embed.setDescription(`Set ${target} level's to ${amount}.`).setColor(0x390099).setTimestamp();
                  break;
              
          }
  
      } catch(err ) {
          console.log(err);
      }
  
      interaction.reply({embeds: [embed], ephemeral: true});
    },
  };
  