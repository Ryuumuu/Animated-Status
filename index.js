const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Please connect me into a hosting website to enable 24/7 hosting. ItzNexus#5354'))

app.listen(port, () =>
console.log(`Creator: ItzNexus`)
);
const request = require("request");
const config = require("./config.json");
const STATUS_URL = "https://discordapp.com/api/v8/users/@me/settings";

async function loop() {
	for (let anim of config.animation) {
		await doRequest(anim.text, anim.emojiID, anim.emojiName).catch(console.error);
		await new Promise(p => setTimeout(p, anim.timeout));
	}

	loop();
}
console.log("Running...");
loop();

function doRequest(text, emojiID = null, emojiName = null) {
	return new Promise((resolve, reject) => {
		request({
			method: "PATCH",
			uri: STATUS_URL,
			headers: {
				Authorization: process.env.TOKEN
			},
			json: {
				custom_status: {
					text: text,
					emoji_id: emojiID,
					emoji_name: emojiName
				}
			}
		}, (err, res, body) => {
			if (err) {
				reject(err);
				return;
			}

			if (res.statusCode !== 200) {
				reject(new Error("Invalid Status Code: " + res.statusCode));
				return;
			}

			resolve(true);
		});
	});
}
