const { nodes } = require("../config")
const fetch = require("node-fetch"); 

module.exports = class Rest {
    static async search(track) {
        const { host, port, password } = nodes[0];
        return await (await fetch(`http://${host}:${port}/loadtracks?identifier=${track}`, {
            headers: {
                authorization: password,
            },
        })).json();
    }

    static async decode(track){
        const { host, port, password } = nodes[0];
        return await (await fetch(`http://${host}:${port}/decodetrack?track=${track}`, {
            headers: {
                authorization: password,
            },
        })).json();
    }
};