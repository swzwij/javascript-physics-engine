const gravity = new Vector(0, 0.25);
const frictionStrength = 0.9;
const dragCoefficient = 0.00;
const bounciness = 0.95;

const colors = ['#a587ca', '#36cedc', '#8fe968', '#ffea56', '#ffb750', '#fe797b', '#ff5e5e', '#ff6f91', '#ff6fcf', '#b47aea', '#7f7ad8', '#5f9ad1', '#4cc9f0'];

let topVelocity = 0;

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