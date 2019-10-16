'use strict';

const playerService = require('./lib/playerService');


module.exports.listPlayers = (event, context, callback) => {
  playerService.listPlayers()
    .then(data => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data)
      };

      callback(null, response);
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({stack: err})
      };

      callback(null, response);
    });
};


module.exports.getPlayer = (event, context, callback) => {
  playerService.getPlayer(event.pathParameters.playerId)
    .then(data => {
        let response;

        if (data)
          response = {
            statusCode: 200,
            body: JSON.stringify(data)
          };
        else
            response = {
              statusCode: 404,
              body: JSON.stringify({message: 'Player not Found'})
            };

      callback(null, response);
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({stack: err})
      };

      callback(null, response)
    });
};