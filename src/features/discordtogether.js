const { Client } = require('discord.js');
const { fetch } = require('undici');

const defaultApplications = {
    youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
    youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
    poker: '755827207812677713',
    betrayal: '773336526917861400',
    fishing: '814288819477020702',
    chess: '832012774040141894',
    chessdev: '832012586023256104', // Note : First package to offer chessDev, any other package offering it will be clearly inspired by it
    lettertile: '879863686565621790', // Note : First package to offer lettertile, any other package offering it will be clearly inspired by it
    wordsnack: '879863976006127627', // Note : First package to offer wordsnack any other package offering it will be clearly inspired by it
    doodlecrew: '878067389634314250', // Note : First package to offer doodlecrew, any other package offering it will be clearly inspired by it
    awkword: '879863881349087252', // Note : First package to offer awkword, any other package offering it will be clearly inspired by it
    spellcast: '852509694341283871', // Note : First package to offer spellcast, any other package offering it will be clearly inspired by it
    checkers: '832013003968348200', // Note : First package to offer checkers, any other package offering it will be clearly inspired by it
    puttparty: '763133495793942528', // Note : First package to offer puttparty, any other package offering it will be clearly inspired by it
    sketchheads: '902271654783242291', // Note : First package to offer sketchheads any other package offering it will be clearly inspired by it
    ocho: '832025144389533716', // Note : First package to offer ocho any other package offering it will be clearly inspired by it
    puttpartyqa: '945748195256979606',
    sketchyartist: '879864070101172255', // Note : First package to offer sketchyartist, any other package offering it will be clearly inspired by it
    land: '903769130790969345',
    meme: '950505761862189096',
    askaway: '976052223358406656',
    bobble: '947957217959759964',
};
/**
* Class symbolizing a YoutubeTogether
* @template {Object.<string, string>} T
*/
class DiscordTogether {
    /**
     * Create a new YoutubeTogether
     * @param {Client} client Discord.Client
     * @param {T} applications
     * @example
     * const { Client } = require('discord.js');
     * const client = new Client({
     *   intents: [
     *      GatewayIntentBits.Guilds,
     *      GatewayIntentBits.MessageContent,
     *      GatewayIntentBits.GuildMessages,
     *     ],
     * });
     * const { DiscordTogether } = require('coders.js');
     *
     * client.discordTogether = new DiscordTogether(client);
     *
     * client.on('messageCreate', async message => {
     *      if (message.content === 'start') {
     *          client.discordTogether.createTogetherCode(message.member.voice.channelID, 'puttparty').then(async invite => {
     *              return message.channel.send(`${invite.code}`);
     *           });
     *      };
     * });
     *
     * client.login('your token');
     */
    constructor(client, applications = defaultApplications) {
        if (!client) throw new SyntaxError('Invalid Discord.Client !');

        /**
         * Discord.Client
         */
        this.client = client;

        /**
         * Discord Together applications
         */
        this.applications = { ...defaultApplications, ...applications };
    }

    /**
     * Create a Youtube Together invite code (note: send the invite using markdown link)
     * @param {string} voiceChannelId
     * @param {keyof (defaultApplications & T)} option
     * @example
    * client.on('messageCreate', async message => {
     *      if (message.content === 'start') {
     *          client.discordTogether.createTogetherCode(message.member.voice.channelID, 'puttparty').then(async invite => {
     *              return message.channel.send(`${invite.code}`);
     *           });
     *      };
     * });
     * @returns {Promise<{ code: String; }>}
     */
    async createTogetherCode(voiceChannelId, option) {
        /**
         * @param {string} code The invite link (only use the blue link)
         */
        let Data = {
            code: 'none',
        };
        if (option && this.applications[option.toLowerCase()]) {
            let applicationID = this.applications[option.toLowerCase()];
            try {
                const { body } = await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bot ${this.client.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: applicationID,
                        target_type: 2,
                        temporary: false,
                        validate: null,
                    }),
                });
                const data = await body.json();
                Data.code = `https://discord.com/invite/${data.code}`;

            } catch (e) {
                throw new Error('Error while creating the invite !');
            }
            return Data;
        } else {
            throw new Error('Invalid option !');
        }
    }
}
module.exports = DiscordTogether;