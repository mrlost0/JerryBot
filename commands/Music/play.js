const ytdl = require("ytdl-core"); // For youtube functions
const YouTube = require("simple-youtube-api"); // For youtube playlist

const youtube = new YouTube("Youtube API key");

// Play command
module.exports = {
  name: "play",
  description: "Play a song in your channel!",
  async execute(message) {
    try {
      // Get youtube link after !play command
      const args = message.content.split(" ");

      // Create song queue
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);

      // Get voice channel and check if user is currently in voice channel
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "You need to be in a voice channel to play music dumbass."
        );
      // Check to see if JerryBot has permissions to join and play music
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "I need the permissions to join and speak in your voice channel!"
        );
      }

      // If queue hasnt been created yet
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };

        queue.set(message.guild.id, queueContruct);

        if(args[1].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
        {
          const playlist = await youtube.getPlaylist(args[1]);
          const videos = await playlist.getVideos();
          for (const video of Object.values(videos))
          {
            const video2 = await youtube.getVideoByID(video.id);
            
            const song = {
            title: video2.title,
            url: `https://www.youtube.com/watch?v=${video2.id}`
            };

            queueContruct.songs.push(song);
          }

          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            this.play(message, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        }

        else
        {
          const songInfo = await ytdl.getInfo(args[1])
          const song = 
          {
            title: songInfo.title,
            url: songInfo.video_url
          };

          // Push the song onto the queue
          queueContruct.songs.push(song);

          // If no song is currently playing, then play the song given in the command
          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            this.play(message, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        }
      }

      // Add song to queue if a song is currently playing
      else 
      {
        if(args[1].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
        {
          const playlist = await youtube.getPlaylist(args[1]);
          const videos = await playlist.getVideos();
          for (const video of Object.values(videos))
          {
            const video2 = await youtube.getVideoByID(video.id);
            
            const song = {
            title: video2.title,
            url: `https://www.youtube.com/watch?v=${video2.id}`
            };

            queueContruct.songs.push(song);
          }
          return message.channel.send(`**${playlist.title}** has been added to the queue.`);
        }

        else
        {
          serverQueue.songs.push(song);
          return message.channel.send(
            `**${song.title}** has been added to the queue!`
          );
        }
      }
      
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

// Play song function
  play(message, song) {
    // Get queue
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    // Invalid song link
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    // Play song
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
};