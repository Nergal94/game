const first = element => document.querySelector(element);
const all = element => document.querySelectorAll(element);

const canvasBackground = first('#canvas-background');

const canvasWidth = 968;
const canvasHeight = 808;
const starSize = 4;
const maxStar = 3;
let currentStar = 0;

const makeStar = () => {
    if (currentStar === maxStar) {
        return false;
    }
    currentStar++;
    let yLocation = 0;
    let ctx = canvasBackground.getContext('2d');
    ctx.fillStyle = '#fff';
    let xLocation = Math.random() * canvasWidth;
    ctx.fillRect(xLocation, 0, starSize, starSize);

    const moveStar = () => {
        if (yLocation >= canvasHeight) {
            clearInterval(letsFlight);
            currentStar--;
        }
        ctx.clearRect(xLocation - 1, 0, xLocation, canvasHeight);
        ctx.fillRect(xLocation, yLocation, starSize, starSize);
        yLocation+=starSize;
    };

    let letsFlight = setInterval(moveStar, 200);
};

setInterval(makeStar, 500);