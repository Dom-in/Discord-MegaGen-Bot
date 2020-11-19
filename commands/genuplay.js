const Discord = require("discord.js");
const fs = require("fs");
var filename = "accounts/uplay.txt";
var querystring = require('querystring');
var request = require('request');
var config = require("../genchids.json");

module.exports.run = async (bot, message, args) => {

	//Get 1st line
	function get_line(filename, line_no, callback) {
		var data = fs.readFileSync(filename, 'utf8');
		var lines = data.split("\n");

		if(+line_no > lines.length){
			throw new Error('File end reached without finding line');
			message.channel.send("an oopsie woopsie happened! no accounts left... hm, this was logged")
		}

		callback(null, lines[+line_no]);
	}

	//remove 1st line
	fs.readFile(filename, function(err, data) {
		if (!err) {
			data = data.toString();
			var position = data.toString().indexOf('\n');
			if (position != -1) {
				data = data.substr(position + 1);

				fs.writeFile(filename, data, function(err) {
					if (err) {
						console.log (err);
						message.channel.send("an oopsie woopsie happened! info:" + err);
					}
				});
			}
		} else {
			console.log(err);
			message.channel.send("an oopsie woopsie happened! info:" + err);
		}
	});

	//send 1st line
	if (message.channel.id === config.uplay) {
		get_line(filename, 0, function(err, line){ //0 represents first line of file

			var account = line
			var data = fs.readFileSync(filename, 'utf8');
			var lines = data.split("\n");
			data = data.toString();
			var position = data.toString().indexOf('\n');
			if (position != -1) { console.log("good") } else { return message.channel.send("**There are no Uplay in stock.**") };

			if (err) throw err;

				var form = {
					link: `https://www.iloot.it/textbin?link=https://discord.gg/dz7abaB&logo_url=https://cdn.discordapp.com/icons/609648836780097536/58a6c19a9c0e60a226a36e934441a53b.webp&logo_alt=megagen&text=${account}`
				};

				var formData = querystring.stringify(form);
				var contentLength = formData.length;

			request({
				headers: {
				  'Content-Length': contentLength,
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Authorization': 'a'
				},
				uri: 'https://iloot.it/API?Authorization=a',
				body: formData,
				method: 'POST'
			  }, function (err, res, body) {
                               let obj = JSON.parse(body);
			
				let embed = new Discord.RichEmbed()
				.setAuthor(`Free account`)
				.setColor("#23272a")
				.setThumbnail(message.author.avatarURL)
				.addField("https://iloot.it/?m=" + obj.short, "**Your Uplay account.**")
				.setFooter("The bot's official server is MegaGen (MoreGens) (https://discord.gg/wqwkMJg) | Code by Dominik#7464");
				message.author.send(embed);
				let checkPMsMsg = ":ballot_box_with_check: Account sent, **" + message.author.username + "**!";
				message.channel.send(checkPMsMsg);
console.log(message.guild.id)
			  })
		});
	} else {
		message.channel.send(`Sorry, this is not <#${config.uplay}>!`)
	}
}