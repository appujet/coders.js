const { fetch } = require('undici');
const base = 'https://dankmemer.services/api';
class Dankmemer {
    /**
     * @constructor
     * @param {String} token API token
     * {@link https://dankmemer.services/ you can get token here}
     * @returns {Dankmemer}
     */
    constructor(token) {
        if (!token) throw new Error('No token provided');
        this.token = token;
    };
    async get(endpoint) {
        const { body } = await fetch(base + endpoint, {
            headers: {
                Authorization: this.token
            }
        });
        return await body.json();
    }
    /**
     * 
     * @param {String} text text to create meme
     * @returns {Promise<Buffer>}
     * @example
     * const { Dankmemer } = require('coders.js');
     * const dankmemer = new Dankmemer('token');
     * const text = 'Hello World';
     * dankmemer.abandon(text).then(buffer => {
     *    message.channel.send({ files: [buffer] });
     * });
     */
    async abandon(text) {
        if (!text) throw new Error('No text provided');
        return await this.get('/abandon?text=' + text);
    };
    /**
     * 
     * @param {String} avatar user avatar
     * @returns {Promise<Buffer>}
     * @example
     * const { Dankmemer } = require('coders.js');
     * const dankmemer = new Dankmemer('token');
     * const avatar = message.author.displayAvatarURL({ format: 'png' });
     * dankmemer.achievement(avatar).then(buffer => {
     *   message.channel.send({ files: [buffer] });
     * });
     */
    async aborted(avatar) {
        if (!avatar) throw new Error('No avatar provided');
        return await this.get('/aborted?avatar1=' + avatar);
    }

}

module.exports = Dankmemer;
