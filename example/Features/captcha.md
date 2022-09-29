# captcha

## example

```js
const { Captcha } = require('coders.js');

// Use this function for blocking certain commands or features from automated self-bots
function verifyHuman(msg) {
	let captcha = new Captcha();
	msg.channel.send({ content: 'Please verify that you are human by solving the following captcha:', files: [new AttachmentBuilder(captcha.JPEGStream, "captcha.jpeg")] });
    
	let collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id);
	collector.on("collect", m => {
		if (m.content.toUpperCase() === captcha.value) msg.channel.send("Verified Successfully!");
		else msg.channel.send("Failed Verification!");
		collector.stop();
	});
}
```