const { readdirSync } = require("fs");
const { join } = require("path");

const dir = join(__dirname, "..", "commands");

module.exports = (client) => {
    for (const file of readdirSync(dir).filter(file => file.endsWith(".js"))) {
        const props = require(`${dir}/${file}`);

        client.modules.set(props.help.name, props);
        console.log(props);

    }
    console.log(`${client.modules.size} commands have been loaded`);
}