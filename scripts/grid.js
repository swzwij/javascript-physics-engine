class Grid 
{
    constructor(cellSize) 
    {
        this.cellSize = cellSize;
        this.cells = new Map();
    }

    _getCellKey(position) 
    {
        const x = Math.floor(position.x / this.cellSize);
        const y = Math.floor(position.y / this.cellSize);
        return `${x},${y}`;
    }

    addBall(ball) 
    {
        const key = this._getCellKey(ball.position);
        if (!this.cells.has(key)) 
        {
            this.cells.set(key, new Set());
        }
        this.cells.get(key).add(ball);
    }

    updateBall(ball) 
    {
        const oldKey = ball.cellKey;
        const newKey = this._getCellKey(ball.position);
        if (oldKey !== newKey) 
        {
            if (oldKey && this.cells.has(oldKey)) 
            {
                this.cells.get(oldKey).delete(ball);
                if (this.cells.get(oldKey).size === 0) 
                {
                    this.cells.delete(oldKey);
                }
            }
            this.addBall(ball);
        }
        ball.cellKey = newKey;
    }

    getNearbyBalls(ball) 
    {
        const key = this._getCellKey(ball.position);
        const [x, y] = key.split(',').map(Number);
        const nearbyBalls = new Set();

        for (let i = x - 1; i <= x + 1; i++) 
        {
            for (let j = y - 1; j <= y + 1; j++) 
            {
                const neighborKey = `${i},${j}`;
                if (this.cells.has(neighborKey)) 
                {
                    for (const neighborBall of this.cells.get(neighborKey)) 
                    {
                        if (neighborBall !== ball) 
                        {
                            nearbyBalls.add(neighborBall);
                        }
                    }
                }
            }
        }

        return nearbyBalls;
    }
}
