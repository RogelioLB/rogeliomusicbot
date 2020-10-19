const {prefix} = require("../config");

module.exports =(client, message) => {
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const [cmd, ...args] = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const command = client.modules.find(modu=>modu.help.name===cmd ||modu.help.aliases.includes(cmd));
    if (command) command.execute(client,message,args);
}