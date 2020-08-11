const Images = require("dabi-images");
const Client = new Images.Client();

// Buttsgif command
module.exports = {
	name: 'buttsgif',
	description: 'Post a butt gif (Must be in NSFW channel).',
    execute(message) 
    {
        // Check to see if command was sent in NSFW channel
        if(!message.channel.nsfw)
            message.channel.send("Must be in a NSFW channel.");
        else
        {
            // Get butt image
            Client.nsfw.real.buttsgifs().then(json => {
                // Send image
                return message.channel.send(json.url);
                }).catch(error => {
                    message.channel.send("Unable to fetch image. Please try again.");
                    console.log(error);
                });
        }
    },
};