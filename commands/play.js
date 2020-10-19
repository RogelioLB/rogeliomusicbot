const Rest = require("../structures/rest");
const Queue =require("../structures/queue");

module.exports = {
    execute: async(client, message, args) => {
        if (!args.length) return message.reply(`You must provide a song argument`);
        const { channel } = message.member.voice;
        if (!channel || !channel.joinable) return message.reply("I cannot join.");

        const player = client.music.players.get(message.guild.id) || (await client.music.create(message.guild.id));

        

        const { tracks, loadType ,playlistInfo} = await Rest.search(args.join(" ").includes("https") ? encodeURI(args.join(" ")) : `ytsearch:${encodeURIComponent(args.join(" "))}`)
        if (!tracks.length) return message.reply("Nothing was found for you search");
        if(!player.queue) player.queue=new Queue(player);
        switch(loadType){
            case "TRACK_LOADED":
                case "SEARCH_RESULT":

                    player.queue.add(tracks[0].track,message.author.id);
        
                    if(!player.connected) await player.connect(channel.id);
                    if(!player.playing && !player.paused) await player.queue.start(message);
        
                   return message.channel.send(`:musical_note:Queded Up: **${tracks[0].info.title}** :musical_note:`);
            case "PLAYLIST_LOADED":
                tracks.map(t=>player.queue.add(t.track));
                if(!player.connected) await player.connect(channel.id);
                    if(!player.playing && !player.paused) await player.queue.start(message);
                    return message.channel.send(`:musical_note: Queded Up: **${playlistInfo.name}** | [Playlist - \`${tracks.length}\`] :musical_note:`);
        }
        

        //if(loadType==="PLAYLIST")
    },

    help: {
        name: "play",
        aliases: ["p"],
        description:"Play music",
        example:"?play [track]"
    }
}