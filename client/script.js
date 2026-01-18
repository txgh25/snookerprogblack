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
                    updateClipboard();
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
        document.getElementById("clipboardHolder").style.zIndex="10";
        document.getElementById("clipboardHolder").classList.toggle("showClipboard",open);
        updateClipboard();
    }
    
});

async function updateClipboard()
{
    try{
        let response = await fetch("/players");
        let data = await response.json();

        const player = data[document.getElementById("player1FinalText").textContent.toLowerCase().trim()];
        if (player==undefined)
        {
            document.getElementById("player1ClipName").innerHTML=document.getElementById("player1FinalText").textContent;
            document.getElementById("player1ClipGames").innerHTML="Games played: 1";
            if (activePlayer==1)
                document.getElementById("player1ClipWins").innerHTML="Games won: 1";
            else
                document.getElementById("player1ClipWins").innerHTML="Games won: 0";
            document.getElementById("player1ClipAverage").innerHTML="Average points: " + player1Score;
        
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
}

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

