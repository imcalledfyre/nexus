/*--------------------
Vars
--------------------*/
const opt = {
    numStars: 100,
    mouseRadius: 30,
    starMinSize: 1,
    starMaxSize: 3,
    starSpeed: 2,
    backgroundColor: 'purple',
    starColor: 'hsla(300, 100%, 80%, 1)' // Pinkish-purple
};

const stars = [];
let mouse = { x: undefined, y: undefined };
let canvas, ctx;

/*--------------------
Star Class
--------------------*/
class Star {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * (opt.starMaxSize - opt.starMinSize) + opt.starMinSize;
        this.speedX = (Math.random() - 0.5) * opt.starSpeed;
        this.speedY = (Math.random() - 0.5) * opt.starSpeed;
    }

    update() {
        // Move star
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < opt.mouseRadius) {
            this.x -= dx / distance * 2; // Move away on x-axis
            this.y -= dy / distance * 2; // Move away on y-axis
        }
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = opt.starColor;
        ctx.fill();
    }
}

/*--------------------
Setup
--------------------*/
function setup() {
    canvas = document.getElementById('starCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    for (let i = 0; i < opt.numStars; i++) {
        stars.push(new Star());
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    draw();
}

/*--------------------
Draw
--------------------*/
function draw() {
    ctx.fillStyle = opt.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        star.update();
        star.render();
    }

    requestAnimationFrame(draw);
}

/*--------------------
Resize
--------------------*/
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
