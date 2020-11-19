const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let accType = args[0]
    if(!accType) return message.channel.send(`Which account stock are you interested in?`)

    var filename = "accounts/" + accType + ".txt";
    fs.readFile(filename, "utf8", function(err, data){
        if(err) throw err;
    
        const stock = data.split("\n").length - 1;
        message.channel.send("**There are " + stock + " " + accType + " accounts in stock!**");
    });

}