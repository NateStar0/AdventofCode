
module.exports = 
{
    run(data)
    {
        data = data.replace(/ /g, "").split("\n").map(n => n.split("->").map(m => m.split(",").map(Number)));

        class point
        {
            constructor (_x = 0, _y = 0)
            {
                this.x = _x;
                this.y = _y;
            }
        }

        let part1 = (data) =>
        {
            let lowest = 0;

            let contains = new Set();

            data.forEach(e =>
            {
                console.log(e)
                for(let i = 1; i < e.length; i++)
                {
                    let minX = Math.min(e[i - 1][0], e[i][0]);
                    let maxX = Math.max(e[i - 1][0], e[i][0]);
                    let minY = Math.min(e[i - 1][1], e[i][1]);
                    let maxY = Math.max(e[i - 1][1], e[i][1]);

                    for (let y = minY; y <= maxY; y++) 
                    {
                        for (let x = minX; x <= maxX; x++) 
                        {
                            if(y > lowest) lowest = y;

                            contains.add(`${x},${y}`);
                        }
                    }
                }
            });

            let sum = 0;
            let finished = false;

            let currentSand = new point(500, 0);

            while (!finished) 
            {
                while (!finished) 
                {
                    if (contains.has(`${currentSand.x},${currentSand.y + 1}`)) 
                    {
                        if (!contains.has(`${currentSand.x - 1},${currentSand.y + 1}`)) 
                        {
                            currentSand.x--;
                            currentSand.y++;
                        } 
                        else 
                        if (!contains.has(`${currentSand.x + 1},${currentSand.y + 1}`)) 
                        {
                            currentSand.x++;
                            currentSand.y++;
                        } 
                        else 
                        {
                            contains.add(`${currentSand.x},${currentSand.y}`);
                            break;
                        }
                    } 
                    else 
                    {
                        currentSand.y++;
                    }
        
                    if (currentSand.y > lowest) finished = true;
                }

                currentSand = new point(500, 0);
                sum++;
            }


            return sum - 1// grid);
        }

        let part2 = (data) =>
        {
            let lowest = 0;

            let contains = new Set();

            data.forEach(e =>
            {
                console.log(e)
                for(let i = 1; i < e.length; i++)
                {
                    let minX = Math.min(e[i - 1][0], e[i][0]);
                    let maxX = Math.max(e[i - 1][0], e[i][0]);
                    let minY = Math.min(e[i - 1][1], e[i][1]);
                    let maxY = Math.max(e[i - 1][1], e[i][1]);

                    for (let y = minY; y <= maxY; y++) 
                    {
                        for (let x = minX; x <= maxX; x++) 
                        {
                            if(y > lowest) lowest = y;

                            contains.add(`${x},${y}`);
                        }
                    }
                }
            });

            let sum = 0;

            let currentSand = new point(500, 0);

            while (!contains.has('500,0')) 
            {
                while (true) 
                {
                    if (contains.has(`${currentSand.x},${currentSand.y + 1}`)) 
                    {
                        if (!contains.has(`${currentSand.x - 1},${currentSand.y + 1}`)) 
                        {
                            currentSand.x--;
                            currentSand.y++;
                        } else 
                        if (!contains.has(`${currentSand.x + 1},${currentSand.y + 1}`)) 
                        {
                            currentSand.x++;
                            currentSand.y++;
                        } 
                        else 
                        {
                            contains.add(`${currentSand.x},${currentSand.y}`);
                            break;
                        }
                    } 
                    else 
                    {
                        currentSand.y++;
                    }
        
                    if (currentSand.y == lowest + 1) 
                    {
                        contains.add(`${currentSand.x},${currentSand.y}`);
                        break;
                    }
                }

                currentSand = new point(500, 0);

                sum++;
            }


            return sum // grid);
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
