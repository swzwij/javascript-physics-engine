class Ball 
{
    constructor(element) 
    {
        this.element = element;
        this.position = new Vector(Math.random() * (window.innerWidth - 50), Math.random() * (window.innerHeight - 50));
        this.velocity = new Vector((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);

        this.element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        this.updatePosition();
    }

    updatePosition() 
    {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
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