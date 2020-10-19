module.exports={
    execute: async(client,message)=>{
        const player=client.music.players.get(message.guild.id);
        if(!player) return message.reply("No hay reproductor activo");
        if(player.channel !==message.member.voice.channel.id) return message.reply("Necesitas estar conectado al canal de voz para pararlo");
        player.destroy();
        message.channel.send("Reproductor parado exitosamente");
    },
    help:{
        name:"stop",
        aliases:["s"]
    }
}