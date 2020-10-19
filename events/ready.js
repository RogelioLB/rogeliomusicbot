module.exports = async(client) => {
    await client.music.init(client.user.id);

    console.log(`${client.user.tag} is ready.`)
}