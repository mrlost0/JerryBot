const Images = require("dabi-images");
const Client = new Images.Client();

// Boobs command
module.exports = {
	name: 'boobs',
	description: 'Post an image of boobs (Must be in NSFW channel).',
    execute(message) 
    {
        // Check to see if command was sent in NSFW channel
        if(!message.channel.nsfw)
            message.channel.send("Must be in a NSFW channel.");
        else
        {
            // Fetch boobs image
            Client.nsfw.real.boobs().then(json => {
                // Post image in channel
                return message.channel.send(json.url);
                }).catch(error => {
                    console.log(error);
                });
        }
    },
};