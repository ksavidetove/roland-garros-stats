[![Codeship Status for ksavidetove/roland-garros-stats](https://app.codeship.com/projects/f8f73780-d209-0137-9455-36169c9ec608/status?branch=master)](https://app.codeship.com/projects/369763)

# roland-garros-stats
A simple nodeJS web server

This server is build and deployed with [the serverless framework](https://serverless.com/) to AWS Lambda and served by AWS Gateway

First, make sure that your node version is 10.16.0 or higher with
``` node -v ```

To this project, install serveless globally 
```npm install -g serverless```

Install all dependencies
``` npm install ```


You can then :

* run the server locally on port 3000 with the command 
```serverless offline```

* run the tests, which launch locally the server in the first place and run the mocha tests
```npm run test```

An online version tested and deployed automatically by [codeship](https://app.codeship.com/projects/369763) can be found at [https://ab2hferf95.execute-api.us-east-1.amazonaws.com/dev](https://ab2hferf95.execute-api.us-east-1.amazonaws.com/dev)

# Available endpoints:

## List all players

Get all players available through dataAPI

**URL** : `/players`

**Method** : `GET`

### Success Response

**Code** : `200 OK`

**Content examples**

```json
{
	players: [
    {
      "id": 52,
      "firstname": "Novak",
      "lastname": "Djokovic",
      "shortname": "N.DJO",
      "sex": "M",
      "country": {
        "picture": "https://i.eurosport.com/_iss_/geo/country/flag/medium/6944.png",
        "code": "SRB"
      },
      "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/565920.jpg",
      "data": {
        "rank": 2,
        "points": 2542,
        "weight": 80000,
        "height": 188,
        "age": 31,
        "last": [1, 1, 1, 1, 1]
      }
    },
    {
      "id": 95,
      "firstname": "Venus",
      "lastname": "Williams",
      "shortname": "V.WIL",
      "sex": "F",
      "country": {
        "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/136449.jpg",
        "code": "USA"
      },
      "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/136450.jpg",
      "data": {
        "rank": 52,
        "points": 1105,
        "weight": 74000,
        "height": 185,
        "age": 38,
        "last": [0, 1, 0, 0, 1]
      }
    }]
}
```

# Get a player

Get a player specified by its ID

**URL** : `/players/:id`

**Method** : `GET`

### Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": 52,
  "firstname": "Novak",
  "lastname": "Djokovic",
  "shortname": "N.DJO",
  "sex": "M",
  "country": {
	"picture": "https://i.eurosport.com/_iss_/geo/country/flag/medium/6944.png",
	"code": "SRB"
  },
  "picture": "https://i.eurosport.com/_iss_/person/pp_clubteam/large/565920.jpg",
  "data": {
	"rank": 2,
	"points": 2542,
	"weight": 80000,
	"height": 188,
	"age": 31,
	"last": [1, 1, 1, 1, 1]
    }]
}
```
