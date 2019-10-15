'use strict';
const sls = require('serverless-http');

var https = require('https');
var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

var getPlayers = (callback) => {
    https.get(process.env.dataAPI, result => {
        if (result.statusCode !== 200) {
            const error = new Error('Request to API failed with code: ', result.statusCode);
            console.error(error);
            result.resume();
            return callback(error);
        }
        let rawData = '';

        result.on('data', (chunk) => { rawData += chunk; });
        result.on('end', () => {
            try {
                const data = JSON.parse(rawData);
                callback(null, data);
            } catch (err) {
                console.error(err.message);
                callback(err);
            }
        });
        result.on('error', err => {
            console.error(err.message)
            callback(err);
        });
    });
}

app.get('/players', function (req, res) {
    getPlayers((err, data) => {
        if (err)
            return res.status(500);

        return res.json(data);
    });
});

app.get('/players/:playerId', function (req, res) {
    getPlayers((err, data) => {
        if (err)
            return res.status(500);

        for (const player of data.players)
            if (player.id == req.params.playerId)
                return res.json(player);

        return res.status(404).send('Player not Found');
    });
});

app.listen(port, err => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on port ', port);
});


module.exports.run = sls(app);
