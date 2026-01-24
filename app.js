const express = require('express');
const app = express();
const points = require('./points.json');
const path = require('path');
const fs = require('fs');
const playerDir=process.env.PLAYERS_PATH||path.join(__dirname, 'players.json');
const matchDir=process.env.GAMES_PATH||path.join(__dirname, 'games.json');
const crypto = require('crypto');






app.use(express.static('client'));
app.use(express.json());




function nextID(currentIDs) {
    const maxID = currentIDs.reduce((max, idStr) => {
        const idNum= parseInt(idStr);
        return Number.isFinite(idNum) ? Math.max(max, idNum) : max;
    }, 0);
    return String(maxID + 1).padStart(6, '0');

}


app.get('/ping', (req,res) => {
    res.sendStatus(200);
});


app.get('/points', (req, res) => {
    return res.status(200).json(points);
});

app.get('/login/:user/:pass', (req, res) => {
    const user = req.params.user;
    const pass = req.params.pass;
    /*Adapted from https://www.w3schools.com/nodejs/ref_hash.asp , accessed (15/01/2026)*/
    /*------------------------------------------------------------------*/
    const hash = crypto.createHash('sha256').update(pass).digest('hex');
    /*------------------------------------------------------------------*/
   

    const storedData = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const playerEntry = Object.entries(storedData).find(([, p]) => p.name == user);

    

    if (!playerEntry) {
        console.log("User not found:", user);
        return res.status(400).json({ valid: false, error: "User not found" });
    }

    const id = playerEntry[0];
    const player = playerEntry[1];

    if (hash == player.password) {
        console.log("Login successful for user:", user);
        return res.status(200).json({ valid: true, id });
    } else {
        console.log("Invalid password for user:", user);
        return res.status(403).json({ valid: false, error: "Invalid password" });
    }
});

app.get('/players', (req, res) => {
    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const search = (req.query.search||"").toLowerCase().trim();

    const pList = Object.entries(players)
        .filter(([, p]) => 
            !search || (p.name || "").toLowerCase().includes(search)
        )
        .map(([id, p]) => ({id,name:p.name}));
    
    return res.status(200).json({pList});
});

app.get('/games', (req, res) => {
    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const matches = JSON.parse(fs.readFileSync(matchDir, 'utf8'));
    const player = (req.query.player||"").trim();

    const mList = Object.entries(matches)
        .filter(([, m]) => 
            !player || m.player1==player || m.player2==player
        )
        .map(([id, m]) => {
            const p1=players[m.player1]?.name||"Unknown";
            const p2=players[m.player2]?.name||"Unknown";
            return {id, name:`${p1} vs ${p2}`};
        });
    
    return res.status(200).json({mList});
});

app.get('/players/:id', (req, res) => {
    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const matches = JSON.parse(fs.readFileSync(matchDir, 'utf8'));
    const id=req.params.id;
    const p=players[id];

    if(!p){
        return res.status(404).json({error:"Player not found"});
    }

    const playedIn = Object.entries(matches)
    .filter(([,m]) => m.player1==id || m.player2==id).map(([matchID,m]) => {
        const opponentID = (m.player1==id) ? m.player2 : m.player1;
        const playerScore = (m.player1==id) ? m.player1Score : m.player2Score;
        const opponentScore = (m.player1==id) ? m.player2Score : m.player1Score;
        const winner = players[m.winner]? {id: m.winner, name: players[m.winner].name} : null;
        const opponent = players[opponentID]? {id: opponentID, name: players[opponentID].name} : {id: opponentID, name: "Unknown Player"};

        return {
            id:matchID,
            name: `${p.name} vs ${opponent.name}`,
            opponent,
            playerScore,
            opponentScore,
            winner
        };
    });
    return res.status(200).json({
        id, 
        name:p.name, 
        gamesPlayed: playedIn.length, 
        gamesWon:p.gamesWon, 
        lifetimePoints:p.lifetimePoints, 
        matches: playedIn
    });
});

app.get('/games/:id', (req, res) => {
    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const matches = JSON.parse(fs.readFileSync(matchDir, 'utf8'));
    const id=req.params.id;
    const m=matches[id];

    if(!m){
        return res.status(404).json({error:"Match not found"});
    }

    const player1 = players[m.player1]? {id: m.player1, name: players[m.player1].name}: {id: m.player1, name: "Unknown Player"};
    
    const player2 = players[m.player2]? {id: m.player2, name: players[m.player2].name}: {id: m.player2, name: "Unknown Player"};
    
    const winner = m.winner && players[m.winner]? {id: m.winner, name: players[m.winner].name}: null;

    return res.status(200).json({
        id,
        name: m.name,
        player1,
        player2,
        player1Score: m.player1Score,
        player2Score: m.player2Score,
        winner 
    });
});

app.post('/players', (req, res) => {
    const {
        name:playerName,
        password
    } = req.body || {};

    if (playerName.trim().length < 1) {
        return res.status(400).json({ error: "Player name is required" });
    }
    if (password.trim().length < 1) {
        return res.status(400).json({ error: "Password is required" });
    }



    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));

    const playerExists = Object.values(players).some(
        p => (p.name||"") == playerName);

    if (playerExists) {
        return res.status(400).json({error: "Player with this name already exists" });
    }

    const id = nextID(Object.keys(players));
    
    players[id] = {
        name: playerName.trim(),
        password: crypto.createHash('sha256').update(password.trim()).digest('hex'),
        gamesPlayed: 0,
        gamesWon: 0,
        lifetimePoints:0,
        games:[]
    };

    fs.writeFileSync(playerDir, JSON.stringify(players, null, 2), 'utf8');
    return res.status(200).json({id, name: players[id].name});
});

app.post("/games", (req, res) => {

    console.log(req.body);

    const {
        player1ID,
        player2ID,
        player1Score,
        player2Score
    } = req.body || {};

    const players = JSON.parse(fs.readFileSync(playerDir, 'utf8'));
    const matches = JSON.parse(fs.readFileSync(matchDir, 'utf8'));

    if (player1ID.trim().length < 1 || player2ID.trim().length < 1) {
        return res.status(400).json({ error: "Player IDs are required" });
    }

    if (player1ID == player2ID) {
        return res.status(400).json({ error: "Player IDs must be different" });
    }

    const s1= Number.isInteger(parseInt(player1Score)) ? player1Score : null;
    const s2= Number.isInteger(parseInt(player2Score)) ? player2Score : null;
    if (s1 == null || s2 == null || s1 < 0 || s2 < 0) {
        return res.status(400).json({ error: "Scores must be non-negative integers" });
    }

    if (!players[player1ID] || !players[player2ID]) {
        return res.status(400).json({ error: "One or both player IDs do not exist" });
    }

   
    const id = nextID(Object.keys(matches));
    const winnerID = s1==s2 ? null : (s1 > s2 ? player1ID : player2ID);

    matches[id] = {
        name: `${players[player1ID].name} vs ${players[player2ID].name}`,
        player1: player1ID,
        player2: player2ID,
        player1Score: s1,
        player2Score: s2,
        winner: winnerID
    };

    players[player1ID].gamesPlayed += 1;
    players[player2ID].gamesPlayed += 1;
    players[player1ID].lifetimePoints += s1;
    players[player2ID].lifetimePoints += s2;
    if (winnerID) {
        players[winnerID].gamesWon += 1;
    }

    if(!(Array.isArray(players[player1ID].games))){
        players[player1ID].games=[];
    }

    if(!(Array.isArray(players[player2ID].games))){
        players[player2ID].games=[];
    }

    players[player1ID].games.push(id);
    players[player2ID].games.push(id);

    fs.writeFileSync(matchDir, JSON.stringify(matches, null, 2), 'utf8');
    fs.writeFileSync(playerDir, JSON.stringify(players, null, 2), 'utf8');
    return res.status(200).json({id, winnerID});
});

module.exports=app;

