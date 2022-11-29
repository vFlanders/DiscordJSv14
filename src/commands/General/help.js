const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonBuilder, 
  ButtonStyle,
  RateLimitError,
} = require('discord.js');

function Accuracy() {
  var rating = Math.floor((Math.random() * 50) + 50);
  return rating;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows a list of all coammnds."),
  async execute(interaction, client) {
    
    const emojis = {
      ticket: "🎫",
      fun: "🥳",
      moderation: "🛠️",
      general: "⚙️",
      economy: "🪙",
    };
    const { user } = interaction;
    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = interaction.client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "Pro tento příkaz neexistuje žádný popis.",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
    .setTitle(`</>'s help page`)
    .setThumbnail('https://i.imgur.com/Hwbz1Cg.png')
    .setColor(0x390099)
    .setDescription(`
    Hey there ${interaction.user}!

    ${client.user} is bot with lot of cool features!

    **My command categories :**

    <:gear:1046007102096818176> **General**
    <:tools:1046006785481379880> **Moderation**
    <:tickets:1046008817147727933> **Ticket**
    <:coin:1047226142064648292> **Economy**

    Choose a category below for General, Moderation, Economy and Ticket commands

    
    `)
    // .setAuthor({name:`${user.tag}`, iconURL: `${user.avatarURL({dynamic: true, size: 512})}`})
    .setFooter({ text: '</>#2217', iconURL: 'https://i.imgur.com/Hwbz1Cg.png'})
    .setImage('https://i.imgur.com/0y0FObC.gif');

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Nothing selected.")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Display all commands form category ${cmd.directory}.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      ephemeral: false,
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );
      
      const mappedCommands = category.commands.map((cmd) => {
            return `**${cmd.name}**`
          }
        );
        
      const stringedCommands = mappedCommands.join(` , \n`);

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${formatString(directory)} commands`)
        .setDescription(stringedCommands)
        .setThumbnail('https://i.imgur.com/Hwbz1Cg.png')
        .setColor(0x390099)
        .setImage('https://i.imgur.com/0y0FObC.gif');

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
      console.error()
    });
  },
};