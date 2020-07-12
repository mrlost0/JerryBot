const fs = require('fs') // For file parsing
const Discord = require('discord.js'); // For Discord functions
const Client = require('./classes/Client'); // To save commands

// This is what must be put immediately before commands
prefix = '!';

// Servers variable so all servers aint playing same hangman game screwing it up
var servers = {};

// Declare command variale
const client = new Client();
client.commands = new Discord.Collection();

// Get all commands
const music_command_files = fs.readdirSync('./commands/Music').filter(file => file.endsWith('.js'));
const misc_command_files = fs.readdirSync('./commands/Misc').filter(file => file.endsWith('.js'));
const nsfw_command_files = fs.readdirSync('./commands/NSFW').filter(file => file.endsWith('.js'));
const fun_command_files = fs.readdirSync('./commands/Fun').filter(file => file.endsWith('.js'));

// Set all music commands
for (const file of music_command_files)
{
    const command = require(`./commands/Music/${file}`);
    client.commands.set(command.name, command);
}

// Set all miscellaneous commands
for (const file of misc_command_files)
{
    const command = require(`./commands/Misc/${file}`);
    client.commands.set(command.name, command);
}

// Set all NSFW commands
for (const file of nsfw_command_files)
{
    const command = require(`./commands/NSFW/${file}`);
    client.commands.set(command.name, command);
}

// Set all fun commands
for (const file of fun_command_files)
{
    const command = require(`./commands/Fun/${file}`);
    client.commands.set(command.name, command);
}

// Set help command
const command = require(`./commands/help`);
client.commands.set(command.name, command);

// Announce that the bot is online
client.once('ready', () => {
    console.log("JerryBot is online!");
    client.user.setActivity("Your every move", {type: "WATCHING"});
});

// Listen to discord messages
client.on('message', async message => {

    var msg = message.content.toLowerCase();

    // Twitch emote reactions
    if(msg.includes("monka"))
    {
        if(msg.includes("monkaw"))
            message.channel.send("", {files: ['./images/Monkaw.jpg']});

        else
            message.channel.send("", {files: ['./images/monkashake.jpg']});
    }

    else if(msg.includes("corona"))
        message.channel.send("", {files: ['./images/coronas.png']});

    else if(msg.includes("gachi"))
        message.channel.send("", {files: ['./images/gachi.gif']});

    else if(msg.includes("gasm") && !msg.includes("gachi"))
        message.channel.send("", {files: ['./images/gasm.png']});
        
    else if(msg.includes("kek"))
        message.channel.send("", {files: ['./images/kek.gif']});

    else if(msg.includes("lul"))
    {
        if(msg.includes("omega"))
            message.channel.send("", {files: ['./images/omegalul.jpg']});

        else
            message.channel.send("", {files: ['./images/lul.png']});
    }

    else if(msg.includes("pepega"))
        message.channel.send("", {files: ['./images/pepega.png']});

    else if(msg.includes("pepehands"))
        message.channel.send("", {files: ['./images/pepehands.gif']});

    else if(msg.includes("jebait"))
        message.channel.send("", {files: ['./images/jebait.png']});

    else if(msg.includes("pog"))
    {
        if(msg.includes("pogu"))
            message.channel.send("", {files: ['./images/pogu.jpg']});

        else if(msg.includes("champ"))
            message.channel.send("", {files: ['./images/pogchamp.gif']});

        else if(msg.includes("poggers"))
            message.channel.send("", {files: ['./images/poggers.png']});

        else
            message.channel.send("", {files: ['./images/pog.gif']});
    }

    else if(msg.includes("kapp"))
    {
        if(msg.includes("pride"))
            message.channel.send("", {files: ['./images/kappapride.png']});

        else if(msg.includes("ross"))
            message.channel.send("", {files: ['./images/kappaross.png']});

        else
            message.channel.send("", {files: ['./images/kapp.png']});
    }

    else if(msg.includes("4") && msg.includes("head"))
        message.channel.send("", {files: ['./images/4head.jpg']});
    
    else if(msg.includes("5") && msg.includes("head"))
        message.channel.send("", {files: ['./images/5head.jpg']});

    else if(msg.includes("feels") && msg.includes("good"))
        message.channel.send("", {files: ['./images/feelsgood.png']});

    else if(msg.includes("feels") && msg.includes("bad"))
        message.channel.send("", {files: ['./images/feelsbadman.png']});
    
    else if(msg.includes("ez") && msg.includes("clap"))
        message.channel.send("", {files: ['./images/ez.gif']});

    else if(msg.includes("weird") && msg.includes("champ"))
        message.channel.send("", {files: ['./images/weirdchamp.gif']});

    else if(msg.includes("angel") && msg.includes("thump"))
        message.channel.send("", {files: ['./images/angelthump.gif']});

    else if(msg.includes("bible") && msg.includes("thump"))
        message.channel.send("", {files: ['./images/biblethump.png']});

    else if(msg.includes("wut"))
        message.channel.send("", {files: ['./images/wutface.jpg']});

    else if(msg.includes("kkona"))
        message.channel.send("", {files: ['./images/kkona.jpg']});

    else if(msg.includes("ayaya"))
        message.channel.send("", {files: ['./images/ayaya.gif']});

    else if(msg.includes("fail") && msg.includes("fish"))
        message.channel.send("", {files: ['./images/failfish.jpg']});

    else if(msg.includes("baby") && msg.includes("rage"))
        message.channel.send("", {files: ['./images/babyrage.png']});

    else if(msg.includes("dans") && msg.includes("game"))
        message.channel.send("", {files: ['./images/dansgame.png']});

    else if(msg.includes("cmon") && msg.includes("bruh"))
        message.channel.send("", {files: ['./images/cmonbruh.jpg']});

    else if((msg.includes("tri") && msg.includes("hard")) || (msg.includes("try") && msg.includes("hard")))
        message.channel.send("", {files: ['./images/trihard.gif']});

    else
    {}
    
    // Tell Alex to fuck off if he says anything about JerryBot
    if(message.author.username == "ThatSaltySnipezGuy")
    {
        if((msg.includes("jerry") && msg.includes("bot")) || msg.includes("@jerrybot"))
        {
            message.channel.send("Fuck you Alex :)");
        }
    }

    // Kindly tell Alex to fuck off if requested
    if((msg.includes("alex") && msg.includes("fuck") && msg.includes("off")) && !(message.author.bot))
    {
        message.channel.send("Fuck off Alex you doo doo head");
    }

    // Check to see if discord message sent is a command
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    // Not a command so do nothing
	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
       
    // Execute hangman command
    if(commandName == "hangman")
    {
        try
        {
            command.execute(message, servers);
        }
        catch(error)
        {
            console.error(error);
            message.reply('That command doesn\'t exist dumbass.');
        }
    }

    // Execute all other commands
    else
    {
        try 
        {
            command.execute(message);
        } 
        catch (error) 
        {
            console.error(error);
            message.reply('That command doesn\'t exist dumbass.');
        }
    }
});

client.login(process.env.token);