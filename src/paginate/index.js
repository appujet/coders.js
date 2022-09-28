const { EmbedBuilder, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
// options for the paginate function
const paginateOptions = {
    style: ButtonStyle.Primary,
    timeout: 60000,
    emoji: {
        first: '⏮',
        back: '◀',
        next: '▶',
        last: '⏭',
        stop: '⏹',
    },
}
// function to paginate embeds
/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {EmbedBuilder} embeds 
 * @param {paginateOptions} options 
 * @returns 
 */
const paginate = async (interaction, embeds, options = paginateOptions) => {
    // if there is only one embed, send it and return
    if (embeds.length < 2) {
        if (interaction instanceof CommandInteraction) {
            interaction.deferred ? await interaction.followUp({ embeds: embeds }) : await interaction.reply({ embeds: embeds });
            return;
        } else {
            await interaction.channel.send({ embeds: embeds });
            return;
        };
    };
    // if there are no embeds, return
    let page = 0;
    const generatePage = (page) => {
        let firstEmbed = page === 0;
        let lastEmbed = page === embeds.length - 1;
        const embed = embeds[page];
        // create the buttons
        const first = new ButtonBuilder()
            .setCustomId('first')
            .setLabel(options.emoji.first)
            .setStyle(options.style);
        if (firstEmbed) first.setDisabled(true);
        const back = new ButtonBuilder()
            .setCustomId('back')
            .setLabel(options.emoji.back)
            .setStyle(options.style);
        if (firstEmbed) back.setDisabled(true);
        const next = new ButtonBuilder()
            .setCustomId('next')
            .setLabel(options.emoji.next)
            .setStyle(options.style);
        if (lastEmbed) next.setDisabled(true);
        const last = new ButtonBuilder()
            .setCustomId('last')
            .setLabel(options.emoji.last)
            .setStyle(options.style);
        if (lastEmbed) last.setDisabled(true);
        const stop = new ButtonBuilder()
            .setCustomId('stop')
            .setLabel(options.emoji.stop)
            .setStyle(options.style);
        // create the action row
        const row = new ActionRowBuilder()
            .addComponents(first, back, next, last, stop);
        // reutrn the embed and the action row
        return { embeds: [embed], components: [row] };
    };
    const msgOptions = generatePage(0);
    // send the first embed
    let msg;
    if (interaction instanceof CommandInteraction) {
        mgs = interaction.deferred ? await interaction.followUp({ ...msgOptions, fetchReply: true }) : await interaction.reply({ ...msgOptions, fetchReply: true });
    } else {
        msg = await interaction.channel.send({ ...msgOptions });
    };
    // create the collector
    const filter = i => i.customId === 'first' || i.customId === 'back' || i.customId === 'next' || i.customId === 'last' || i.customId === 'stop';
    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: options.timeout });
    // create the collector event
    collector.on('collect', async i => {
        // if the button is clicked by the user who ran the command
        if (i.user.id === interaction.user.id) {
            // defer the interaction
            await i.deferUpdate();
            // if the button is the first button
            if (i.customId === 'first') {
                // if the page is not the first page
                if (page !== 0) {
                    // set the page to the first page
                    page = 0;
                    // get the new embed
                    const newEmbed = generatePage(page);
                    // edit the message
                    await i.editReply(newEmbed);
                };
            };
            // if the button is the back button
            if (i.customId === 'back') {
                // if the page is not the first page
                if (page !== 0) {
                    // subtract one from the page
                    page--;
                   // get the new embed
                   const newEmbed = generatePage(page);
                   // edit the message
                   await i.editReply(newEmbed);
                };
            };
            // if the button is the next button
            if (i.customId === 'next') {
                // if the page is not the last page
                if (page !== embeds.length - 1) {
                    // add one to the page
                    page++;
                    // get the new embed
                    const newEmbed = generatePage(page);
                    // edit the message
                    await i.editReply(newEmbed);
                };
            };
            // if the button is the last button
            if (i.customId === 'last') {
                // if the page is not the last page
                if (page !== embeds.length - 1) {
                    // set the page to the last page
                    page = embeds.length - 1;
                    // get the new embed
                    const newEmbed = generatePage(page);
                    // edit the message
                    await i.editReply(newEmbed);
                };
            };
            // if the button is the stop button
            if (i.customId === 'stop') {
                // stop the collector
                collector.stop();
                // edit the message
                await i.editReply({ embeds: [currentPage], components: [] });
            };
        }
        // if the button is clicked by someone else
        else {
            // reply to the interaction
            await i.reply({ content: 'You cannot use this button!', ephemeral: true });
        };
    });
    // create the collector end event
    collector.on('end', async () => {
        // edit the message
        await msg.edit({ embeds: [currentPage], components: [] });
    });
};
// export the function
module.exports = paginate;