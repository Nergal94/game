const first = element => document.querySelector(element);
const all = element => document.querySelectorAll(element);

const startButton = first('#new-game');
const gameOver = first('.game-over');
const scoreText = first('.score');
const showScrore = first('.show-score');
const showScoreSpan = first('.span-score');

const canvasWidth = 960;
const canvasHeight = 750;
let isGameStarted = false;
let score = 0;

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

const ROCKETS_SPEED = 25;
const ENEMY_SPEED = 50;
const LINE_OF_ATTACK = 400;
const FIRE_ENEMY_DELAY = 3000;
const ENEMY_ROCKETS_SPEED = 25;
const CREATE_ENEMY_DELAY = 500;

let rockets = [];

let enemyRockets = [];

let enemys = [];

let maxEnemys = 5;

const shipImg = new Image();
shipImg.src = "img/spaceship.png";

const rocketsImg = new Image();
rocketsImg.src = 'img/torpedo.png';

const enemyImg = new Image();
enemyImg.src = 'img/enemy.png';

const enemyRocketImg = new Image();
enemyRocketImg.src = 'img/enemy-torpedo.png';

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
            
            const chekXRight = ships[j].x - bullets[i].x < (bullets[i].width);
            const chekXLeft = ships[j].x - bullets[i].x > -(ships[j].width + bullets[i].width);
    
            if(checkYHigh && chekYLow) {
                if(chekXRight && chekXLeft) {
                    ships[j].life = false;
                    bullets[i].life = false; 
                    music.play();
                    score+=50;
                    showScoreSpan.innerHTML = score;
                }
                
            }
        }
    }
};

const moveEnemyX = (enemy, max, dx = 3) => {
    const isCanMoveLeft = enemy.directionX === 'left' && enemy.x > enemy.width;
    const isCanMoveRight = !isCanMoveLeft && enemy.x < (max - enemy.width);
    const isCanMove = isCanMoveLeft || isCanMoveRight;

    if (isCanMove) {
        dx = isCanMoveLeft ? -dx : dx;
        enemy.x += dx;
    }

    enemy.directionX = isCanMoveRight ? 'right' : 'left';
};


const moveEnemyY = (enemy, max, dx = 3) => {
    const isCanMoveDown = enemy.directionY === 'down' && enemy.y < max;
    const isCanMoveUp = !isCanMoveDown && enemy.y > enemy.height ;
    const isCanMove = isCanMoveDown || isCanMoveUp;

    if (isCanMove) {
        dx = isCanMoveUp ? -dx : dx;
        enemy.y += dx;
    }

    enemy.directionY = isCanMoveUp ? 'up' : 'down';
};

const moveEnemyXY = (enemy, maxX, maxY) => {
    moveEnemyX(enemy, maxX);
    moveEnemyY(enemy, maxY);
};

const moveEnemyRocketX = (rocket, targetX) => {
    if(rocket.x < targetX) {
        rocket.x+=1;
    } else {
        rocket.x-=1;
    }
};

const gameIsOver = () => {
    isGameStarted = false;
    scoreText.innerHTML = score;
    gameOver.style.display = 'block';
    startButton.style.display = 'block';
    showScrore.style.display = 'none';
};

const chekHit = (rocket, ship) => {
    const isHit = () => {
        const checkXRight = rocket.x - ship.x < ship.width;
        const checkXLeft = rocket.x - ship.x > -rocket.width;

        if(checkXLeft && checkXRight) {
            ship.life = false;
            gameIsOver();
        }
    };

    rocket.y >= ship.y && isHit();
};

const fireEnemy = allEnemys => {
    let indexOfFireEnemy = Math.ceil((Math.random() * allEnemys.length));
    
    if(indexOfFireEnemy === allEnemys.length) {
        indexOfFireEnemy--;
    }
    
    if(!isGameStarted || allEnemys.length === 0) {
        return false;
    }
        
    let enemyRocket = new Object();
    
    enemyRocket.x = allEnemys[indexOfFireEnemy].x;
    enemyRocket.y = allEnemys[indexOfFireEnemy].y;
    enemyRocket.life = true;
    enemyRocket.width = 10;
    enemyRocket.height = 20;
        
    enemyRockets.push(enemyRocket);
    
    const moveEnemyRocket = setInterval(function(){
        if(enemyRocket.y > canvasHeight) {
            clearInterval(moveEnemyRocket);
            enemyRocket.life = false;
            enemyRockets.splice(0,1);
            return false;
        }

        chekHit(enemyRocket, spaceShip);
            
        moveEnemyRocketX(enemyRocket, (spaceShip.x + spaceShip.width/2));
        enemyRocket.y+=3;
            
    }, ENEMY_ROCKETS_SPEED);
};

const startNewGame = () => {
    isGameStarted = true;
    startButton.style.display = 'none';
    gameOver.style.display = 'none';
    showScrore.style.display = 'block';
    rockets = [];
    enemyRockets = [];
    enemys = [];
    maxEnemys = 5;
    score = 0;
    showScoreSpan.innerHTML = score;
};

startButton.addEventListener('click', startNewGame);