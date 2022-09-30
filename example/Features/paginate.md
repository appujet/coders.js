# paginate

## Example

simple example for paginate

```js
const { Paginate } = require('coders.js');
const paginate = new Paginate();
client.on('messageCreate', async (message) => {
    const Pages = [
        'This is page 1',
        'This is page 2',
        'This is page 3',
        'This is page 4',
    ]
    if (message.content === '!ping') {
        const page = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = Pages.slice(i * 10, i * 10 + 10).join('');
            let embed = client.embed()
                .setColor(client.config.color)
                .setTitle(`${interaction.guild.name} Server Queue`)
                .setDescription(str)
                .setFooter({ text: `Page ${i + 1}/${pagesNum}` });
            page.push(embed);
        
       await paginate(message, page);
    }
});
```

## Customization

you can provide options to paginate

```js
const { Paginate } = require('coders.js');
const paginate = new Paginate();
 // this is optional
       paginate.setEmojis({
             first: '⏮',
             back: '◀',
             next: '▶', 
             last: '⏭',
             stop: '⏹',
       })
        paginate.setTime(60000);
        paginate.setStyle('secondary');
        
```
