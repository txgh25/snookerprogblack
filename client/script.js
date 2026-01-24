var player1Score=0;
var player2Score=0;
var balls=15;
var activePlayer=1;
var lastMove="";
const ballOrder=["red","yellow","green","brown","blue","pink","black"]
var colourOnly=false;
activeBall="red"

document.getElementById("whitePot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        if (activePlayer==1)
        {
            playerswitch();
            lastMove="wPot1";
            player2Score=player2Score+data["white"];
        }
        else
        {
            playerswitch();
            lastMove="wPot2";
            player1Score=player1Score+data["white"];
        }
        updateScore();
        closeWindow("whiteMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("whiteMiss").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        if (activePlayer==1)
        {
            playerswitch();
            lastMove="wMiss1";
            player2Score=player2Score+data["white"];
        }
        else
        {
            playerswitch();
            lastMove="wMiss2";
            player1Score=player1Score+data["white"];
        }
        updateScore();
        closeWindow("whiteMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("yellowHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("yellow",activePlayer,data);
        updateScore();
        closeWindow("yellowMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("yellowPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("yellow",activePlayer,data);
        updateScore();
        closeWindow("yellowMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("greenHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("green",activePlayer,data);
        updateScore();
        closeWindow("greenMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("greenPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("green",activePlayer,data);
        updateScore();
        closeWindow("greenMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("brownHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("brown",activePlayer,data);
        updateScore();
        closeWindow("brownMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("brownPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("brown",activePlayer,data);
        updateScore();
        closeWindow("brownMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("blueHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("blue",activePlayer,data);
        updateScore();
        closeWindow("blueMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("bluePot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("blue",activePlayer,data);
        updateScore();
        closeWindow("blueMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("pinkHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("pink",activePlayer,data);
        updateScore();
        closeWindow("pinkMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("pinkPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("pink",activePlayer,data);
        updateScore();
        closeWindow("pinkMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("blackHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourHit("black",activePlayer,data);
        updateScore();
        closeWindow("blackMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("blackPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        colourPot("black",activePlayer,data);
        updateScore();
        closeWindow("blackMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("redPot").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        redPot(activePlayer,data);
        updateScore();
        closeWindow("redMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});

document.getElementById("redHit").addEventListener("click", async function(event) {
    try{
        let response = await fetch("/points");
        let data = await response.json();
        redHit(activePlayer,data);
        updateScore();
        closeWindow("redMenu");
    }
    catch(e){
        alert("Error fetching point data");
    }

});




function colourPot(colour,active,points)
{
    if (colourOnly)
    {
        if (colour==activeBall)
        {
            if (colour=="black")
                {

                    document.getElementById('gameComplete').hidden=false;
                    document.getElementById('game').hidden=true;
                    
                    document.getElementById("player1FinalUnitText").innerHTML=(player1Score)%10;
                    document.getElementById("player1FinalTenText").innerHTML=Math.floor((player1Score/10)%10);
                    document.getElementById("player1FinalHunText").innerHTML=Math.floor((player1Score/100)%10);

                    document.getElementById("player2FinalUnitText").innerHTML=(player2Score)%10;
                    document.getElementById("player2FinalTenText").innerHTML=Math.floor((player2Score/10)%10);
                    document.getElementById("player2FinalHunText").innerHTML=Math.floor((player2Score/100)%10);
                    updateGame();
                }


            else if (active==1)    
            {
                player1Score=player1Score+points[colour]
                lastMove=colour+"Pot1"
            }
            else
            {
                player2Score=player2Score+points[colour]
                lastMove=colour+"Pot2"
            }
        potRemove(colour+"Ball")
        activeBall=ballOrder[ballOrder.indexOf(colour)+1]
        }
        else
        {
            if (active==1)
            {
                playerswitch()
                lastMove=colour+"Pot1f"
                player2Score=player2Score+points[colour]        
            }
            else
            {
                playerswitch()
                lastMove=colour+"Pot2f"
                player1Score=player1Score+points[colour]
            }
        }
        
        
    }


    else
    {
        if (lastMove=="rPot1")
        {
            player1Score=player1Score+points[colour]
            lastMove=colour+"Pot1"
        }
        else if (lastMove=="rPot2")
        {
            player2Score=player2Score+points[colour]
            lastMove=colour+"Pot2"
        }
        else
        {
            if (active==1)
            {
                player2Score=player2Score+points[colour]
                lastMove=colour+"Pot1f"
                playerswitch()
            }
            else
            {
                player1Score=player1Score+points[colour]
                lastMove=colour+"Pot2f"
                playerswitch()
            }
        }

    }
    console.log(player1Score,player2Score,lastMove, activeBall)
    
}

function colourHit(colour,active,points)
{
    if (colourOnly)
    {
        if (colour==activeBall)
        {
            if (active==1)
            {
                playerswitch();
                lastMove=colour+"Hit1"
            }
            else
            {
                playerswitch();
                lastMove=colour+"Hit2";
            }
        }
        else
        {
            if (active==1)
            {
                playerswitch()
                lastMove=colour+"Hit1f"
                player2Score=player2Score+points[colour]
            }
            else
            {
                playerswitch()
                lastMove=colour+"Hit2f"
                player1Score=player1Score+points[colour]
            }
        }
    }
    else
    {
        if (lastMove=="rPot1")  
        {
            lastMove=colour+"Hit1"
            playerswitch()
        }
        else if (lastMove=="rPot2")
        {
            lastMove=colour+"Hit2"
            playerswitch()
        }
        else
        {
            if (active==1)
            {
                player2Score=player2Score+points[colour]
                playerswitch()
                lastMove=colour+"Hit1f"
            }
            else
            {
                player1Score=player1Score+points[colour]
                playerswitch()
                lastMove=colour+"Hit2f"
            }
        }
    }
    console.log(player1Score,player2Score,lastMove, activeBall)
}

function redPot(active,points)
{
    if (lastMove=="rPot1")
    {
        player2Score=player2Score+points["red"]
        lastMove="rPot1f"
        playerswitch()
    }
    else if (lastMove=="rPot2")
    {
        player1Score=player1Score+points["red"]
        lastMove="rPot2f"
        playerswitch()
    }
    else
    {
        if (active==1)
        {
            player1Score=player1Score+points["red"]
            lastMove="rPot1"
        }
        else
        {
            player2Score=player2Score+points["red"]
            lastMove="rPot2"
        }
    }
    balls=balls-1
    if (balls==0)
    {
        colourOnly=true;
        activeBall="yellow"
        document.getElementById("redBall").hidden=true;
    }
    else
    {
        document.getElementById("variableBalls").src="red" + balls + "Only.png";
    }
}

function redHit(active,points)
{
    if (lastMove=="rPot1")
    {
        player2Score=player2Score+points["red"]
        lastMove="rHit1f"
        playerswitch()
    }
    else if (lastMove=="rPot2")
    {
        player1Score=player1Score+points["red"]
        lastMove="rHit2f"
        playerswitch()
    }
    else
    {
        if (active==1)
        {
            playerswitch()
            lastMove="rHit1"
        }
        else
        {
            playerswitch()
            lastMove="rHit2"
        }
    }
}

function potRemove(toRemove)
{
    document.getElementById(toRemove).hidden=true;
}

function playerswitch()
{
    if (activePlayer==1)
    {
        activePlayer=2;
        document.getElementById("playerTurn").src="nixie2.png"
    }
    else
    {
        activePlayer=1;
        document.getElementById("playerTurn").src="nixie1.png"
    }
}

function updateScore()
{
    document.getElementById("player1UnitText").innerHTML=(player1Score)%10;
    document.getElementById("player1TenText").innerHTML=Math.floor((player1Score/10)%10);
    document.getElementById("player1HunText").innerHTML=Math.floor((player1Score/100)%10);

    document.getElementById("player2UnitText").innerHTML=(player2Score)%10;
    document.getElementById("player2TenText").innerHTML=Math.floor((player2Score/10)%10);
    document.getElementById("player2HunText").innerHTML=Math.floor((player2Score/100)%10);
}

function closeWindow(toClose)
{
    document.getElementById(toClose).hidden=true;
}
function openWindow(toOpen)
{
    document.getElementById(toOpen).hidden=false;
}

function resetGame()
{
    document.getElementById('gameComplete').hidden=true;
    document.getElementById('game').hidden=false; 
    player1Score=0;
    player2Score=0;
    balls=15;
    activePlayer=1;
    lastMove="";
    colourOnly=false;
    activeBall="red"
    document.getElementById("player1Text").innerHTML=document.getElementById('player1Input').value
    document.getElementById("player2Text").innerHTML=document.getElementById('player2Input').value

    document.getElementById("player1FinalText").innerHTML=document.getElementById('player1Input').value
    document.getElementById("player2FinalText").innerHTML=document.getElementById('player2Input').value

    document.getElementById("player1FinalUnitText").innerHTML=0
    document.getElementById("player1FinalTenText").innerHTML=0
    document.getElementById("player1FinalHunText").innerHTML=0

    document.getElementById("player2FinalUnitText").innerHTML=0
    document.getElementById("player2FinalTenText").innerHTML=0
    document.getElementById("player2FinalHunText").innerHTML=0

    document.getElementById("player1UnitText").innerHTML=0
    document.getElementById("player1TenText").innerHTML=0
    document.getElementById("player1FinalHunText").innerHTML=0

    document.getElementById("player2UnitText").innerHTML=0
    document.getElementById("player2TenText").innerHTML=0
    document.getElementById("player2HunText").innerHTML=0

    document.getElementById("variableBalls").src="red15Only.png"
    document.getElementById("redBall").hidden=false;

    document.getElementById("yellowBall").hidden=false;
    document.getElementById("greenBall").hidden=false;
    document.getElementById("brownBall").hidden=false;
    document.getElementById("blueBall").hidden=false;
    document.getElementById("pinkBall").hidden=false;
    document.getElementById("blackBall").hidden=false;
}

var open=false;
var reverseOpen=false;
var matchOpen=false;

document.getElementById("clipboardButton").addEventListener("click", async function() {
    
    
    if (open)
    {
        open=false;
        document.getElementById("clipboardHolder").classList.toggle("showClipboard",open);
        /*Adapted from Browser Stack, 30/05/2025, How to Make JavaScript Wait for 1 Second: Using setTimeout and Promises?, Available at: https://www.browserstack.com/guide/javascript-wait-one-second (Accessed at: 08/01/2026)*/
        /*------------------------------------------------------------------------------------------------------*/
        new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
            document.getElementById("clipboardHolder").style.zIndex="0";
        });
        /*------------------------------------------------------------------------------------------------------*/
    }
    else
    {
        open=true;
        document.getElementById("clipboardHolder").style.zIndex=String(Number(document.getElementById("clipboardHolderReverse").style.zIndex)+1);
        document.getElementById("clipboardHolder").classList.toggle("showClipboard",open);
        
    }
    
});
let player1ID=null;
let player2ID=null;

var player1SignedIn=false;
document.getElementById("login1").addEventListener("click", async function(e) {
    e.preventDefault();
    const username = document.getElementById("player1Input").value;
    const password = document.getElementById("player1Pass").value;
    
    try {
        const response = await fetch(`/login/${encodeURIComponent(username.trim())}/${encodeURIComponent(password.trim())}`);
        const result = await response.json();
        if (response.ok) {
            
            if (result.valid) {
                document.getElementById("nameInputContainer").hidden=true;
                document.getElementById("signedInText").innerHTML=username.trim()+ " ready";
                document.getElementById("signedIn").hidden=false;
                document.getElementById("player1FinalText").innerHTML=username.trim();
                document.getElementById("player1ClipName").innerHTML=username.trim();
                player1ID=result.id;

                const playerDataResponse = await fetch(`/players/${encodeURIComponent(result.id)}`);
                console.log("login status", response.status);
                const playerData = await playerDataResponse.json();
                console.log("login result", result);


                if (playerDataResponse.ok) {
                    document.getElementById("player1ClipGames").innerHTML="Games played: " +  playerData.gamesPlayed;
                    document.getElementById("player1ClipWins").innerHTML="Games won: " + playerData.gamesWon;
                    document.getElementById("player1ClipAverage").innerHTML="Average points: " + (playerData.gamesPlayed ? Math.round(playerData.lifetimePoints / playerData.gamesPlayed) : 0);


                    let games = playerData.matches||[];
                    let latestGame=games[games.length-1];
                    let nextlatestGame=games[games.length-2];

                    if (latestGame!=undefined)
                    {
                        document.getElementById("game1Name1").innerHTML=latestGame.name;
                        document.getElementById("game1Score1").innerHTML=latestGame.playerScore + ":" + latestGame.opponentScore;
                        document.getElementById("game1Winner1").innerHTML=latestGame.winner!=null ? "Winner: " + latestGame.winner.name : "No winner";

                        if (nextlatestGame!=undefined)
                        {
                            document.getElementById("game2Name1").innerHTML=nextlatestGame.name;
                            document.getElementById("game2Score1").innerHTML=nextlatestGame.playerScore + ":" + nextlatestGame.opponentScore;
                            document.getElementById("game2Winner1").innerHTML=nextlatestGame.winner!=null ? "Winner: " + nextlatestGame.winner.name : "No winner";
                        }
                    
                    }
                }
                player1SignedIn=true;
                if (player2SignedIn)
                {
                    document.getElementById("restartContainer").hidden=false;
                }
            } else {
                alert("Invalid username or password for Player 1");
            }
        }
        else if (response.status == 403) {
            alert(result.error || "Invalid username or password for Player 1");
        }
        else if (response.status == 400) {
            const newUserResponse= await fetch('/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: username.trim(),
                    password: password.trim()
                })
            });
            const newUserResult = await newUserResponse.json();
            if (!newUserResponse.ok) {
                alert("Error creating new user: " + (newUserResult.error || newUserResponse.statusText));
            } else {
                alert("New user created, please log in again.");
                document.getElementById("player1Input").value="";
                document.getElementById("player1Pass").value="";
            }

        }
    } catch (error) {
        alert("Network error during Player 1 login");
    }
});

var player2SignedIn=false;
document.getElementById("login2").addEventListener("click", async function(e) {
    e.preventDefault();
    const username = document.getElementById("player2Input").value;
    const password = document.getElementById("player2Pass").value;
    if (username.trim()==document.getElementById("player1Input").value.trim())
    {
        alert("Player 2 cannot use the same username as Player 1");
    }
    else
    {
    try {
        const response = await fetch(`/login/${encodeURIComponent(username.trim())}/${encodeURIComponent(password.trim())}`);
        const result = await response.json();
        if (response.ok) {
            
            if (result.valid) {
                document.getElementById("nameInput2Container").hidden=true;
                document.getElementById("signedInText2").innerHTML=username.trim()+ " ready";
                document.getElementById("signedIn2").hidden=false;
                document.getElementById("player2FinalText").innerHTML=username.trim();
                document.getElementById("player2ClipName").innerHTML=username.trim();
                player2ID=result.id;
                
                const playerDataResponse = await fetch(`/players/${encodeURIComponent(result.id)}`);
                console.log("login status", response.status);
                const playerData = await playerDataResponse.json();
                console.log("login result", result);


                if (playerDataResponse.ok) {
                    document.getElementById("player2ClipGames").innerHTML="Games played: " +  playerData.gamesPlayed;
                    document.getElementById("player2ClipWins").innerHTML="Games won: " + playerData.gamesWon;
                    document.getElementById("player2ClipAverage").innerHTML="Average points: " + (playerData.gamesPlayed ? Math.round(playerData.lifetimePoints / playerData.gamesPlayed) : 0);


                    let games = playerData.matches||[];
                    let latestGame=games[games.length-1];
                    let nextlatestGame=games[games.length-2];

                    if (latestGame!=undefined)
                    {
                        document.getElementById("game1Name2").innerHTML=latestGame.name;
                        document.getElementById("game1Score2").innerHTML=latestGame.playerScore + ":" + latestGame.opponentScore;
                        document.getElementById("game1Winner2").innerHTML=latestGame.winner!=null ? "Winner: " + latestGame.winner.name : "No winner";

                        if (nextlatestGame!=undefined)
                        {
                            document.getElementById("game2Name2").innerHTML=nextlatestGame.name;
                            document.getElementById("game2Score2").innerHTML=nextlatestGame.playerScore + ":" + nextlatestGame.opponentScore;
                            document.getElementById("game2Winner2").innerHTML=nextlatestGame.winner!=null ? "Winner: " + nextlatestGame.winner.name : "No winner";
                        }
                    
                    }
                }
                player2SignedIn=true;
                if (player1SignedIn)
                {
                    document.getElementById("restartContainer").hidden=false;
                }

            } 
            else {
                alert("Invalid username or password for Player 2");
            }
        }
        else if (response.status == 403) {
            alert(result.error || "Invalid username or password for Player 2");
        }
        else if (response.status == 400) {
            const newUserResponse= await fetch('/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: username.trim(),
                    password: password.trim()
                })
            });
            const newUserResult = await newUserResponse.json();
            if (!newUserResponse.ok) {
                alert("Error creating new user: " + (newUserResult.error || newUserResponse.statusText));
            } else {
                alert("New user created, please log in again.");
                document.getElementById("player2Input").value="";
                document.getElementById("player2Pass").value="";
            }

        }
    } catch (error) {
        alert("Network error during Player 2 login");
    }
}
});


document.getElementById("signOut1").addEventListener("click", async function() {
    player1SignedIn=false;
    document.getElementById("nameInputContainer").hidden=false;
    document.getElementById("restartContainer").hidden=true;
    document.getElementById("signedIn").hidden=true;
    document.getElementById("player1Input").value="";
    document.getElementById("player1Pass").value="";
});

document.getElementById("signOut2").addEventListener("click", async function() {
    player2SignedIn=false;
    document.getElementById("nameInput2Container").hidden=false;
    document.getElementById("restartContainer").hidden=true;
    document.getElementById("signedIn2").hidden=true;
    document.getElementById("player2Input").value="";
    document.getElementById("player2Pass").value="";
});



document.getElementById("clipboardButtonReverse").addEventListener("click", async function() {
    
    
    if (reverseOpen)
    {
        reverseOpen=false;
        document.getElementById("clipboardHolderReverse").classList.toggle("showClipboardReverse",reverseOpen);
        /*Adapted from Browser Stack, 30/05/2025, How to Make JavaScript Wait for 1 Second: Using setTimeout and Promises?, Available at: https://www.browserstack.com/guide/javascript-wait-one-second (Accessed at: 08/01/2026)*/
        /*------------------------------------------------------------------------------------------------------*/
        new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
            document.getElementById("clipboardHolderReverse").style.zIndex="0";
        });
        /*------------------------------------------------------------------------------------------------------*/
    }
    else
    {
        reverseOpen=true;
        document.getElementById("clipboardHolderReverse").style.zIndex=String(Number(document.getElementById("clipboardHolder").style.zIndex)+1);
        document.getElementById("clipboardHolderReverse").classList.toggle("showClipboardReverse",reverseOpen);
        
    }
    
});

document.getElementById("matchButton").addEventListener("click", async function() {
    
    console.log("match button clicked");
    if (matchOpen)
    {
        matchOpen=false;
        document.getElementById("matchHolder").classList.toggle("showMatch",matchOpen);
        /*Adapted from Browser Stack, 30/05/2025, How to Make JavaScript Wait for 1 Second: Using setTimeout and Promises?, Available at: https://www.browserstack.com/guide/javascript-wait-one-second (Accessed at: 08/01/2026)*/
        /*------------------------------------------------------------------------------------------------------*/
        new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
            document.getElementById("matchHolder").style.zIndex="0";
        });
        /*------------------------------------------------------------------------------------------------------*/
    }
    else
    {
        matchOpen=true;
        document.getElementById("matchHolder").style.zIndex=2;
        document.getElementById("matchHolder").classList.toggle("showMatch",matchOpen);
        const selected = document.getElementById("matchFilter")?.value||"";
        loadMatchPlayer(selected)
    }
    
});



/*async function updateClipboard()
{
    try{
        let response = await fetch("/players");
        let data = await response.json();

        
        if (player==undefined)
        {
            let pla
        }

        else
        {
            document.getElementById("player1ClipName").innerHTML=document.getElementById("player1FinalText").textContent;
            document.getElementById("player1ClipGames").innerHTML="Games played: " +  player.gamesPlayed;
            document.getElementById("player1ClipWins").innerHTML="Games won: " + player.gamesWon;
            document.getElementById("player1ClipAverage").innerHTML="Average points: " + Math.round(player.lifetimePoints/player.gamesPlayed);


        }
        
            
        
    }
    catch(e){
        document.getElementById("player1ClipName").innerHTML="";
        document.getElementById("player1ClipGames").innerHTML="";
        document.getElementById("player1ClipWins").innerHTML="";
        document.getElementById("player1ClipAverage").innerHTML="";
        alert("Error fetching player data");
        new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
            updateClipboard();
        });
    }
}*/

async function saveNewPlayer()
{
    const playerInfo={
        [document.getElementById("player1FinalText").textContent]: {
        gamesPlayed: 1,
        gamesWon: activePlayer==1 ? 1 : 0,
        lifetimePoints: player1Score
        }
    }

    
    const response = await fetch('/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerInfo),
    });
    
    if (response.ok) {
        console.log('Player saved successfully.');
    } 
    else {
        alert('Error saving player with status: ' + response.statusText);
    }
    
}

async function updateGame()
{
    try{
        const matchSummary={
        player1ID: player1ID,
        player2ID: player2ID,
        player1Score: player1Score,
        player2Score: player2Score
        };

        const response = await fetch('/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matchSummary),
        });

        if (response.ok) {
            console.log('Game updated successfully.');
        }
        else {
            alert('Error updating game with status: ' + response.statusText);
        }

        const playerData1Response = await fetch(`/players/${encodeURIComponent(player1ID)}`);
        const playerData1 = await playerData1Response.json();


        if (playerData1Response.ok) {
            document.getElementById("player1ClipGames").innerHTML="Games played: " +  playerData1.gamesPlayed;
            document.getElementById("player1ClipWins").innerHTML="Games won: " + playerData1.gamesWon;
            document.getElementById("player1ClipAverage").innerHTML="Average points: " + (playerData1.gamesPlayed ? Math.round(playerData1.lifetimePoints / playerData1.gamesPlayed) : 0);


            let games = playerData1.matches||[];
            let latestGame=games[games.length-1];
            let nextlatestGame=games[games.length-2];

            if (latestGame!=undefined)
            {
                document.getElementById("game1Name1").innerHTML=latestGame.name;
                document.getElementById("game1Score1").innerHTML=latestGame.playerScore + ":" + latestGame.opponentScore;
                document.getElementById("game1Winner1").innerHTML=latestGame.winner!=null ? "Winner: " + latestGame.winner.name : "No winner";

                if (nextlatestGame!=undefined)
                {
                    document.getElementById("game2Name1").innerHTML=nextlatestGame.name;
                    document.getElementById("game2Score1").innerHTML=nextlatestGame.playerScore + ":" + nextlatestGame.opponentScore;
                    document.getElementById("game2Winner1").innerHTML=nextlatestGame.winner!=null ? "Winner: " + nextlatestGame.winner.name : "No winner";
                }
            
            }
        }

        const playerDataResponse = await fetch(`/players/${encodeURIComponent(player2ID)}`);
        const playerData = await playerDataResponse.json();


        if (playerDataResponse.ok) {
            document.getElementById("player2ClipGames").innerHTML="Games played: " +  playerData.gamesPlayed;
            document.getElementById("player2ClipWins").innerHTML="Games won: " + playerData.gamesWon;
            document.getElementById("player2ClipAverage").innerHTML="Average points: " + (playerData.gamesPlayed ? Math.round(playerData.lifetimePoints / playerData.gamesPlayed) : 0);


            let games = playerData.matches||[];
            let latestGame=games[games.length-1];
            let nextlatestGame=games[games.length-2];

            if (latestGame!=undefined)
            {
                document.getElementById("game1Name2").innerHTML=latestGame.name;
                document.getElementById("game1Score2").innerHTML=latestGame.playerScore + ":" + latestGame.opponentScore;
                document.getElementById("game1Winner2").innerHTML=latestGame.winner!=null ? "Winner: " + latestGame.winner.name : "No winner";

                if (nextlatestGame!=undefined)
                {
                    document.getElementById("game2Name2").innerHTML=nextlatestGame.name;
                    document.getElementById("game2Score2").innerHTML=nextlatestGame.playerScore + ":" + nextlatestGame.opponentScore;
                    document.getElementById("game2Winner2").innerHTML=nextlatestGame.winner!=null ? "Winner: " + nextlatestGame.winner.name : "No winner";
                }
            
            }
        }
    }
    catch(e){
        alert("Unknown error fetching game data");
    }
}

async function loadMatchFilter()
{
    const res = await fetch("/players");
    const data = await res.json();

    const select = document.getElementById("matchFilter");
    select.innerHTML = '<option value="">All players</option>';

    (data.pList || []).forEach(p =>
    {
        const opt=document.createElement("option");
        opt.value=p.id;
        opt.textContent = p.name;
        select.appendChild(opt);
    });
}

async function loadMatchPlayer(playerID)
{
    const res = await fetch(playerID ? `/games?player=${encodeURIComponent(playerID)}`:"/games")
    const data =await res.json();

    const recents = (data.mList ||[]).slice().sort((a,b)=> Number(b.id)-Number(a.id)).slice(0,4);

    const details = await Promise.all(
        recents.map(async (m)=>{
            const response = await fetch(`/games/${encodeURIComponent(m.id)}`);
            return response.ok? response.json():null;
        })
    );

    document.getElementById("match1Players").textContent= details[0]?details[0].name:"No game found";
    document.getElementById("match1Score").textContent= details[0]? (details[0].player1Score + " - " + details[0].player2Score):"";
    document.getElementById("match1Winner").textContent= details[0]? (details[0].winner? ("Winner: "+details[0].winner.name):"Winner: Draw"):"";

    document.getElementById("match2Players").textContent= details[1]?details[1].name:"No game found";
    document.getElementById("match2Score").textContent= details[1]? (details[1].player1Score + " - " + details[1].player2Score):"";
    document.getElementById("match2Winner").textContent= details[1]? (details[1].winner? ("Winner: "+details[1].winner.name):"Winner: Draw"):"";

    document.getElementById("match3Players").textContent= details[2]?details[2].name:"No game found";
    document.getElementById("match3Score").textContent= details[2]? (details[2].player1Score + " - " + details[2].player2Score):"";
    document.getElementById("match3Winner").textContent= details[2]? (details[2].winner? ("Winner: "+details[2].winner.name):"Winner: Draw"):"";

    document.getElementById("match4Players").textContent= details[3]?details[3].name:"No game found";
    document.getElementById("match4Score").textContent= details[3]? (details[3].player1Score + " - " + details[3].player2Score):"";
    document.getElementById("match4Winner").textContent= details[3]? (details[3].winner? ("Winner: "+details[3].winner.name):"Winner: Draw"):"";


}

document.addEventListener("DOMContentLoaded", async()=>{
    await loadMatchFilter();
    await loadMatchPlayer("");
});

document.getElementById("matchFilter").addEventListener("change",async (e)=>{
    await loadMatchPlayer(e.target.value)
});



var disconected=false;
setInterval(async() =>{
    
    try
    {
        const res = await fetch('/ping')
        if (res.ok && disconected)
        {
            disconected=false;
            document.getElementById("networkDown").hidden=true;
        }
    }
    
    catch(error)
    {
        disconected=true;
        document.getElementById("networkDown").hidden=false;
    }
},2000);