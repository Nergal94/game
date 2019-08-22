const canvasGame = first('#canvas-game');
let game = canvasGame.getContext('2d');

const drawItem = ({sprite, x, y, width, height}) => {
    game.drawImage(sprite, x, y, width, height);
};

const drawItems = items => items.map(item => drawItem(item));

const drawExplosion = ({sprite, x, y, width, height,spriteIndex},index) => {
    if(spriteIndex === (spriteExplosionColection.length -1)) {
        return false;
    }
    const draw = ({sx,sy,swidth,sheight}) => {
        game.drawImage(sprite, sx, sy, swidth, sheight, x, y, width, height);
    };

    draw(spriteExplosionColection[spriteIndex]);

    explosions[index].spriteIndex++;
};

const drawExplosions = items => items.map((item,index) => drawExplosion(item,index));

const drawSpaceShip = ({x,y,width,height,spritePosition,move}) => {
    
    if(!isGameStarted) {
        return false;
    };
    
    game.clearRect(0, 0, canvasWidth, canvasHeight);
    game.drawImage(shipImg,spritePosition[0],spritePosition[1],spritePosition[2],spritePosition[3],x,y,width,height);
    
    hitEnemy(rockets, enemys, killEnemy);
    chekLife();

    drawItems(enemys);
    drawItems(rockets);
    drawItems(enemyRockets);
    drawExplosions(explosions);
    
    move === 'right' && moveSpaceShipRight();
    move === 'left' && moveSpaceShipLeft();
};


const moveSpaceShipRight = () => {
    if (spaceShip.move === 'notMove' || spaceShip.x > (canvasWidth - spaceShip.width)) {
        return false;
    }
    spaceShip.x+=5;
};

const moveSpaceShipLeft = () => {
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
    
    let enemy = {
        sprite: enemyImg,
        x: Math.random() * canvasWidth,
        y: 0,
        width: 30,
        height: 30,
        life: true,
        directionY: 'down'
    };
    
    enemy.x > canvasWidth/2 && (enemy.directionX = 'left');
    enemy.x < canvasWidth/2 && (enemy.directionX = 'right');
    
    enemys.push(enemy);
    
    const moveEnemy = setInterval(function(){
        
        if (!enemy.life) {
            clearInterval(moveEnemy);
            return false;
        }
        
        moveEnemyXY(enemy, canvasWidth, LINE_OF_ATTACK);
        
    }, ENEMY_SPEED);
};

const fire = () => {
    fireAudio.play();
    
    let rocket = {
        sprite: rocketsImg,
        x: spaceShip.x + (spaceShip.width/2),
        y: spaceShip.y,
        width: 5,
        height: 10,
        life:true
    }
    
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
};


window.addEventListener('keydown', controlSpaceShip);
window.addEventListener('keyup', keyUp);


setInterval(createEnemy, CREATE_ENEMY_DELAY);
setInterval(() => fireEnemy(enemys), FIRE_ENEMY_DELAY);

flight();
