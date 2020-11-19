const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

	let embed = new Discord.RichEmbed()
	.setAuthor(`All Commands`)
	.setColor("#23272a")
	.setDescription(`-gencrunchyroll\n-genhulu\n-genmetalsdungeon\n-genminecraft\n-gennordvpn\n-genorigin\n-genspotify\n-genfortnite\n-genuplay\n-genwish\n-givepremium\n-givepremiumplus\n-help\n-stock`)
	message.channel.send(embed)

}
