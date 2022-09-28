# paginate 

## Example
simple example for paginate

```js
const { paginate } = require('coders-discord');
client.on('messageCreate', async (message) => {
    const page = [
        'This is page 1',
        'This is page 2',
        'This is page 3',
        'This is page 4',
    ]
    if (message.content === '!ping') {
        const embed = page.map((x) => new EmbedBuilder().setDescription(x));
       // options is optional
       await paginate(message, embed, options);
    }
});
```
## Customization
you can provide options to paginate

```js
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
```


