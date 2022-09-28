const { EmbedBuilder, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');

class Panginate {

    constructor() {

        this.paginateOptions = {
            style: ButtonStyle.Primary,
            timeoutv: 60000,
            emojis: {
                first: '⏮',
                back: '◀',
                next: '▶',
                last: '⏭',
                stop: '⏹',
            }
        }
    }


    /**
     * 
     * @param Time in miliseconds
     * @returns Panginate
     */


    setTime(time) {

        if (!time || typeof time != "number") {
            throw new Error(`You didn't provide valid time in miliseconds!`)
        }

        this.paginateOptions.timeout = time;
        return this;
    }


    /**
         * 
         * @param Style of button
         * @returns Panginate
    */

    setStyle(style) {

        if (!style || typeof style != "string") {
            throw new Error(`You didn't provide valid style option`)
        }

        switch (style) {
            case "primary":
                {
                    this.paginateOptions.style = ButtonStyle.Primary;
                    break;
                }

            case "danger":
                {
                    this.paginateOptions.style = ButtonStyle.Danger;
                    break;
                }
            case "success":
                {
                    this.paginateOptions.style = ButtonStyle.Success;
                    break;
                }
            case "secondary":
                {
                    this.paginateOptions.style = ButtonStyle.Secondary;
                    break;
                }
            default:
                {
                    throw new Error(`Style must be  primary | danger | success | secondary`);
                }

        }
        return this;
    }


    /**
     * 
     * @param Object of emojis
     * @returns Panginate
    */

    setEmoji(options) {

        if (!options.first || !options.back || !options.next || !options.last || !options.stop) {
            throw new Error(`You didn't provide valid emojis`)
        }

        this.paginateOptions.emojis = options;
        return this;


    }




    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {EmbedBuilder} embeds 
     * @param {paginateOptions} options 
     * @returns 
     */
    async panginate(interaction, embeds, options = this.paginateOptions) {

        this.validation(interaction, embed);

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
                .setEmoji(options.emoji.first)
                .setStyle(options.style);
            if (firstEmbed) first.setDisabled(true);
            const back = new ButtonBuilder()
                .setCustomId('back')
                .setEmoji(options.emoji.back)
                .setStyle(options.style);
            if (firstEmbed) back.setDisabled(true);
            const next = new ButtonBuilder()
                .setCustomId('next')
                .setEmoji(options.emoji.next)
                .setStyle(options.style);
            if (lastEmbed) next.setDisabled(true);
            const last = new ButtonBuilder()
                .setCustomId('last')
                .setEmoji(options.emoji.last)
                .setStyle(options.style);
            if (lastEmbed) last.setDisabled(true);
            const stop = new ButtonBuilder()
                .setCustomId('stop')
                .setEmoji(options.emoji.stop)
                .setStyle(ButtonStyle.Danger);
            // create the action row
            const row = new ActionRowBuilder()
                .addComponents(first, back, stop, next, last);
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
            await msg.edit({ embeds: [embeds[page]], components: [] });
        });
    };


    validation(interaction, embed) {

        if (!interaction || typeof interaction !== "object") {
            throw new Error(`panginate function's first argument must be an interaction object`)
        }

        if (!embed || typeof embed !== "object") {
            throw new Error(`panginate function's second argument must be an embed object`)
        }


    }

}

module.exports = Panginate;