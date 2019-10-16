'use strict';
const sls = require('serverless-http');

const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

const playerService = require('./lib/playerService');

app.get('/players', function (req, res) {
    playerService.listPlayers()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

app.get('/players/:playerId', function (req, res) {
    playerService.getPlayer(req.params.playerId)
        .then(data => data ? res.json(data) : res.status(404).send('Player not Found'))
        .catch(err => res.status(500).send(err));
});

app.listen(port, err => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on port ', port);
});


module.exports.run = sls(app);
