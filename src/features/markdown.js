// unicode for the bullet character
const unicode = '\u001b';
// the bullet character
const typeCodeblock = 'ansi';
// the valid color numbers
const validColor = {
    'GREY': 30,
    'RED': 31,
    'GREEN': 32,
    'YELLOW': 33,
    'BLUE': 34,
    'PINK': 35,
    'CYAN': 36,
    'WHITE': 37,
};
// the valid background color numbers
const validBackgroundColor = {
    'DARKBLUE': 40,
    'ORANGE': 41,
    'GRAY': 42,
    'LIGHTGRAY': 44,
    'INDIGO': 45,
    'WHITE': 47
}
// the valid style numbers
const typeFormat = {
    'BOLD': '0;1;',
    'UNDERLINE': '0;4;',
    'DEFAULT': '0;',
    'BOTH': '1;4;'
}

class Markdown {
    /**
     * @constructor
     */
    constructor() {
       
        this.string = '';
    };
    /**
     *
     * @param {String} text Text to format
     * @param {String | null} type Format text ?
     * * `BOLD`: '0;1;',
     * * `UNDERLINE`: '0;4;',
     * * `DEFAULT`: '0;',
     * * `BOTH`: '1;4;',
     * @param {String | null} color Color of text
     * * `GRAY`: 30,
     * * `RED`: 31,
     * * `GREEN`: 32,
     * * `YELLOW`: 33,
     * * `BLUE`: 34,
     * * `PINK`: 35,
     * * `CYAN`: 36,
     * * `WHITE`: 37
     * @param {String | null} backgroundColor
     * * `DARKBLUE`: 40,
     * * `ORANGE`: 41,
     * * `GRAY`: 42,
     * * `LIGHTGRAY`: 44,
     * * `INDIGO`: 45,
     * * `WHITE`: 47
     * @param {Boolean} newLine Add new line ?
     * @returns {String} Return string (not format)
     * @example
     * const { Markdown } = require('coders.js');
     * const markdown = new Markdown();
     * markdown.format('Hello World', 'BOLD', 'RED', 'DARKBLUE', true);
     */
    // eslint-disable-next-line no-unused-vars
    format(text, type = 'DEFAULT', color = null, backgroundColor = null, newLine = false,) {
        if (!typeof text === 'string') throw new Error('Text must be string');
        if (!typeof type === 'string')
            throw new Error('Format options must be string');
        let format = `${unicode}[${typeFormat[type] || '0;'}${validColor[color] ? `${validColor[color]};` : '99;'}${validBackgroundColor[backgroundColor] ? `${validBackgroundColor[backgroundColor]};` : '99;'}`;
        if (format.endsWith(';')) format = format.slice(0, -1);
        this.string = `${this.string}${format}m${text}${newLine ? '\n' : ''}`;
        return this;
    };
    /**
     *
     * @returns {String} Return formatted string
     * @example
     * const { Markdown } = require('coders.js');
     * const markdown = new Markdown();
     * const text = markdown.format('Hello World', 'BOLD', 'RED', 'DARKBLUE', true).toCodeblock();
     * message.channel.send(text);
     */
    toCodeblock() { return `\`\`\`${typeCodeblock}\n${require('discord.js').escapeCodeBlock(this.string)}\`\`\``; }
};
// export the class
module.exports = Markdown;