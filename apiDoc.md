## Prog black API

This API is for communication with the server for the storage, searching and detailing of games of snooker and the players who played them.


---

## Players



The API documentation concerned with retrieving and storing player data are stored here.

### 1. List players

**Request**

- **Method:** `GET`  
- **URL:** `http://localhost:8090/players`  

**Description**

Returns a list of player IDs and names.  
The request can be filtered by ID to return a particular player's name or left blank to return all players stored.

**Query Parameters**

- `search` (optional, string) – Player name to filter by. If omitted, all players are returned.

**Response fields**

- `200 OK` – JSON array of players (or a single player when filtered by ID), including:
  - `id` (string)
  - `name` (string)

**Examples**

*GET player names and IDs*

Request
`http://localhost:8090/players`

Response
```
{
  "pList": [
    {
      "id": "000001",
      "name": "player 1"
    },
    {
      "id": "000002",
      "name": "player 2"
    },
    {
      "id": "000003",
      "name": "player 3"
    },
    {
      "id": "000004",
      "name": "player 4"
    },
    {
      "id": "000005",
      "name": "alfie"
    },
    {
      "id": "000006",
      "name": "AJ"
    },
    {
      "id": "000007",
      "name": "aj"
    },
    {
      "id": "000008",
      "name": "Ariel"
    },
    {
      "id": "000009",
      "name": "alfieC"
    },
    {
      "id": "000010",
      "name": "ariel"
    },
    {
      "id": "000011",
      "name": "Player1769033224229"
    },
    {
      "id": "000012",
      "name": "Player1769033320809"
    },
    {
      "id": "000013",
      "name": "Player1769033356195"
    },
    {
      "id": "000014",
      "name": "Player1769033513952"
    },
    {
      "id": "000015",
      "name": "Player1769033529928"
    },
    {
      "id": "000016",
      "name": "Player1769091453911"
    },
    {
      "id": "000017",
      "name": "Player1769094260797"
    },
    {
      "id": "000018",
      "name": "Player1769094382948"
    },
    {
      "id": "000019",
      "name": "EXAMPLE_PLAYER"
    },
    {
      "id": "000020",
      "name": "EXAMPLE_PLAYER1"
    },
    {
      "id": "000021",
      "name": "EXAMPLE_PLAYER2"
    }
  ]
}
```
*GET player ID with name 'player 1'*

Request
`http://localhost:8090/players?search=player%201`

Response
```
{
  "pList": [
    {
      "id": "000001",
      "name": "player 1"
    }
  ]
}
```

*GET player ID with invalid name*

Request
`http://localhost:8090/players?search=player%20X`

Response
```
{
  "pList": []
}
```

---

### 2. Get full details of a player

**Request**

- **Method:** `GET`  
- **URL:** `http://localhost:8090/players/{id}`  

**Path Parameters**

- `id` (string, required) – ID of the player whose details are requested.

**Description**

Request to get the full details of a player.  
Requires the variable `id` to be entered to find the player by their ID.

**Response fields**

- `200 OK` – JSON object with:
  - `id` (string)
  - `name` (string)
  - `gamesPlayed` (number)
  - `gamesWon` (number)
  - `lifetimePoints` (number)
  - `matches` (array) – array of matches played (structure depends on implementation)
- `404 Not Found` – if the player is not found.

**Examples**

*GET player with ID 000003*

Request

`http://localhost:8090/players/000003`

Response
```
{
  "id": "000003",
  "name": "player 3",
  "gamesPlayed": 2,
  "gamesWon": 0,
  "lifetimePoints": 70,
  "matches": [
    {
      "id": "000002",
      "name": "player 3 vs player 4",
      "opponent": {
        "id": "000004",
        "name": "player 4"
      },
      "playerScore": 30,
      "opponentScore": 70,
      "winner": {
        "id": "000004",
        "name": "player 4"
      }
    },
    {
      "id": "000003",
      "name": "player 3 vs player 1",
      "opponent": {
        "id": "000001",
        "name": "player 1"
      },
      "playerScore": 40,
      "opponentScore": 80,
      "winner": {
        "id": "000001",
        "name": "player 1"
      }
    }
  ]
}
```

*GET player with invalid ID*

Request
`http://localhost:8090/players/XXXXXX`

Response
```
{
  "error": "Player not found"
}
```

---

### 3. Create a new player

**Request**

- **Method:** `POST`  
- **URL:** `http//:localhost:8090/players`  
- **Body:** `application/json`

**Description**

POST request which adds a new player.  
The body requires a JSON which contains the new username and password.  
The other attributes for a new player are initialised to `0`.  

On success the player's ID and name are returned as JSON.

**Response fields**

- `200 OK` – JSON with:
  - `id` (string)
  - `name` (string)
- `400 Bad Request` – if the body is invalid.

**Examples**

*POST to save player with name 'EXAMPLE_PLAYER'*

Request
`http:localhost:8090/players`
```body:
{
  "name":"EXAMPLE_PLAYER",
  "password":"PASSWORD"
}
```

Response
```
{
  "id": "000023",
  "name": "EXAMPLE_PLAYER4"
}
```

*POST of player which already exists*

Request
`http://localhost:8090/players`
```body:
{
  "name":"EXAMPLE_PLAYER",
  "password":"PASSWORD"
}
```

Response
```
{
  "error": "Player with this name already exists"
}
```

---

## Games

The API documentation concerned with storing and retrieving match data can be found here.

### 4. List games (optionally filter by player)

**Request**

- **Method:** `GET`  
- **URL:** `http://localhost:8090/games`  

**Description**

GET request that returns the ID and names of all games.  
It may be filtered by the addition of a player ID to search by so that it only includes games in which that player played.

**Query Parameters**

- `player` (optional, string) – Player ID to filter games by.

  
**Response fields**

- `200 OK` – JSON array of games, each including at least:
  - `id` (string)
  - `name` (string)

**Examples**

*GET all game IDs and names*

Request
`http://localhost:8090/games`

Response
```
{
  "mList": [
    {
      "id": "000001",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000002",
      "name": "player 3 vs player 4"
    },
    {
      "id": "000003",
      "name": "player 1 vs player 3"
    },
    {
      "id": "000004",
      "name": "player 2 vs player 4"
    },
    {
      "id": "000005",
      "name": "alfie vs AJ"
    },
    {
      "id": "000006",
      "name": "alfie vs AJ"
    },
    {
      "id": "000007",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000008",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000009",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000010",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000011",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000012",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000013",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000014",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000015",
      "name": "EXAMPLE_PLAYER1 vs EXAMPLE_PLAYER2"
    }
  ]
}
```

*GET all game IDs and names with the player ID 000001*

Request
`http://localhost:8090/games?player=000001`

Response
```
{
  "mList": [
    {
      "id": "000001",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000003",
      "name": "player 1 vs player 3"
    },
    {
      "id": "000007",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000008",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000009",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000010",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000011",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000012",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000013",
      "name": "player 1 vs player 2"
    },
    {
      "id": "000014",
      "name": "player 1 vs player 2"
    }
  ]
}
```

*GET games containing an invalid player ID*

Request
`http://localhost:8090/games?player=000001`

Response
```
{
  "mList": []
}
```


---

### 5. Get details of a game

**Request**

- **Method:** `GET`  
- **URL:** `http://localhost:8090/games/{id}`  

**Path Parameters**

- `id` (string, required) – ID of the game to retrieve.

**Description**

GET request which returns a JSON of the game with `id` passed into the URL.  
Returns all fields for that game or returns an error if the match is not found.

**Response fields**

- `200 OK` – JSON object with all fields for the game (IDs of players, scores, etc., depending on implementation).
- `404 Not Found` – if the match is not found.

**Examples**

*GET details of a match with ID 000001*

Request
`http://localhost:8090/games/000001`

Response
```
{
  "id": "000001",
  "name": "player1 vs player2",
  "player1": {
    "id": "000001",
    "name": "player 1"
  },
  "player2": {
    "id": "000002",
    "name": "player 2"
  },
  "player1Score": 60,
  "player2Score": 50,
  "winner": {
    "id": "000001",
    "name": "player 1"
  }
}
```

*GET details of a match with invalid ID*

Request
`http://localhost:8090//XXXXXX`

Response
```
{
  "error": "Match not found"
}
```

---

### 6. Create a new game

**Request**

- **Method:** `POST`  
- **URL:** `http://localhost:8090/games`  
- **Body:** `application/json`

**Description**

POST request which adds a new game to the games JSON, providing the players in the body do not have the same player ID (i.e. a player cannot play against themselves).  

On successful completion a JSON is returned with the match ID and winner ID.


**Response fields**

- `200 OK` – JSON with:
  - `matchId` (string)
  - `winnerId` (string)
- `400 Bad Request` – if player IDs are invalid or both players have the same ID.

**Examples**

*POST create a game between players with IDs 000020 and 000021*

Request
`https://localhost:8090/games`
```body
{
  "playerOneId": "000001",
  "playerTwoId": "000002",
  "framesPlayerOne": 3,
  "framesPlayerTwo": 1,
  "table": "Main Table",
  "date": "2025-01-01T19:00:00Z"
}
```

Response 
```
{
  "id": "000016",
  "winnerID": "000021"
}
```

*POST create game between the same players*

Request
`http://localhost:8090/games`
```body
{
    "player1ID":"000021",
    "player2ID":"000021",
    "player1Score":"22",
    "player2Score":"27"

}
```

Response
```
{
  "id": "000016",
  "winnerID": "000021"
}
```

---

## Login

API documentation concerned with the sign-in process is found here.

### 7. Login with username and password

**Request**

- **Method:** `GET`  
- **URL:** `http:localhost:8090//login/{user}/{pass}`  

**Path Parameters**

- `user` (string, required) – Username.  
- `pass` (string, required) – Password.

**Description**

GET request which takes two variables passed in the URL for the username and password.  

On successful sign in returns a `valid` flag as `true` and the user `id`.  
On incorrect password or no user found the correct error will be returned.

> Note: Passing passwords in the URL is generally insecure; consider switching this to a `POST` with JSON body for production systems.

**Response fields**

- `200 OK` – JSON:
  ```json
  {
    "valid": true,
    "id": "000001"
  }
  ```
- `403 Forbidden` – if the password is incorrect.
- `400 Bad Request` – if no user is found.

**Examples**

*GET login with correct user and password*

Request
`http://localhost:8090login/player%201/Pass`

Response
```
{
  "valid": true,
  "id": "000001"
}
```

*GET login where user does not exist*

Request
`http://localhost:8090/login/player%20X/Pass`

Response
```
{
  "valid": false,
  "error": "User not found"
}
```

*GET login where user exists but password does not macth*

Request
`http://localhost:8090/login/player%201/pass`

Response
```
{
  "valid": false,
  "error": "Invalid password"
}
```
