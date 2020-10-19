const { readdirSync } = require("fs");
const { join } = require("path");

const dir = join(__dirname, "..", "events");


module.exports = (client) => {
    const events = readdirSync(dir).filter(file => file.endsWith(".js"));

    for (const file of events) {
        const event = require(`${dir}/${file}`);
        
        client.on(file.split(".").shift(), event.bind(null, client));
    }
    console.log(`${events.length} events loaded`);
}