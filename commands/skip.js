module.exports={
    execute: async(client, message)=>{
        const player=client.music.players.get(message.guild.id);
        if(!player) return message.reply("No hay ningun reproductor activo");
        if(player.channel!==message.member.voice.channel.id) return message.reply("Tienes que estar conectado al canal de voz del reproductor para saltar una cancion.");
        player.stop()
        message.channel.send("Se salto la cancion exitosamente");
    },
    help:{
        name:"skip",
        aliases:["n"]
    }
}