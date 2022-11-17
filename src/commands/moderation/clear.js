const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specific amount of messages from a target or channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('amount')
        .setDescription('Amount of messages to clear.')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('target')
        .setDescription('Select a target to clear their messages.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        
        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                interaction.reply({content: `✅: Succesfully deleted ${messages.size} messages from ${target}.`, ephemeral: true});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                interaction.reply({content: `✅: Succesfully deleted ${messages.size} messages from ${target}.`, ephemeral: true});
            });
        }
    }
}


// message.reply('Invalid command').then(msg => {setTimeout(() => msg.delete(), 10000)})
// message.reply('Invalid command').then(msg => {msg.delete({ timeout: 20000 });})
