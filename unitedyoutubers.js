const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

/*var express = require('express');
var app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//console.log ping recieved from Uptimebot (used to keep project online even after 5 minutes of innactivity)
const http = require('http');
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
*/
client.on('ready', () => {
    console.log(`Bot Online!`);
    client.user.setActivity(`United servers ${config.prefix}help`, { type: "WATCHING" });
});

function uptime() {
    var date = new Date(client.uptime);
    var strDate = '';
    strDate += date.getUTCDate() - 1 + " days, ";
    strDate += date.getUTCHours() + " hours, ";
    strDate += date.getUTCMinutes() + " minutes";
    return strDate;
}

client.on('message', message => {
    var args = message.content.split(/[ ]/);
    var command = args[0].slice(config.prefix.length).toLowerCase();
  
    if(!message.content.startsWith(config.prefix)) return;

if(command === "help") {
  message.reply(`Check your DMs! I have sent you a message containing all my commands!`);
  message.author.send(`
  **United Central Bot Help**
  Thanks For Being part of United Cenral community. Here are the commands for our bot!
  
  **Misc**
  
  ${config.prefix}help - shows this command
  ${config.prefix}credits - shows  everyone who helped make the bot and links to some of the github stuff
  ${config.prefix}suggest (suggestion) - Send a suggestion for our United Central discord server
  ${config.prefix}bot-suggest (suggestion) - Suggest a feature for our bot
  ${config.prefix}patreon - gives u a link to our patreon
  
  
  **Music**

  ${config.prefix}play <song> - Play a song
  ${config.prefix}pause - pause the song thats playing
  ${config.prefix}resume - resume the bot when its paused
  ${config.prefix}skip - skip the current song
  ${config.prefix}queue - whats coming up nex
  ${config.prefix}search <song> - searches for the top 10 results
  ${config.prefix}np - what song is currently playing



  **Have Any Suggestions? Use the suggest command and leave a suggestion! you will be first to know the results!**
  `)
}

if(command === "staff-help") {
   if (!message.member.hasPermission('MANAGE_NICKNAMES') && message.author.id !== config.owner) return message.channel.send('Sorry! Only Staff members can use this command')
message.reply(`Sent u a dm with staff help`)
message.author.send(`**Staff Help**
  
  ${config.prefix}kick <user> <reason> 
  ${config.prefix}ban <user> <reason> 
  ${config.prefix}unban <user ID>
  ${config.prefix}purge <amount> (max 99)
  `)
  
}
  
  if(command === "test") {
    // Create a new role with data
message.guild.createRole({
  name: 'Super Cool People',
  color: 'BLUE',
})
  .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
  .catch(console.error)
  }

if(command === "ping") {
  message.channel.send(`pong - main`)
}

if(command === "patreon") {
  message.reply(`you can donate for the development of United Bot and other parts of the United YouTubers brand at at: https://patreon.com/unitedyoutubers`)
}

	if(command === "suggest") {
        const msg = message.content.split(" ").slice(1).join(" ");
        var chan = client.channels.get('469837065434169354')
        const suggestEmbed = new Discord.RichEmbed()
        .setTitle("Server Suggestion")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .setColor("44bb44")
        .addField("Suggestion: ", msg)
        .addField("Author: ", message.author)
        .setFooter(`Please react depending on how you feel about this feedback!`)
        chan.send(suggestEmbed)
.then(embedMsg => embedMsg.react('👍').then(() => embedMsg.react('👎')))
        .catch(embedMsg => console.error("Failed to add reaction"));
    message.channel.send(`Suggestion sent in #suggestions`)
    }
  

  
      if(command === "bot-suggest") {
        const msg = message.content.split(" ").slice(1).join(" ");
        if(!msg) return message.channel.send(`You must imput a suggestion!`)
        var chan = client.channels.get('518435446666297344')
        const suggestEmbed = new Discord.RichEmbed()
        .setTitle("Bot Suggestion")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .setColor("44bb44")
        .addField("Suggestion: ", msg)
        .addField("Author: ", message.author)
        .setFooter(`Please react depending on how you feel about this feedback!`)
        chan.send(suggestEmbed)
.then(embedMsg => embedMsg.react('👍').then(() => embedMsg.react('👎')))
        .catch(embedMsg => console.error("Failed to add reaction"));
        message.channel.send(`Suggestion send to <#518435446666297344>`)
    }
		
if(command === "credits") {
  message.channel.send(`
  **CREDITS**
Main Module, Music & Moderation - DamonOnYT#5465
Selfroles - The Doctor#5392
Ideas - Master Adit ᵛᵉʳᶦᶠᶦᵉᵈ#8363
Invite Counter: http://bit.ly/invites-github


**Want to help make the bot more awesome? DM DamonOnYT#5465**`)
}
  





});
client.login("TOKEN");
