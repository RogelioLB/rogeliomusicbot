const Rest=require("./rest");

module.exports=class Queue{
    constructor(player){
        this.player=player;
        this.tracks=[];
        this.loop="nothing";
        this.current=undefined;
        this.message=undefined;

        player.on("end",async (evt)=>{
            if(evt && ["REPLACED"].includes(evt.reason)) return;

            if(this.loop==="song") this.tracks.unshift(this.current.track);
            else if(this.loop==="queue") this.tracks.push(this.current.track)

            this.next();

            if(!this.message.guild || !this.message.guild.me.voice.channel)return this.end("?");

            if(this.message.guild.me.voice.channel.members.size ===1) return this.end("emptyVC");

            if(!this.current) return this.end("empty");
            await player.play(this.current.song);
        }).on("start",async()=>{
            const {title}=await Rest.decode(this.current.song);

            this.message.channel.send(`:musical_note:Playing: **${title}** :musical_note:| Requester: <@${this.current.id}> `);
        })
    }

    add(song,id){
        return this.tracks.push({song,id});
    }

    next(){
        return(this.current=this.tracks.shift());
    }

    async destroy(){
        return this.player.manager.destroy(this.message.guild.id);
    }
    async end(reason){
        switch(reason){
            case "?":
                default:
                    return await this.destroy();

            case "empty":
                await this.destroy();

                return this.message.channel.send(`The queue has ran out of songs to play, I'll be leaving now`);
            case "emptyVC":
                await this.destroy();

                return this.message.channel.send(`Nobody is in the voice channel anymore, so I'll be leaving now`);
        }
    }

    async start(message){
        this.message=message;
        if(!this.current) this.next();
        await this.player.play(this.current.song);
    }
};