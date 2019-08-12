const canvasGame = first('#canvas-game');
let game = canvasGame.getContext('2d');

let spaceShip = {
    life: true,
    width: 40,
    height: 70,
    x: canvasWidth / 2,
    y: 720,
    spritePosition: [0, 325, 215, 325],
    move: "notMove"
};

const KeyCodes = {
    A: 65,
    D: 68,
    SPACE: 32
};

const TORPEDO_SPEED = 25;

let torpedos = [];

let shipImg = new Image;
shipImg.src = "img/spaceship.png";

let torpedoImg = new Image;
torpedoImg.src = 'img/torpedo.png';


const drawSpaceShip = ({x,y,width,height,spritePosition,move}) => {
    game.clearRect(0, 0, canvasWidth, canvasHeight);
    game.drawImage(shipImg,spritePosition[0],spritePosition[1],spritePosition[2],spritePosition[3],x,y,width,height);
    if (torpedos.length > 0) {
         for(let i = 0; i < torpedos.length; i++) {
            drawTorpedo(torpedos[i].x, torpedos[i].y, torpedos[i].width, torpedos[i].height);
          }
    }
    move === 'right' && drawSpaceShipMoveRight();
    move === 'left' && drawSpaceShipMoveLeft();
};

const drawTorpedo = (dx,dy,width,height) => {
        game.drawImage(torpedoImg, dx, dy, width, height);  
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

const fire = () => {
    let torpedo = new Object;
    torpedo['x'] = spaceShip.x + (spaceShip.width/2); 
    torpedo['y'] = spaceShip.y;
    torpedo['width'] = 5;
    torpedo['height'] = 10;
    
    torpedos.push(torpedo);
    
    const moveTorpedo = setInterval(function(){
        if(torpedo.y <= 0) {
            clearInterval(moveTorpedo);
            torpedos.splice(0,1);
        }
        
        torpedo.y-=10;
    },TORPEDO_SPEED);
};


const controlSpaceShip = ({keyCode}) => {
    if(keyCode === KeyCodes.D) {
        spaceShip.move = 'right';
        spaceShip.spritePosition = [655, 325, 215, 325];
    }
    
    if(keyCode === KeyCodes.A) {
        spaceShip.move = 'left';
        spaceShip.spritePosition = [240, 325, 215, 325];
    }
};

const keyUp = ({keyCode}) => {
    if(keyCode === KeyCodes.SPACE) {
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

flight();
