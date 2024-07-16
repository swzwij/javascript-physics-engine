const gravity = new Vector(0, 0.25);
const frictionStrength = 0.9;
const dragCoefficient = 0.00;
const bounciness = 0.95;

let topVelocity = 0;

class Ball {
    constructor(element) 
    {
        this.element = element;
        this.position = new Vector(Math.random() * (window.innerWidth - 50), Math.random() * (window.innerHeight - 50));
        this.velocity = new Vector((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);

        this.updatePosition();
    }

    updatePosition() 
    {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }

    updateColor()
    {
        const middleX = window.innerWidth / 2;
        const middleY = window.innerHeight / 2;

        const distanceToMiddle = Math.sqrt(Math.pow(this.position.x - middleX, 2) + Math.pow(this.position.y - middleY, 2));

        if (distanceToMiddle < 150) {
            this.element.style.backgroundColor = 'lightblue';
        } else if (distanceToMiddle < 300) {
            this.element.style.backgroundColor = 'blue';
        } else {
            this.element.style.backgroundColor = 'darkblue';
        }
    }

    move() 
    {
        if (this.velocity.magnitude() < 0.1) {
            this.velocity = new Vector(0, 0);
        }

        this.velocity = this.velocity.add(gravity);

        const drag = this.velocity.multiply(-dragCoefficient * this.velocity.magnitude());
        this.velocity = this.velocity.add(drag);

        this.position = this.position.add(this.velocity);

        if (this.position.x < 0 || this.position.x > window.innerWidth - this.element.clientWidth) 
        {
            this.velocity.x *= -bounciness;
            this.position.x = Math.max(0, Math.min(this.position.x, window.innerWidth - this.element.clientWidth));
        }

        if (this.position.y < 0 || this.position.y > window.innerHeight - this.element.clientHeight) 
        {
            this.velocity.y *= -bounciness;
            this.position.y = Math.max(0, Math.min(this.position.y, window.innerHeight - this.element.clientHeight));
        }

        this.updatePosition();
        this.updateColor();
    }

    checkCollision(otherBall) 
    {
        const distance = this.position.distanceTo(otherBall.position);
        const minDistance = this.element.clientWidth;

        if (distance < minDistance) 
        {
            const angle = Math.atan2(otherBall.position.y - this.position.y, otherBall.position.x - this.position.x);
            const target = this.position.add(new Vector(Math.cos(angle) * minDistance, Math.sin(angle) * minDistance));
            const difference = target.subtract(otherBall.position);

            const totalVelocity = this.velocity.add(otherBall.velocity);
            const averageVelocity = totalVelocity.multiply(0.5);

            this.velocity = averageVelocity.add(this.velocity.subtract(averageVelocity).multiply(bounciness));
            otherBall.velocity = averageVelocity.add(otherBall.velocity.subtract(averageVelocity).multiply(bounciness));

            const accelerationX = difference.multiply(0.05);
            this.velocity = this.velocity.subtract(accelerationX);
            otherBall.velocity = otherBall.velocity.add(accelerationX);
        }
    }
}

const balls = document.querySelectorAll('.ball');
const ballObjects = Array.from(balls).map(ball => new Ball(ball));

function animate() 
{
    ballObjects.forEach(ball => ball.move());

    for (let i = 0; i < ballObjects.length; i++) 
    {
        for (let j = i + 1; j < ballObjects.length; j++) 
        {
            ballObjects[i].checkCollision(ballObjects[j]);
        }
    }

    requestAnimationFrame(animate);
}

animate();

// DeviceMotionEvent handling
window.addEventListener('devicemotion', function (event) 
{
    const acceleration = event.accelerationIncludingGravity;
    const accelVector = new Vector(-acceleration.x || 0, acceleration.y || 0);

    ballObjects.forEach(ball => 
    {
        ball.velocity = ball.velocity.add(accelVector.multiply(0.1));
    });
});

// Desktop shake simulation
// let lastMouseX = null;
// let lastMouseY = null;

// window.addEventListener('mousemove', function (event) 
// {
//     if (lastMouseX && lastMouseY) 
//     {
//         const deltaX = event.clientX - lastMouseX;
//         const deltaY = event.clientY - lastMouseY;

//         ballObjects.forEach(ball => 
//         {
//             ball.velocity = ball.velocity.add(new Vector(deltaX * 0.05, deltaY * 0.05));
//         });
//     }

//     lastMouseX = event.clientX;
//     lastMouseY = event.clientY;
// });
