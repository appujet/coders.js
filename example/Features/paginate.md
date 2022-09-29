# paginate

## Example

simple example for paginate

```js
const { Paginate } = require('coders.js');
const paginate = new Paginate();
client.on('messageCreate', async (message) => {
    const page = [
        'This is page 1',
        'This is page 2',
        'This is page 3',
        'This is page 4',
    ]
    if (message.content === '!ping') {
        const embed = page.map((x) => new EmbedBuilder().setDescription(x));
      
       await paginate(message, embed);
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
