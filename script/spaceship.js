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

const drawSpaceShip = (sx, sy, sWidth, sHeight) => {
    let shipImg = new Image;
    shipImg.addEventListener('load', function () {
        game.clearRect(0, 0, canvasWidth, canvasHeight);
        game.drawImage(shipImg, sx, sy, sWidth, sHeight, spaceShip.x, spaceShip.y, spaceShip.width, spaceShip.height);
    });
    shipImg.src = "../Game/img/spaceship.png";
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

const controlSpaceShip = ({keyCode}) => {
    keyCode === 68 && (spaceShip.move = 'right');
    keyCode === 65 && (spaceShip.move = 'left');
};

const keyUp = ({keyCode}) => {
    if(keyCode === 32) {
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

