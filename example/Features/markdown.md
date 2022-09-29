# markdown
this markdown convert discord message to markdown with color.

## example

```js
    const { Markdown } = require('coders.js');
    const mark = new Markdown().format('Hello World', 'DEFAULT', 'RED', null, true).format('Hello World', 'BOLD', 'GREEN', null, true).format('Hello World', 'UNDERLINE', 'BLUE', null, true).format('Hello World', 'BOTH', 'PINK', null, true).format('Hello World', 'DEFAULT', 'CYAN', null, true).format('Hello World', 'DEFAULT', 'WHITE', null, true).format('Hello World', 'DEFAULT', 'GRAY', null, true).format('Hello World', 'DEFAULT', 'YELLOW', null, true).format('Hello World', 'DEFAULT', 'INDIGO', null, true).format('Hello World', 'DEFAULT', 'ORANGE', null, true).format('Hello World', 'DEFAULT', 'DARKBLUE', null, true).format('Hello World', 'DEFAULT', 'LIGHTGRAY', null, true).format('Hello World', 'DEFAULT', 'DARKBLUE', 'WHITE', true).format('Hello World', 'DEFAULT', 'DARKBLUE', 'GRAY', true).format('Hello World', 'DEFAULT', 'DARKBLUE', 'LIGHTGRAY', true).format('Hello World', 'DEFAULT', 'DARKBLUE', 'INDIGO', true).format('Hello World', 'DEFAULT', 'DARKBLUE', 'ORANGE', true).toCodeblock();
    console.log(mark);
    message.channel.send(mark);
```
