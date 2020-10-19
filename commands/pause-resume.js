const Rest=require("../structures/rest");
module.exports ={
    execute: async(client,message)=>{
        const player=client.music.players.get(message.guild.id);
        if(!player) return message.reply("No hay ningun reproductor activo");
        if(player.channel!==message.member.voice.channel.id) return message.reply("Tienes que estar conectado al canal de voz del reproductor para saltar una cancion.");
        if(player.playing){
            player.pause(true);
        return message.channel.send("Pausado exitosamente.");
        }
        if(player.paused){
            player.pause(false);
            const {title}=await Rest.decode(player.track);
            message.channel.send(`:musical_note: Resumiendo: **${title}** :musical_note:`);
        }
    },
    help:{
        name:"pause-resume",
        aliases:["ps"]
    }
}