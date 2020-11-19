const async = require("async"); 
const fs = require("fs");
const config = require("./config.json");
const Enmap = require("enmap");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`nyaa`);

	var gameloopi = 0;
	function gameloop() {
		let activity = config.gameloop[gameloopi];
		client.user.setActivity(activity.text,{type: activity.type});
		setTimeout(() => {
			if (gameloopi < config.gameloop.length-1) {
				gameloopi++;
			} else {
				gameloopi = 0;
			}
		gameloop();
		},config.gameloopinterval);
	}
	gameloop();                         
	console.log("Started game presence loop!");         

	client.commands = new Enmap();

	fs.readdir("./commands/", (err, files) => {
		if (err) return console.error(err);
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			let props = require(`./commands/${file}`);
			let commandName = file.split(".")[0];
			client.commands.set(commandName, props);
		});
	});

	client.on("message", async message => {
		if(message.author.bot) return;
		if(message.channel.type === "dm") return message.channel.send(`Hello! My functionality is restricted to servers. Btw get you frends to join here :) https://discord.gg/3x5wNWa`);

		let prefix = config.prefix;
		let messageArray = message.content.split(" ");
		let cmd = messageArray[0];
		let args = messageArray.slice(1);

		if(!message.content.startsWith(prefix)) return;
		let commandfile = client.commands.get(cmd.slice(prefix.length));
		if(commandfile) commandfile.run(client,message,args);
	});

});

client.login(config.token);