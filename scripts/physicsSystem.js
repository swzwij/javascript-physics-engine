const gravity = new Vector(0, 0.25);
const frictionStrength = 0.9;
const bounciness = 0.9;

const colors = ['#a587ca', '#36cedc', '#8fe968', '#ffea56', '#ffb750', '#fe797b', '#ff5e5e', '#ff6f91', '#ff6fcf', '#b47aea', '#7f7ad8', '#5f9ad1', '#4cc9f0'];

const gridCellSize = 100;
const grid = new Grid(gridCellSize);

const balls = document.querySelectorAll('.ball');
const ballObjects = Array.from(balls).map(ball => new Ball(ball, grid));

function animate() 
{
    ballObjects.forEach(ball => 
    {
        ball.move();
        const nearbyBalls = grid.getNearbyBalls(ball);
        nearbyBalls.forEach(otherBall => 
        {
            ball.checkCollision(otherBall);
        });
    });
    requestAnimationFrame(animate);
}

animate();
