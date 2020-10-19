const { Client, Collection } = require("discord.js");
const { token, nodes } = require("./config");
const { Manager } = require("lavaclient");

const client = new Client();
client.modules = new Collection();
client.music = new Manager(nodes, {
    shards: client.shard ? client.shard.count : 1,
    send(id, packet) {
        const guild = client.guilds.cache.get(id);
        if (guild) return guild.shard.send(packet);
    }
});

["command", "event"].map(h => require(`./structures/${h}`)(client));

client.ws.on("VOICE_SERVER_UPDATE", (pk) => console.log(client.music.serverUpdate(pk)));
client.ws.on("VOICE_STATE_UPDATE", (pk) => console.log(client.music.stateUpdate(pk)));
client.login(token);
client.on("ready",()=>{
    console.log(`${client.users.size}`);
    client.user.setActivity("?play");
})
const {prefix} = require("./config");

client.on("message", message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const [cmd, ...args] = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const command = client.modules.find(modu=>modu.help.name===cmd ||modu.help.aliases.includes(cmd));
    if (command) command.execute(client,message,args);
})