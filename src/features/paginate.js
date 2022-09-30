const { EmbedBuilder, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
class Pagination {
    constructor() {
        this.paginateOptions = {
            style: ButtonStyle.Primary,
            timeout: 60000,
            emojis: {
                first: '⏮',
                back: '◀',
                next: '▶',
                last: '⏭',
                stop: '⏹',
            },
            ButtonCount: 5,
        };
    };
    /**
     * @param Time in milliseconds
     * @returns {Promise<void>}
     */
    setTime(time) {
        if (!time || typeof time !== 'number') throw new Error('time must be a number');
        this.paginateOptions.timeout = time;
        return this;
    };
    /**
     * 
     * @param Style of this format primary, secondary, success, danger
     * @returns {Promise<void>}
     */
    setStyle(style) {
        if (!style || typeof style !== 'string') throw new Error('Style must be a string');

        switch (style.toLowerCase()) {
            case 'primary':
                this.paginateOptions.style = ButtonStyle.Primary;
                break;
            case 'secondary':
                this.paginateOptions.style = ButtonStyle.Secondary;
                break;
            case 'success':
                this.paginateOptions.style = ButtonStyle.Success;
                break;
            case 'danger':
                this.paginateOptions.style = ButtonStyle.Danger;
                break;
            default: throw new Error('style must be a string and one of the following: primary, secondary, success, danger');
        }
        return this;
    };
    /**
     * 
     * @param object of this format {first: 'emoji', back: 'emoji', next: 'emoji', last: 'emoji', stop: 'emoji'}
     * @returns 
     */
    setEmojis(emojis) {
        if (!emojis.first || !emojis.back || !emojis.next || !emojis.last || !emojis.stop) throw new Error('Emojis must be an object with the following properties: first, back, next, last, stop');
        this.paginateOptions.emojis = emojis;
        return this;
    };
    /**
     * 
     * @param Number of buttons
     * @returns {Promise<void>}
     */
    setButtonCount(count) {
        if (!count || typeof count !== 'number') throw new Error('count must be a number equal to 3 or 5');
        switch (count) {
            case 3:
                this.paginateOptions.ButtonCount = 3;
                break;
            case 5:
                this.paginateOptions.ButtonCount = 5;
                break;
            default: throw new Error('count must be a number equal to 3 or 5');
        }
        return this;
    };

    // function to paginate embeds
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {EmbedBuilder} embeds 
     * @param {this.paginateOptions} options 
     * @returns 
     */
    async send(interaction, embeds, options = this.paginateOptions) {
        this.validate(interaction, embeds, options);

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
        let page = 0;
        let generatePage;
        if (this.paginateOptions.ButtonCount === 5) {
            generatePage = (page) => {
                let firstEmbed = page === 0;
                let lastEmbed = page === embeds.length - 1;
                const embed = embeds[page];
                // create the buttons
                const first = new ButtonBuilder()
                    .setCustomId('first')
                    .setEmoji(options.emojis.first)
                    .setStyle(options.style);
                if (firstEmbed) first.setDisabled(true);
                const back = new ButtonBuilder()
                    .setCustomId('back')
                    .setEmoji(options.emojis.back)
                    .setStyle(options.style);
                if (firstEmbed) back.setDisabled(true);
                const next = new ButtonBuilder()
                    .setCustomId('next')
                    .setEmoji(options.emojis.next)
                    .setStyle(options.style);
                if (lastEmbed) next.setDisabled(true);
                const last = new ButtonBuilder()
                    .setCustomId('last')
                    .setEmoji(options.emojis.last)
                    .setStyle(options.style);
                if (lastEmbed) last.setDisabled(true);
                const stop = new ButtonBuilder()
                    .setCustomId('stop')
                    .setEmoji(options.emojis.stop)
                    .setStyle(ButtonStyle.Danger);
                // create the action row
                const row = new ActionRowBuilder()
                    .addComponents(first, back, stop, next, last);
                // reutrn the embed and the action row
                return { embeds: [embed], components: [row] };
            };
        } else if (this.paginateOptions.ButtonCount === 3) {
            generatePage = (page) => {
                let firstEmbed = page === 0;
                let lastEmbed = page === embeds.length - 1;
                const embed = embeds[page];
                // create the buttons
                const back = new ButtonBuilder()
                    .setCustomId('back')
                    .setEmoji(options.emojis.back)
                    .setStyle(options.style);
                if (firstEmbed) back.setDisabled(true);
                const next = new ButtonBuilder()
                    .setCustomId('next')
                    .setEmoji(options.emojis.next)
                    .setStyle(options.style);
                if (lastEmbed) next.setDisabled(true);
                const stop = new ButtonBuilder()
                    .setCustomId('stop')
                    .setEmoji(options.emojis.stop)
                    .setStyle(ButtonStyle.Danger);
                // create the action row
                const row = new ActionRowBuilder()
                    .addComponents(back, stop, next);
                // reutrn the embed and the action row
                return { embeds: [embed], components: [row] };
            }
        };
        const msgOptions = generatePage(0);
        // send the first embed
        let msg;
        if (interaction instanceof CommandInteraction) {
            mgs = interaction.deferred ? await interaction.followUp({ ...msgOptions, fetchReply: true }) : await interaction.reply({ ...msgOptions, fetchReply: true });
        } else {
            msg = await interaction.channel.send({ ...msgOptions });
        };

        // chak if the interaction is a command interaction
        let int;
        if (interaction instanceof CommandInteraction) {
            int = interaction.user
        } else {
            int = interaction.author
        }
        // create the collector
        const filter = i => i.customId === 'first' || i.customId === 'back' || i.customId === 'next' || i.customId === 'last' || i.customId === 'stop';
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: options.timeout });
        // create the collector event
        collector.on('collect', async i => {
            // if the button is clicked by the user who ran the command
            if (i.user.id === int.id) {
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
                    await i.editReply({ embeds: [embeds[page]], components: [] });
                };
                // if the button is clicked by someone else
            } else {
                // reply to the interaction
                await i.reply({ content: 'You cannot use this button!', ephemeral: true });
            };
        });
        // create the collector end event
        collector.on('end', async () => {
            // edit the message
            await msg.edit({ embeds: [embeds[page]], components: [] });
        });
    };
    /**
     * 
     * @param {CommandInteraction || Message} interaction 
     * @param {EmbedBuilder} embeds  
     * @returns 
     */
    validate(interaction, embeds, options) {
        if (!interaction || typeof interaction !== 'object') throw new Error('interaction must be an object');
        if (!embeds || !Array.isArray(embeds)) throw new Error('embeds must be an array');
        if (!options || typeof options !== 'object') throw new Error('options must be an object');
        if (!options.style || typeof options.style !== 'number') throw new Error('options.style must be a number');
        if (!options.timeout || typeof options.timeout !== 'number') throw new Error('options.timeout must be a number');
        if (!options.emojis || typeof options.emojis !== 'object') throw new Error('options.emojis must be an object');
        if (!options.emojis.first || typeof options.emojis.first !== 'string') throw new Error('options.emojis.first must be a string');
        if (!options.emojis.back || typeof options.emojis.back !== 'string') throw new Error('options.emojis.back must be a string');
        if (!options.emojis.next || typeof options.emojis.next !== 'string') throw new Error('options.emojis.next must be a string');
        if (!options.emojis.last || typeof options.emojis.last !== 'string') throw new Error('options.emojis.last must be a string');
        if (!options.emojis.stop || typeof options.emojis.stop !== 'string') throw new Error('options.emojis.stop must be a string');
        if (!options.ButtonCount || typeof options.ButtonCount !== 'number') throw new Error('options.ButtonCount must be a number');
    }
};

module.exports = Pagination;