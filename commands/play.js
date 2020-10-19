const Rest = require("../structures/rest");
const Queue =require("../structures/queue");

module.exports = {
    execute: async(client, message, args) => {
        if (!args.length) return message.reply(`Debes proveer una cancion como argumento.`);
        const { channel } = message.member.voice;
        if (!channel || !channel.joinable) return message.reply("No puedo unirme, ¿Estas conectado al canal de voz?");

        const player = client.music.players.get(message.guild.id) || (await client.music.create(message.guild.id));

        

        const { tracks, loadType ,playlistInfo} = await Rest.search(args.join(" ").includes("https") ? encodeURI(args.join(" ")) : `ytsearch:${encodeURIComponent(args.join(" "))}`)
        if (!tracks.length) return message.reply("No se encontro nada con esa busqueda, vuelve a intentarlo.");
        if(!player.queue) player.queue=new Queue(player);
        switch(loadType){
            case "TRACK_LOADED":
                case "SEARCH_RESULT":

                    player.queue.add(tracks[0].track,message.author.id);
        
                    if(!player.connected) await player.connect(channel.id);
                    if(!player.playing && !player.paused) await player.queue.start(message);
        
                   return message.channel.send(`:musical_note:Añadido a la lista: **${tracks[0].info.title}** :musical_note:`);
            case "PLAYLIST_LOADED":
                tracks.map(t=>player.queue.add(t.track));
                if(!player.connected) await player.connect(channel.id);
                    if(!player.playing && !player.paused) await player.queue.start(message);
                    return message.channel.send(`:musical_note: Añadido a la lista: **${playlistInfo.name}** | [Playlist - \`${tracks.length}\`] :musical_note:`);
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