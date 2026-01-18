const express = require('express');
const app = express();
const points = require('./points.json');
const players  = require('./players.json');


app.use(express.static('client'));
app.use(express.json());

app.get('/points', (req, res) => {
    res.json(points);
});

app.get('/players', (req, res) => {
    res.json(players);
});

app.listen(8090)

console.log("Server running at 8090.");