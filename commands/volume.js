module.exports ={
    execute: async (client,message,args)=>{
        if(!args.length) return message.reply("Tienes que dar un numero para cambiar el volumen");
        
        const player=client.music.players.get(message.guild.id);
        if(!player)return message.reply("No existe un reproductor");
        if(player.channel!==message.member.voice.channel.id) return message.reply("Tienes que estar conectado al canal de voz");
        var volume=Number(args);
        if(volume>=1 && volume<=100){
        player.setVolume(volume);
        message.reply("Cambiado exitosamente");
        }else{
            return message.reply("Usa un numero entre el 1 y el 100");
        }
    },
    help:{
        name:"volume",
        aliases:["v"]
    }
}