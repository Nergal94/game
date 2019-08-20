const first = element => document.querySelector(element);
const all = element => document.querySelectorAll(element);

const startButton = first('#new-game');

const canvasWidth = 960;
const canvasHeight = 750;

let spaceShip = {
    life: false,
    width: 40,
    height: 70,
    x: canvasWidth / 2,
    y: 670,
    spritePosition: [0, 325, 215, 325],
    move: "notMove"
};

const KEY_CODES = {
    A: 65,
    D: 68,
    SPACE: 32
};

const TORPEDO_SPEED = 25;
const ENEMY_SPEED = 50;
const LINE_OF_ATTACK = 500;
const FIRE_ENEMY_DELAY = 3500;
const ENEMY_TORPEDO_SPEED = 25;

let torpedos = [];

let enemyTorpedos = [];

let enemys = [];

let maxEnemys = 5;

const shipImg = new Image;
shipImg.src = "img/spaceship.png";

const torpedoImg = new Image;
torpedoImg.src = 'img/torpedo.png';

const enemyImg = new Image;
enemyImg.src = 'img/enemy.png';

const enemyTorpedoImg = new Image;
enemyTorpedoImg.src = 'img/enemy-torpedo.png';

const fireAudio = new Audio('audio/fire.mp3');
const killEnemy = new Audio('audio/Kill_Enemy_Sound_Effect.mp3');


const hitEnemy = (bullets,ships, music) => {
    if(!bullets.length || !ships.length) {
        return false;
    }
    
    for(let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < ships.length; j++) {
            
            const checkYHigh = ships[j].y - bullets[i].y < ships[j].height;
            const chekYLow = ships[j].y - bullets[i].y > -ships[j].height;
            
            const chekXRight = ships[j].x - bullets[i].x < (ships[j].width);
            const chekXLeft = ships[j].x - bullets[i].x > -(ships[j].width + bullets[i].width);
    
            if(checkYHigh && chekYLow) {
                if(chekXRight && chekXLeft) {
                    ships[j].life = false;
                    bullets[i].life = false; 
                    music.play();
                }
                
            }
        }
    }
};

const moveEnemyXY = (enemy,maxX,maxY) => {
    if(enemy.directionX === 'left' && enemy.x > enemy.width) {
        enemy.x-=3;
    } else {
        enemy.directionX = 'right';
    }
    
    if(enemy.directionX === 'right' && enemy.x < (maxX - enemy.width)) {
        enemy.x+=3;
    } else {
        enemy.directionX = 'left';
    }
    
    if(enemy.directionY === 'down' && enemy.y < maxY ) {
        enemy.y+=3;
    } else {
        enemy.directionY = 'up';
    }
    
    if(enemy.directionY === 'up' && enemy.y > enemy.height ) {
        enemy.y-=3;
    } else {
        enemy.directionY = 'down';
    }
    
    return enemy;
};

const moveEnemyTorpedoX = (x, targetX) => {
    if(x < targetX) {
        x+=0.5;
    } else {
        x-=0.5;
    }
    return x;
};

const startNewGame = () => {
    spaceShip.life = true;
    startButton.style.display = 'none';
};

startButton.addEventListener('click', startNewGame);