const canvasBG = first('#canvas-background');
let bg = canvasBG.getContext('2d');
bg.fillStyle = 'rgba(255,255,255,0.5)';

const starSize = 4;
const maxStar = 100;
let stars = [];


const createStar = () => {
    if(stars.length === maxStar) {
        return false;
    }
    
    let star = {
        x: Math.random() * canvasWidth,
        y: 0
    };
    
    stars.push(star);
    
    const moveStar = setInterval(function () {
        if(star.y >= canvasHeight) {
            clearInterval(moveStar);
            stars.splice(0,1);
        }
        
        star.y += 2;
        
    }, 20);
};

const draw = () => {
    if(!stars.length) {
        return false;
    }
    bg.clearRect(0,0,canvasWidth, canvasHeight);
    for(let i = 0; i <= stars.length; i++) {
        if(stars[i]) {
            bg.fillRect(stars[i].x, stars[i].y, starSize, starSize);
        } 
    }
};

const animate = () => {
    requestAnimationFrame(animate);
    
    draw();
};

setInterval(createStar, 100);
animate();
