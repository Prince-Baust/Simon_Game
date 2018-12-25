var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

startGame();

//Any Button Click Event Listener
$(".btn").on("click", function () {
    //Storing info about user clicked button

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //Checking user pattern with game pattern
    checkAnswer(userClickedPattern.length-1);
});


//User pattern & Game pattern checker
function checkAnswer(currentLevel) {
    //Checking if the pattern is same or not

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        //Checking whether the pattern is completed or not.  If completed start next level

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else{
        //Game Over

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $(document.body).addClass("game-over");
        setTimeout(function () {
            $(document.body).removeClass("game-over");
        }, 200);
        //Restart the game

        startOver();
    }
}


// Game Sequence Generator
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Game pattern showing using animation
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//Animation to play when clicked a button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Restart method
function startOver() {
    gamePattern = [];
    level = 0;
    $("h1").text("Game Over! Press any key to Restart");
    startGame();

}

function startGame() {
    $(document).on("keypress", function () {
        if (level === 0)
            nextSequence();
    })
}