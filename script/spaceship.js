const canvasGame = first('#canvas-game');
let game = canvasGame.getContext('2d');


const drawSpaceShip = ({x,y,width,height,spritePosition,move}) => {
    
    if(!isGameStarted) {
        return false;
    };
    
    game.clearRect(0, 0, canvasWidth, canvasHeight);
    game.drawImage(shipImg,spritePosition[0],spritePosition[1],spritePosition[2],spritePosition[3],x,y,width,height);
    
    hitEnemy(rockets, enemys, killEnemy);
    chekLife();

    for(let i = 0; i < rockets.length; i++) {
        drawRockets(rockets[i].x, rockets[i].y, rockets[i].width, rockets[i].height);
    }

    
 
    for(let i = 0; i < enemys.length; i++) {
        drawEnemy(enemys[i].x, enemys[i].y, enemys[i].width, enemys[i].height);
    }
  
    
    for(let i = 0; i < enemyRockets.length; i++) {
        drawEnemyRockets(enemyRockets[i].x, enemyRockets[i].y, enemyRockets[i].width, enemyRockets[i].height);
    }
 
    
    move === 'right' && drawSpaceShipMoveRight();
    move === 'left' && drawSpaceShipMoveLeft();
};

const drawRockets = (dx,dy,width,height) => {
    game.drawImage(rocketsImg, dx, dy, width, height);  
};

const drawEnemy = (dx,dy,width,height) => {
    game.drawImage(enemyImg, dx, dy, width, height); 
};

const drawEnemyRockets = (dx,dy,width,height) => {
    game.drawImage(enemyRocketImg, dx, dy, width, height);
};


const drawSpaceShipMoveRight = () => {
    if (spaceShip.move === 'notMove' || spaceShip.x > (canvasWidth - spaceShip.width)) {
        return false;
    }
    spaceShip.x+=5;
};

const drawSpaceShipMoveLeft = () => {
    if (spaceShip.move === 'notMove' || spaceShip.x < 0) {
        return false;
    }
    spaceShip.x-=5;
};

const chekLife = () => {
    const indexDeadEnemy = enemys.findIndex(curentValue => curentValue.life === false);
    const indexDeadRocket = rockets.findIndex(curentValue => curentValue.life === false);
    
    if ((indexDeadEnemy > -1) && (indexDeadRocket) > -1 ) {
        enemys.splice(indexDeadEnemy,1);
        rockets.splice(indexDeadRocket,1);
    }
};


const createEnemy = () => {
    if(enemys.length === maxEnemys || !isGameStarted) {
        return false;
    }
    
    let enemy = new Object();
    enemy.x = Math.random() * canvasWidth;
    enemy.y = 0;
    enemy.width = 30;
    enemy.height = 30;
    enemy.life = true;
    enemy.direction = 'down';
    enemy.x > canvasWidth/2 && (enemy.direction = 'left');
    enemy.x < canvasWidth/2 && (enemy.direction = 'right');
    
    enemys.push(enemy);
    
    const moveEnemy = setInterval(function(){
        
        if (!enemy.life) {
            clearInterval(moveEnemy);
            return false;
        }
        
        moveEnemyXY(enemy, canvasWidth, LINE_OF_ATTACK);
        
    }, ENEMY_SPEED);
    
//    setInterval(function(){
//        if(!enemy.life) {
//            return false;
//        }
//        
//        let enemyRocket = new Object;
//        enemyRocket['x'] = enemy.x;
//        enemyRocket['y'] = enemy.y;
//        enemyRocket['life'] = true;
//        enemyRocket['width'] = 10;
//        enemyRocket['height'] = 20;
//        
//        enemyRockets.push(enemyRocket);
//        
//        const moveEnemyRocket = setInterval(function(){
//            if(enemyRocket.y > canvasHeight) {
//                clearInterval(moveEnemyRocket);
//                enemyRocket.life = false;
//                return false;
//            }
//            
//            enemyRocket.x = moveEnemyRocketX(enemyRocket.x, (spaceShip.x + spaceShip.width/2));
//            enemyRocket.y+=3;
//            
//        }, ENEMY_ROCKETS_SPEED);
//        
//    },FIRE_ENEMY_DELAY);
};

const fire = () => {
    fireAudio.play();
    
    let rocket = new Object;
    rocket['x'] = spaceShip.x + (spaceShip.width/2); 
    rocket['y'] = spaceShip.y;
    rocket['width'] = 5;
    rocket['height'] = 10;
    rocket['life'] = true;
    
    rockets.push(rocket);
    
    const moveTorpedo = setInterval(function(){
        if(!rocket.life) {
            clearInterval(moveTorpedo);
            return false;
        }
        
        if(rocket.y <= 0) {
            clearInterval(moveTorpedo);
            rockets.splice(0,1);
        }
        
        rocket.y-=10;
    },ROCKETS_SPEED);
};


const controlSpaceShip = ({keyCode}) => {
    if(keyCode === KEY_CODES.D) {
        spaceShip.move = 'right';
        spaceShip.spritePosition = [655, 325, 215, 325];
    }
    
    if(keyCode === KEY_CODES.A) {
        spaceShip.move = 'left';
        spaceShip.spritePosition = [240, 325, 215, 325];
    }
};

const keyUp = ({keyCode}) => {
    if(keyCode === KEY_CODES.SPACE) {
        fire();
        return false;
    }
    spaceShip.move = 'notMove';
    spaceShip.spritePosition = [0, 325, 215, 325];
};

const flight = () => {
    drawSpaceShip(spaceShip);
    requestAnimationFrame(flight);
}


window.addEventListener('keydown', controlSpaceShip);
window.addEventListener('keyup', keyUp);


setInterval(createEnemy, CREATE_ENEMY_DELAY);
setInterval(() => fireEnemy(enemys), FIRE_ENEMY_DELAY);

flight();
