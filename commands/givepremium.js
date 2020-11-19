const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

	if (message.author.id === `609647147293343745`) {
		let role = message.guild.roles.get("609774711894835210");
		let member = message.mentions.members.first();

		member.addRole(role).catch(console.error).then(message.channel.send(`Added Premium to user with ID \`${member.id}\``))
	} else {
		message.channel.send(`\`Premium\` ain't free, man!`)
	}

}