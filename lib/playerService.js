
const https = require('https');

function listPlayers() {
    return new Promise(function (resolve, reject) {
        https.get(process.env.dataAPI, result => {
            if (result.statusCode !== 200) {
                const error = new Error('Request to API failed with code: ', result.statusCode);
                console.error(error);
                result.resume();
                return reject(error);
            }
            let rawData = '';

            result.on('data', (chunk) => { rawData += chunk; });
            result.on('end', () => {
                try {
                    const data = JSON.parse(rawData);
                    resolve(data);
                } catch (err) {
                    console.error(err.message);
                    reject(err);
                }
            });
            result.on('error', err => {
                console.error(err.message)
                reject(err);
            });
        });
    });
}

function getPlayer(playerId) {
    return listPlayers().then((data) => {
        for (const player of data.players)
            if (player.id == playerId)
                return player;

        return null;
    });
}

module.exports = {
    listPlayers,
    getPlayer
};