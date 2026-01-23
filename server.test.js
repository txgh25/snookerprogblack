const request = require('supertest');
const app = require('./app');

describe('Test the players API', () => {
    test("GET /players succeeds", () => {
        return request(app).get('/players').expect(200);
    });

    test('GET /players returns JSON', () =>{
        return request(app).get('/players').expect('Content-Type',/json/);
    });

    test('GET /players contains pList array', async() =>{
        const res=await request(app).get('/players');
        expect(Array.isArray(res.body.pList)).toBe(true);
    });

    test('GET /players/000001 succeeds', () => {
        return request(app).get('/players/000001').expect(200);
    });

    test('GET /players/000001 returns JSON', () => {
        return request(app).get('/players/000001').expect('Content-Type',/json/);
    });

    test('GET /players/000001 contains all fields', async () => {
        const res = await request(app).get('/players/000001');
        expect(res.body.name).toBeDefined();
        expect(res.body.gamesPlayed).toBeDefined();
        expect(res.body.gamesWon).toBeDefined();
        expect(res.body.lifetimePoints).toBeDefined();
    });

    test('GET /login/:user/:pass succeeds for a correct pair', () =>{
        return request(app).get(`/login/${encodeURIComponent("player 1")}/${encodeURIComponent("Pass")}`).expect(200);
    });

    test('GET /login/:user/:pass fails for an incorrect pair', () => {
        return request(app).get('/login/player%201/PasswordXYZ').expect(403);
    });

    test ('GET /login/:user/:pass returns JSON', () => {
        return request(app).get('/login/player%201/Password123').expect('Content-Type',/json/)
    });

    test('POST creates a new user', () => {
        return request(app).post('/players').send({
            name:"Player" + Date.now(),
            password:"111111",
        }).expect(200).expect('Content-Type',/json/)
    });
});

describe('Test the games API', () => {
   test('GET /games returns 200', () => {
        return request(app).get('/games').expect(200);
   }); 

   test('GET /games returns JSON', () => {
        return request(app).get('/games').expect('Content-Type', /json/)
   });

   test('GET /games contains mList array', async() => {
        const res = await request(app).get('/games');
        expect(Array.isArray(res.body.mList)).toBe(true)
   });

   test('GET /games/000001 succeeds', () => {
        return request(app).get('/games/000001').expect(200);
   });

   test('GET /games/000001 returns JSON', () => {
        return request(app).get('/games/000001').expect('Content-Type',/json/);
   });

   test('GET /games/000001 contains players', async () => {
        const res = await request(app).get('/games/000001');
        expect(res.body.player1).toBeDefined();
        expect(res.body.player2).toBeDefined();
   });

   test('GET /games/000001 contains player scores', async() =>{
        const res = await request(app).get('/games/000001');
        expect(res.body.player1Score).toBeDefined();
        expect(res.body.player2Score).toBeDefined();
   });

   test('POST /games creates a match', () => {
        return request(app).post('/games').send({
            player1ID: "000001",
            player2ID: "000002",
            player1Score:10,
            player2Score:5
        }).expect(200).expect('Content-Type',/json/);
   });

});