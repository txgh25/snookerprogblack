## Prog black API

This API is for communication with the server for the storage, searching and detailing of games of snooker and the players who played them.

Base URL: `http://localhost:8090`


---

## Players

The API documentation concerned with retrieving and storing player data are stored here.

### 1. List players

**Request**

- **Method:** `GET`  
- **URL:** `/players`  

**Description**

Returns a list of player IDs and names.  
The request can be filtered by ID to return a particular player's name or left blank to return all players stored.

**Query Parameters**

- `id` (optional, string) – Player ID to filter by. If omitted, all players are returned.

**Response (conceptual)**

- `200 OK` – JSON array of players (or a single player when filtered by ID), including:
  - `id` (string)
  - `name` (string)


---

### 2. Get full details of a player

**Request**

- **Method:** `GET`  
- **URL:** `/players/{id}`  

**Path Parameters**

- `id` (string, required) – ID of the player whose details are requested.

**Description**

Request to get the full details of a player.  
Requires the variable `id` to be entered to find the player by their ID.

**Response (conceptual)**

- `200 OK` – JSON object with:
  - `id` (string)
  - `name` (string)
  - `gamesPlayed` (number)
  - `gamesWon` (number)
  - `lifetimePoints` (number)
  - `matches` (array) – array of matches played (structure depends on implementation)
- `404 Not Found` – if the player is not found.


---

### 3. Create a new player

**Request**

- **Method:** `POST`  
- **URL:** `/players`  
- **Body:** `application/json`

**Description**

POST request which adds a new player.  
The body requires a JSON which contains the new username and password.  
The other attributes for a new player are initialised to `0`.  

On success the player's ID and name are returned as JSON.

**Request Body (example)**

```json
{
  "username": "player1",
  "password": "securePassword123"
}
```

**Response (conceptual)**

- `201 Created` – JSON with:
  - `id` (string)
  - `name` (string)
- `409 Conflict` – if a player with the same username already exists.
- `400 Bad Request` – if the body is invalid.


---

## Games

The API documentation concerned with storing and retrieving match data can be found here.

### 4. List games (optionally filter by player)

**Request**

- **Method:** `GET`  
- **URL:** `/games`  

**Description**

GET request that returns the ID and names of all games.  
It may be filtered by the addition of a player ID to search by so that it only includes games in which that player played.

**Query Parameters**

- `player` (optional, string) – Player ID to filter games by.

**Example**

```http
GET /games?player=000001
```

**Response (conceptual)**

- `200 OK` – JSON array of games, each including at least:
  - `id` (string)
  - `name` (string)


---

### 5. Get details of a game

**Request**

- **Method:** `GET`  
- **URL:** `/games/{id}`  

**Path Parameters**

- `id` (string, required) – ID of the game to retrieve.

**Description**

GET request which returns a JSON of the game with `id` passed into the URL.  
Returns all fields for that game or returns an error if the match is not found.

**Response (conceptual)**

- `200 OK` – JSON object with all fields for the game (IDs of players, scores, etc., depending on implementation).
- `404 Not Found` – if the match is not found.


---

### 6. Create a new game

**Request**

- **Method:** `POST`  
- **URL:** `/games`  
- **Body:** `application/json`

**Description**

POST request which adds a new game to the games JSON, providing the players in the body do not have the same player ID (i.e. a player cannot play against themselves).  

On successful completion a JSON is returned with the match ID and winner ID.

**Request Body (example)**

```json
{
  "playerOneId": "000001",
  "playerTwoId": "000002",
  "framesPlayerOne": 3,
  "framesPlayerTwo": 1,
  "table": "Main Table",
  "date": "2025-01-01T19:00:00Z"
}
```

**Response (conceptual)**

- `201 Created` – JSON with:
  - `matchId` (string)
  - `winnerId` (string)
- `400 Bad Request` – if player IDs are invalid or both players have the same ID.
- `404 Not Found` – if one or both players do not exist.


---

## Login

API documentation concerned with the sign-in process is found here.

### 7. Login with username and password

**Request**

- **Method:** `GET`  
- **URL:** `/login/{user}/{pass}`  

**Path Parameters**

- `user` (string, required) – Username.  
- `pass` (string, required) – Password.

**Description**

GET request which takes two variables passed in the URL for the username and password.  

On successful sign in returns a `valid` flag as `true` and the user `id`.  
On incorrect password or no user found the correct error will be returned.

> Note: Passing passwords in the URL is generally insecure; consider switching this to a `POST` with JSON body for production systems.

**Response (conceptual)**

- `200 OK` – JSON:
  ```json
  {
    "valid": true,
    "id": "000001"
  }
  ```
- `401 Unauthorized` – if the password is incorrect.
- `404 Not Found` – if no user is found.
