const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Search a meme"),


  async execute(interaction, message) {
    const { guild, member } = interaction;

    await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
        let meme = await res.json();

        let title = meme[0].data.children[0].data.title;
        let url = meme[0].data.children[0].data.url;
        let author = meme[0].data.children[0].data.author;

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setImage(url)
            .setURL(url)
            .setColor("Random")
            .setFooter({
                text: author
            });

        interaction.reply({
            embeds: [embed]
        })
    })

  }

}
  

