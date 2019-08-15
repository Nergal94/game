const first = element => document.querySelector(element);
const all = element => document.querySelectorAll(element);

const canvasWidth = 960;
const canvasHeight = 800;

let spaceShip = {
    life: true,
    width: 40,
    height: 70,
    x: canvasWidth / 2,
    y: 720,
    spritePosition: [0, 325, 215, 325],
    move: "notMove"
};

const KEY_CODES = {
    A: 65,
    D: 68,
    SPACE: 32
};

const TORPEDO_SPEED = 25;
const ENEMY_SPEED = 200;

let torpedos = [];

let enemys = [];

const maxEnemys = 1;

const shipImg = new Image;
shipImg.src = "img/spaceship.png";

const torpedoImg = new Image;
torpedoImg.src = 'img/torpedo.png';

const enemyImg = new Image;
enemyImg.src = 'img/enemy.png';

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
            
            const chekXRight = ships[j].x - bullets[i].x < ships[j].width;
            const chekXLeft = ships[j].x - bullets[i].x > -ships[j].width
    
            if(checkYHigh && chekYLow) {
                if(chekXRight && chekXLeft) {
                    ships[j].life = false;
                    bullets[i].life = false; 
                    music.play();
                }
                
            }
        }
    }
}