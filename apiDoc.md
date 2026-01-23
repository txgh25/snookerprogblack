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
