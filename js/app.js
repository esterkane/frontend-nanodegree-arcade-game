const livesContainer = document.querySelector("#lives");
const scoreContainer = document.querySelector("#score");
const restartButtonModal = document.querySelector(".restart-game");
const modal = document.querySelector(".modal");

let lives = 5;
let score = 0; 

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.x = x;
        this.y = y;
    }


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //++++Detect when the enemy disappears from the right side of the screen
    if (this.x >= 500) {
        this.x = -100;
    }
    // Check for collision with the enemie and reset player position on collision detected
    if (this.y === player.y) {
        if (player.x >= this.x - 80 && player.x <= this.x + 80){
        resetPlayer();
        removeLife();
        
        }
    }
}

// Draw the enemy on the screen, required method for game
render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        if (player.y < 80 && player.y > 0) {
            getScore();
            resetPlayer();
        }
    }

    render() {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyCode) {
        switch (keyCode) {
            case 'left':
              if (this.x - 100 >= 0) this.x -= 100;
            break;
            case 'up':
              if (this.y - 80 >= 0) this.y -= 80;
            break;
            case 'right':
              if (this.x + 100 <= 480) this.x += 100;
            break;
            case 'down':
              if (this.y + 80 <= 440) this.y += 80;
            break;

        }   
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//const allEnemies = [];

const enemy11 = new Enemy(0, 60, 360);
const enemy12 = new Enemy(-360, 60, 120);
const enemy21 = new Enemy(-740, 140, 240);
const enemy22 = new Enemy(-340, 140, 110);
const enemy31 = new Enemy(-60, 220, 200);
//const enemy32 = new Enemy(-240, 220, 640);
let allEnemies = [enemy11, enemy12, enemy21, enemy22, enemy31];
// Place the player object in a variable called player
const player = new Player(205, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//

livesContainer.innerHTML = lives;

function removeLife () {
    lives--;
    livesContainer.innerHTML = lives;
    if(lives === 0) {
        gameOver();
    }
}

scoreContainer.innerHTML = score;

function getScore () {
    score = score + 100;
    scoreContainer.innerHTML = score;
}

// Push the Player back to the start position
function resetPlayer () {
    player.x = 205; 
    player.y = 380;
}

function resetScoreBoard () {
        lives = 5;
        livesContainer.innerHTML = lives;

        score = 0;
        scoreContainer.innerHTML = score;    
}


// Modal

restartButtonModal.addEventListener("click", function() {
	modal.classList.add("hide");
    resetScoreBoard();
});

function gameOver() {
	const popup = document.querySelector(".hide");
	popup.classList.remove("hide");
    const endScore = document.querySelector("#score-moves");
	endScore.innerHTML = score;
}


