const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

	if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("how bout you eat my shorts")

	let accType = args[0]
	if(!accType) return message.channel.send(`What account ya wannna add?`)
	let acc = args[1]
	if(!acc) return message.channel.send(`nothin' to add`)
	var filename = "accounts/" + accType + ".txt";
	fs.appendFile(filename,'\n'+ acc, (err) => {
    	if (err) throw err;
    	message.channel.send("ok")
	});

}