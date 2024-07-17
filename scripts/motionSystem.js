const gravityText = document.querySelector('.gravity');

function isMobileDevice() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

window.addEventListener('devicemotion', function (event) 
{
    const acceleration = event.accelerationIncludingGravity;
    const accelVector = new Vector(-acceleration.x || 0, acceleration.y || 0);

    gravity.x = accelVector.x * 0.05;
    gravity.y = accelVector.y * 0.05;

    gravityText.textContent = `${gravity.x.toFixed(2)}, ${gravity.y.toFixed(2)}`;

    if (!window.DeviceMotionEvent || !isMobileDevice()) 
    {
        gravity.x = 0;
        gravity.y = 0.25;
        gravityText.textContent = ``;
    }

    ballObjects.forEach(ball => 
    {
        ball.velocity = ball.velocity.add(gravity);
    });
});