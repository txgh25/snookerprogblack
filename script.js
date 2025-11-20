var player1Score=0;
var player2Score=0;
var balls=15;
var activePlayer=1;
var lastMove="";
/*Agbonze, E, 25/02/2025, JavaScript dictionary: How to use objects and maps for key-value pairs, Available at: https://blog.logrocket.com/javascript-dictionary/ (Accessed at: 18/11/2025)*/
/*------------------------------------------------------------------------------------------------------*/
const ballValues= {"red":1, "white":4, "yellow":2, "green":3, "brown":4, "blue":5, "pink":6, "black":7};
/*------------------------------------------------------------------------------------------------------*/
const ballOrder=["red","yellow","green","brown","blue","pink","black"]
var colourOnly=false;
activeBall="red"
function check(ball) {
    console.log(ballValues[ball]);
    if (previousRed==True)
    {
        validPot(ball)
    }
    else if (ball=="white"){
        whiteFoul()
    }
    else
    {
        foulPot(ball)
    }
    updateScore();
    closeWindow(ball+"Menu")
}

function validPot(ball){
    if (activePlayer==1)
    {
        player1Score=player1Score+ballValues[ball]
        console.log(player1Score);
    }
    else
    {
        player2Score=player2Score+ballValues[ball]
        console.log(player2Score);
    }
}

function redPot()
{
    balls=balls-1;
    if (balls !=0)
    {
        document.getElementById("variableBalls").src="red" + balls + "Only.png";
    }
    else if (balls==0)
    {
        document.getElementById("redButton").disabled=true;
        document.getElementById("variableBalls").hidden=true;
        colourOnly=true;
        activeBall="yellow";
        
    }
    
}

function whiteFoul()
{
    if (activePlayer==1)
    {
        activePlayer=2;
        lastMove="wFoul";
        player2Score=player2Score+4;

    }
    else
    {
        activePlayer=1;
        lastMove="wFoul";
        player1Score=player1Score+4;
      
    }
    updateScore()
    closeWindow("whiteMenu")
}

function redResolve(potted)
{
    
    if (potted)
    {
        if (lastMove=="rPot1" && activePlayer==1)
        {
            player2Score=player2Score+1;
            activePlayer=2;
            lastMove="rPot1F";
        }
        else if (lastMove=="rPot2" && activePlayer==2)
        {
            player1Score=player1Score+1;
            activePlayer=1;
            lastMove="rPot2F"
        }
        else if (activePlayer==1)
        {
            player1Score=player1Score+1
            activePlayer=1
            lastMove="rPot1"
        }
        else
        {
            player2Score=player2Score+1
            activePlayer=2
            lastMove="rPot2"
        }
        redPot()
    }
    else
    {
        if (lastMove=="rPot1" && activePlayer==1)
        {
            player2Score=player2Score+1;
            activePlayer=2;
            lastMove="rHit1F";
        }
        else if (lastMove=="rPot2" && activePlayer==2)
        {
            player1Score=player1Score+1;
            activePlayer=1;
            lastMove="rHit2F"
        }
        else if (activePlayer==1)
        {
            activePlayer=2
            lastMove="rHit1"
        }
        else
        {
            activePlayer=1
            lastMove="rHit2"
        }
    }
    console.log(player1Score, player2Score,lastMove)
    updateScore()
    closeWindow("redMenu")
}

function colourPot(colour)
{
    if (!colourOnly)
    {
        if (activePlayer==1)
        {
            if (lastMove=="rPot1")
            {
                player1Score=player1Score+ballValues[colour]
                lastMove=colour[0]+"Pot1"
            }
            else
            {
                player2Score=player2Score+ballValues[colour]
                activePlayer=2
                lastMove=colour[0]+"Pot1F"
            }
        }
        else
        {
            if (lastMove=="rPot2")
            {
                player2Score=player2Score+ballValues[colour]
                lastMove=colour[0]+"Pot2"
            }
            else
            {
                player1Score=player1Score+ballValues[colour]
                activePlayer=1
                lastMove=colour[0]+"Pot2F"
            }       
        }
    }
    else
    {
        if (colour==activeBall)
        {
            if (activePlayer==1)
            {
                player1Score=player1Score+ballValues[colour]
                activePlayer=1
                lastMove=colour+"Pot1"
            }
            else
            {
                player2Score=player2Score+ballValues[colour]
                lastMove=colour+"Pot2"
                activePlayer=2
            }
            potRemove(colour+"Ball")
            activeBall=ballOrder[ballOrder.indexOf(colour)+1]
            console.log(activeBall)
        }
        else
        {
            if (activePlayer==1)
            {
                activePlayer=2
                lastMove=colour[0]+"Pot1F"
                player1Score=player1Score+ballValues[colour]        
            }
            
            else
            {
                activePlayer=1
                lastMove=colour[0]+"Pot2F"
                player1Score=player1Score+ballValues[colour]
        
            }
        }
    }
    if (colourOnly && colour=='black')
    {
        document.getElementById('gameComplete').hidden=false;
        document.getElementById('game').hidden=true;
        
        document.getElementById("player1FinalUnitText").innerHTML=(player1Score)%10;
        document.getElementById("player1FinalTenText").innerHTML=Math.floor((player1Score/10)%10);
        document.getElementById("player1FinalHunText").innerHTML=Math.floor((player1Score/100)%10);

        document.getElementById("player2FinalUnitText").innerHTML=(player2Score)%10;
        document.getElementById("player2FinalTenText").innerHTML=Math.floor((player2Score/10)%10);
        document.getElementById("player2FinalHunText").innerHTML=Math.floor((player2Score/100)%10);
    }
    
    updateScore();
    closeWindow(colour+'Menu')
}

function colourHit(colour)
{
    
    if (!colourOnly)
    {
        if (activePlayer==1)
            {
                if (lastMove=="rPot1")
                {
                    lastMove=colour[0]+"Hit1"
                    activePlayer=2
                }
                else
                {
                    player2Score=player2Score+ballValues[colour]
                    activePlayer=2
                    lastMove=colour[0]+"Hit1F"
                }
            }
        else
            {
                if (lastMove=="rPot2")
                {
                    lastMove=colour[0]+"Hit2"
                    activePlayer=1
                }
                else
                {
                    player1Score=player1Score+ballValues[colour]
                    activePlayer=1
                    lastMove=colour[0]+"Hit2F"
                }       
            }
    }
    else
    {
        
        if (colour==activeBall)
        {
            
            if (activePlayer==1)
            {
                activePlayer=2;
                lastMove=colour[0]+"Hit1"
            }
            else
            {
                activePlayer=1;
                lastMove=colour[0]+"Hit2";
            }
           
        }
        else
        {
            if (activePlayer==1)
            {
                activePlayer=2
                lastMove=colour[0]+"Hit1F"
                player2Score=player2Score+ballValues[colour]
                
            }
            else
            {
                activePlayer=1
                lastMove=colour[0]+"Hit2F"
                player1Score=player1Score+ballValues[colour]
                
            }
        }
    }
    console.log(player1Score,player2Score,lastMove, activeBall)
    updateScore();
    closeWindow(colour+'Menu');

    
  
}

function potRemove(toRemove)
{
    document.getElementById(toRemove).hidden=true;
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
    document.getElementById("redButton").disabled=false;
    document.getElementById("variableBalls").hidden=false;

    document.getElementById("yellowBall").hidden=false;
    document.getElementById("greenBall").hidden=false;
    document.getElementById("brownBall").hidden=false;
    document.getElementById("blueBall").hidden=false;
    document.getElementById("pinkBall").hidden=false;
    document.getElementById("blackBall").hidden=false;
}