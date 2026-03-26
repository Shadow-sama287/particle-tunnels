const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

class Circle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.tTL = 700;

        this.draw = () => {
            this.draw = () => {
                c.save();
                c.globalAlpha = this.tTL / 700; // Fades out over time
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
                c.closePath();
                c.restore();
            }
        }

        this.update = () => {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.draw();
            this.tTL--
        }
    }
}

let particles;
const particlesCount = 50;
function init() {
    particles = [];
    const tunnelRadius = 30;


    for (let i = 0; i < particlesCount; i++) {
        const radian = (Math.PI * 2) / particlesCount;
        // const x = canvas.width / 2 +  * tunnelRadius;
        // const y = canvas.height / 2 +  * tunnelRadius;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        particles.push(new Circle(x, y, 5, 'white', { x: Math.cos(radian * i), y: Math.sin(radian * i) }));
    }
}

function generateRing() {
    setTimeout(generateRing, 250);
    for (let i = 0; i < particlesCount; i++) {
        const radian = (Math.PI * 2) / particlesCount;
        const x = mouse.x;
        const y = mouse.y;
        particles.push(new Circle(x, y, 5, 'white', { x: Math.cos(radian * i), y: Math.sin(radian * i) }));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // c.globalCompositeOperation = 'lighter';
    particles.forEach((particle, i) => {
        if (particle.tTL < 0) {
            particles.splice(i, 1);
        } else {
            particle.update();
        }
    });


    c.fillText('dattebayo', mouse.x, mouse.y)
    //call the object.update() method
}

init();
animate();
generateRing();