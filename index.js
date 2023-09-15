const Discord = require("discord.js")
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
var weather = require('weather-js');
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
const disbut = require('discord-buttons');
const bot = new Discord.Client({disableEveryone: false})
const fs = require("fs");
const ms = require("ms");
const { error } = require("console");
const { attachCookies } = require("superagent");
const ytdl = require('ytdl-core');


var queue = new Map();




//////////////////////////////////////////////////////////
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});

//////////////////////////////////////////////////////////////////////////////////////


var http = require('http');
http.createServer(function(req, res) {
  res.write('- Webserver started -');
  res.end();
}).listen(8080);


//////////////////////////////////////////////////////////////////////////////////////
let botname = "LIGHTGODS BOT"

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Made by: whois",
        "Prefix: g!"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

 if(message.content.startsWith('g!btc')){
     const CoinGecko = require('coingecko-api');
     const CoinGeckobot = new CoinGecko();     let data = await CoinGeckobot.simple.price({
         ids: ['bitcoin'],
         vs_currencies: ['huf', 'usd'],
     });                                                                                     
     let btcEmbed = new Discord.MessageEmbed()
     .setDescription(`Bitcoin Whois`)
     .setColor("#ff1800")
     .setFooter(bot.user.username)
     .addField("Bitcoin jelenlegi árfolyama: " + data.data.bitcoin.huf + " HUF ")
     .addField("Bitcoin jelenlegi árfolyama: " + data.data.bitcoin.usd + " USD ")
     .setThumbnail("https://cdn.discordapp.com/attachments/720055841390198815/884817291114610748/bitcoin-icon-6219383_1280.png")

     message.channel.send(btcEmbed);
        
}

    if(message.content.startsWith('prefix')){
                                                                                    
        let btc2Embed = new Discord.MessageEmbed()
        .setDescription(`Prefixem: g!`)
        .setColor("#ff1800")
        .setFooter(bot.user.username)

        message.channel.send(btc2Embed);
        
    }

}
)




bot.login(tokenfile.token);