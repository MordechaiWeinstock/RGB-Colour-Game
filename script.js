// generate and store in array x '(amount)' of colours 
var numOfColours = 6
var colours;
// setting the colour to play to
var pickedColour;
// query selectors
var squares = document.querySelectorAll(".square");
var colourDisplay = document.querySelector("h1 span");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetColours = document.querySelector("#resetColours");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setUpModeButtons();
    setUpResetButton();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    // functionality for 'easy' and 'hard' mode
    for(i=0; i<modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            // design buttons display
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // set squares amount
            this.textContent === "easy" ? numOfColours = 3: numOfColours = 6;
            // reset the game
            reset();
        });
    }
}

function setUpResetButton() {
    // functionality to reset and 'play again'
    resetColours.addEventListener("click", function() {
    reset();
    });
}

function setUpSquares() {
    for (i=0; i<squares.length; i++) {
        // game functionality
        squares[i].addEventListener("click", function() {
            // compare clicked colour to picked colour
            if(this.style.backgroundColor === pickedColour) {
                // display message
                messageDisplay.textContent = "correct!";
                // display all squares and heading background with winning colour
                changeColours();
                h1.style.backgroundColor = pickedColour;
                // change button wording
                resetColours.textContent = "play again?"
            } else {
                // disappear wrong selected square and display message
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "try again..."
            };
        });
    };
}
// to reset the game
function reset() {
    // generate an array storing x '(amount)' of colours
    colours = generateRandomColours(numOfColours);
    // setting the colour to play to
    pickedColour = colourPicker();
    // display the 'playing to' colour on screen
    colourDisplay.textContent = pickedColour;
    // display the squares colours and hide the unused squares if in 'easy' mode
    for (i=0; i<squares.length; i++) {
        if (colours[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        } else {
            squares[i].style.display = "none";
        }
    };
    //reset display message, heading background and button wording
    messageDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
    resetColours.textContent = "new colours"
}
// for all squares to be the same colour
function changeColours() {
    for (i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = pickedColour;
    };
}
// to pick a 'playing to' colour
function colourPicker() {
    var random = Math.floor(Math.random() * colours.length);
    return colours[random]
}
// to generate random colours
function generateRandomColours(num) {
    var arr = [];
    for(i=0; i<num; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        arr.push("rgb(" + r + ", " + g + ", " + b + ")")
    }
    return arr;
}
