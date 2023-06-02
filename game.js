

//Colors
var colors = ["red", "blue", "yellow", "green"];
var buttonColors = new Map();
colors.forEach((color) => buttonColors.set(color, new Audio(`sounds\\${color}.mp3`)));

//Game State
var level = 0;
var gameStarted = false;
var userClickedPattern = [];
var gamePattern = [];
var animating = false;

//Events 
//Start the game if its not already started
$(this).on("keydown", (event) => {
    if(!gameStarted && event.key === "a"){
        gameStarted = true;
        $("h1").text("Level 0");
        newSequence();}
})

//Detects a users button press
$(".btn").on("mousedown", (ev) => {
    var userChosenColor = ev.target.id;
    onUserPress(userChosenColor);
   
})

//Function called when user presses a button
function onUserPress(currentColor)
{   
    if(!animating){
        buttonColors.get(currentColor).play();

        userClickedPattern.push(currentColor);

        const selector = $("#" + currentColor);
        selector.addClass("pressed");

        setTimeout(() => {
            selector.removeClass("pressed");
            checkAnswer(userClickedPattern.length);
        }, 100);
    }

    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]){
        if(gamePattern.length === currentLevel){
            console.log("Completed Series");
            userClickedPattern = [];
            newSequence();
        } else console.log("Completed Step In Series");
    } else gameOver();
}

//Function to call on game over
function gameOver(){
    $("#level-title").text("GAME OVER");
    let gameOverSound = new Audio("sounds\\wrong.mp3");
    gameOverSound.play();
    
    setTimeout(() => {
        gameStarted = false;
        level = 0;
        $("#level-title").text("Press A Key to Start");
        gamePattern = [];
        userClickedPattern = [];
    }, 1000);
}


function animateSequence(seqTime = 500){
    animating = true;
    for(let i = 0; i < gamePattern.length; i++)
    {
        setTimeout(() => { 
            buttonColors.get(gamePattern[i]).play();
            let newButton = $("#" + gamePattern[i]);
            newButton.fadeOut(seqTime / 2, () => {newButton.fadeIn(seqTime / 2, () => {if(i + 1 === gamePattern.length) {animating = false;}})});

        }, seqTime * (i + 1));
        
    }
    
}

function newSequence(){
    level++;
    $("h1").text("Level " + level);
    //Pick a random color for the next color in the sequence
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    //Play the corresponding button sound
    console.log(userClickedPattern);
    console.log(gamePattern);
    animateSequence();
    
    
   
    
    //Play button flash animation
    
}