var gamePattern = [];
var level = 0;
var buttonColours = ["blue", "red", "yellow", "green"];
var started = false;
var userClickedPattern = [];


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    makeSounds(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// 8 level
function checkAnswer(currentLevel) {
    var answer = false;


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        userClickedPattern = [];
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000)
        started = false;
        level = 0;
        gamePattern = [];
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    makeSounds(randomChosenColour);
    $("#level-title").text("level " + level);
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed")
    setTimeout(function () {
        $(currentColour).removeClass("pressed");
    }, 100);
}

function makeSounds(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    var id = "#" + name;
    animatePress(id);
    audio.play();
}

$(document).keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    }

});