const { Client, GatewayIntentBits, EmbedBuilder, ButtonStyle } = require('discord.js');
const { paginate } = require('../src/index.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});
const options = {
    style: ButtonStyle.Primary,
    timeout: 60000,
    emojis: {
        first: '⏮',
        back: '◀',
        next: '▶',
        last: '⏭',
        stop: '⏹',
    }
}
client.on('messageCreate', async (message) => {
    const page = [
        'This is page 1',
        'This is page 2',
        'This is page 3',
        'This is page 4',
    ]
    if (message.content === '!ping') {
        const embed = page.map((x) => new EmbedBuilder().setDescription(x));
        await paginate(message, embed, options);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.commandName === 'ping') {
        const page = [
            'This is page 1',
            'This is page 2',
            'This is page 3',
            'This is page 4',
        ]
        const embed = page.map((x) => new EmbedBuilder().setDescription(x));
        await paginate(interaction, embed, options);
    }
});

client.login('token');
