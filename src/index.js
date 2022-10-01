const { chunk, ms, StringToMs, shuffleArray } = require('./features/utils');
module.exports = {
    Paginate: require('./features/paginate.js'),
    Markdown: require('./features/markdown.js'),
    Captcha: require('./features/captcha.js'),
    Dankmemer: require('./features/dankmemer.js'),
    DiscordTogether: require('./features/discordtogether.js'),
    chunk,
    ms,
    StringToMs,
    shuffleArray
}