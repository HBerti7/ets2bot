const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var weather = require('weather-js');
const randomPuppy = require('random-puppy');

let botname = "KaktuszMester"


bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "🌵Prefix: -",
        "🌵Készítő: HBerti#7964",
        "🌵A kaktusz nagyon menő! :D",
        "🌵Országúti Királyok Kft."
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 7500)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;


    if(cmd === `${prefix}idojaras`){
        if(args[0]){
            weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
                if (err) message.reply(err);

                if(result.length === 0){
                    message.reply("Kérlek adj meg egy létező település nevet!")
                    return;
                }

                let current = result[0].current;
                let location = result[0].location;

                let WeatherEmbed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Időjárás itt: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("GREEN")
                .addField("Időzóna:", `UTC${location.timezone}`, true)
                .addField("Fokozat típusa:", `${location.degreetype}`, true)
                .addField("Hőfok", `${current.temperature}°C`, true)
                .addField("Hőérzet:", `${current.feelslike}°C`, true)
                .addField("Szél", `${current.winddisplay}`, true)
                .addField("Páratartalom:", `${current.humidity}%`, true)

                message.channel.send(WeatherEmbed);
            })

        } else {
            message.reply("Kérlek adj meg egy település nevet!")
        }
    }

    if(cmd === `${prefix}vicc`){
        const subreddits = ["dankmeme", "meme", "me_irl"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]
    
        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setImage(IMG)
        .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
        .setURL(`https://www.reddit.com/r/${random}`)
    
        message.channel.send(MemeEmbed)
    }

    if(cmd === `${prefix}kaktusz-help`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.username)
        .setTitle("Prefix:")
        .addField("Bot parancsok:", " -idojaras -> Időjárás egy adott településben.\n -vicc -> meme")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`\`${prefix}\``)
        .setFooter(`${botname} | ${message.createdAt}`)
    
        message.channel.send(TesztEmbed)
    }




})


bot.login(process.env.BOT_TOKEN);
