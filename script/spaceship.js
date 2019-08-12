const canvasGame = first('#canvas-game');
let game = canvasGame.getContext('2d');

let spaceShip = {
    life: true,
    width: 40,
    height: 70,
    x: canvasWidth / 2,
    y: 720,
    move: "notMove"
};

let torpedos = [];


const drawSpaceShip = (sx, sy, sWidth, sHeight) => {
    let shipImg = new Image;
    shipImg.addEventListener('load', function () {
        game.clearRect(0, 0, canvasWidth, canvasHeight);
        game.drawImage(shipImg, sx, sy, sWidth, sHeight, spaceShip.x, spaceShip.y, spaceShip.width, spaceShip.height);
        if (torpedos.length > 0) {
            for(let i = 0; i < torpedos.length; i++) {
                drawTorpedo(torpedos[i].x, torpedos[i].y, torpedos[i].width, torpedos[i].height);
            }
        }
    });
    shipImg.src = "img/spaceship.png";
};

const drawTorpedo = (dx,dy,width,height) => {
    let torpedoImg = new Image;
    torpedoImg.addEventListener('load', function () {
        game.drawImage(torpedoImg, dx, dy, width, height);
    });
    torpedoImg.src = 'img/torpedo.png';
};

const drawSpaceShipNotMove = () => {
    drawSpaceShip(0, 325, 215, 325);
};

const drawSpaceShipMoveRight = () => {
    drawSpaceShip(655, 325, 215, 325);

    if (spaceShip.move === 'notMove' || spaceShip.x > (canvasWidth - spaceShip.width)) {
        return false;
    }
    spaceShip.x+=5;
};

const drawSpaceShipMoveLeft = () => {
    drawSpaceShip(240, 325, 215, 325);

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
            console.log(torpedos.length);
        }
        
        torpedo.y-=10;
    },50);
};


const controlSpaceShip = ({keyCode}) => {
    keyCode === 68 && (spaceShip.move = 'right');
    keyCode === 65 && (spaceShip.move = 'left');
};

const keyUp = ({keyCode}) => {
    if(keyCode === 32) {
        fire();
        return false;
    }
    spaceShip.move = 'notMove';
    game.clearRect(0, 0, canvasWidth, canvasHeight);
};

const flight = () => {
    spaceShip.move === 'notMove' && drawSpaceShipNotMove();
    spaceShip.move === 'right' && drawSpaceShipMoveRight();
    spaceShip.move === 'left' && drawSpaceShipMoveLeft();

    requestAnimationFrame(flight);
}


window.addEventListener('keydown', controlSpaceShip);
window.addEventListener('keyup', keyUp);
flight();

