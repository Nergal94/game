const canvasGame = first('#canvas-game');
let game = canvasGame.getContext('2d');


const drawSpaceShip = ({x,y,width,height,spritePosition,move}) => {
    
    if(!spaceShip.life) {
        return false;
    };
    
    game.clearRect(0, 0, canvasWidth, canvasHeight);
    game.drawImage(shipImg,spritePosition[0],spritePosition[1],spritePosition[2],spritePosition[3],x,y,width,height);
    
    hitEnemy(torpedos, enemys, killEnemy);
    chekLife();
    
    if (torpedos.length > 0) {
         for(let i = 0; i < torpedos.length; i++) {
            drawTorpedo(torpedos[i].x, torpedos[i].y, torpedos[i].width, torpedos[i].height);
          }
    }
    
    if (enemys.length > 0) {
        for(let i = 0; i < enemys.length; i++) {
            drawEnemy(enemys[i].x, enemys[i].y, enemys[i].width, enemys[i].height);
        }
    }
    
    if (enemyTorpedos.length > 0) {
        for(let i = 0; i < enemyTorpedos.length; i++) {
            drawEnemyTorpedos(enemyTorpedos[i].x, enemyTorpedos[i].y, enemyTorpedos[i].width, enemyTorpedos[i].height);
        }
    }
    
    move === 'right' && drawSpaceShipMoveRight();
    move === 'left' && drawSpaceShipMoveLeft();
};

const drawTorpedo = (dx,dy,width,height) => {
    game.drawImage(torpedoImg, dx, dy, width, height);  
};

const drawEnemy = (dx,dy,width,height) => {
    game.drawImage(enemyImg, dx, dy, width, height); 
};

const drawEnemyTorpedos = (dx,dy,width,height) => {
    game.drawImage(enemyTorpedoImg, dx, dy, width, height);
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
    const indexDeadTorpedo = torpedos.findIndex(curentValue => curentValue.life === false);
    
    if ((indexDeadEnemy > -1) && (indexDeadTorpedo) > -1 ) {
        enemys.splice(indexDeadEnemy,1);
        torpedos.splice(indexDeadTorpedo,1);
    }
};


const createEnemy = () => {
    if(enemys.length === maxEnemys || !spaceShip.life) {
        return false;
    }
    
    let enemy = new Object;
    enemy['x'] = Math.random() * canvasWidth;
    enemy['y'] = 0;
    enemy['width'] = 30;
    enemy['height'] = 30;
    enemy['life'] = true;
    enemy['directionY'] = 'down';
    enemy.x > canvasWidth/2 && (enemy['direction'] = 'left');
    enemy.x < canvasWidth/2 && (enemy['direction'] = 'right');
    
    enemys.push(enemy);
    
    const moveEnemy = setInterval(function(){
        
        if (!enemy.life) {
            clearInterval(moveEnemy);
            return false;
        }
        
        enemy = moveEnemyXY(enemy, canvasWidth, LINE_OF_ATTACK);
        
    }, ENEMY_SPEED);
    
    setInterval(function(){
        if(!enemy.life) {
            return false;
        }
        
        let enemyTorpedo = new Object;
        enemyTorpedo['x'] = enemy.x;
        enemyTorpedo['y'] = enemy.y;
        enemyTorpedo['life'] = true;
        enemyTorpedo['width'] = 10;
        enemyTorpedo['height'] = 20;
        
        enemyTorpedos.push(enemyTorpedo);
        
        const moveEnemyTorpedo = setInterval(function(){
            if(enemyTorpedo.y > canvasHeight) {
                clearInterval(moveEnemyTorpedo);
                enemyTorpedo.life = false;
                return false;
            }
            
            enemyTorpedo.x = moveEnemyTorpedoX(enemyTorpedo.x, (spaceShip.x + spaceShip.width/2));
            enemyTorpedo.y+=3;
            
        }, ENEMY_TORPEDO_SPEED);
        
    },FIRE_ENEMY_DELAY);
};

const fire = () => {
    fireAudio.play();
    
    let torpedo = new Object;
    torpedo['x'] = spaceShip.x + (spaceShip.width/2); 
    torpedo['y'] = spaceShip.y;
    torpedo['width'] = 5;
    torpedo['height'] = 10;
    torpedo['life'] = true;
    
    torpedos.push(torpedo);
    
    const moveTorpedo = setInterval(function(){
        if(!torpedo.life) {
            clearInterval(moveTorpedo);
            return false;
        }
        
        if(torpedo.y <= 0) {
            clearInterval(moveTorpedo);
            torpedos.splice(0,1);
        }
        
        torpedo.y-=10;
    },TORPEDO_SPEED);
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


setTimeout(function(){
    setInterval(createEnemy, 500);
},5000);


flight();
