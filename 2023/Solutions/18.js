
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            data = data.split("\n").map(line =>
                {
                    let [direction, distance, colour] = line.split(" ");

                    return [
                        direction,
                        distance * 1,
                        parseInt(colour.replace("(#", "").replace(")", ""), 16)
                    ]
                })

            let width = 0;
            let height = 0;

            data.forEach(line =>
                {
                    switch(line[0])
                    {
                        case "R": width += line[1]; break;
                        case "D": height += line[1]; break;
                        case "L": width += line[1]; break;
                        case "U": height += line[1]; break;
                    }
                })

            let grid = new Array(width * 2);
            for(let i = 0; i < width * 2; i++) grid[i] = new Array(height * 2).fill(0)
                
            let x = width;
            let y = height;

            grid[x][y] = parseInt("ffffff", 16)

            data.forEach(line =>
                {
                    let [direction, distance, colour] = line;

                    while(distance > 0)
                    {
                        switch(direction)
                        {
                            case "R": x++; break;
                            case "D": y++; break;
                            case "L": x--; break;
                            case "U": y--; break;
                        }

                        grid[x][y] = parseInt("ffffff", 16);

                        grid[x + 1][y] = (grid[x + 1][y] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x - 1][y] = (grid[x - 1][y] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x][y + 1] = (grid[x][y + 1] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x][y - 1] = (grid[x][y - 1] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour

                        distance--;
                    }
                })

            // Floodfill time!

            let inside = (x, y) =>
            {
                let touched = 0;
                for(let i = x; i > -1; i--)
                {
                    if(grid[i][y] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = -1;
                    }
                }

                for(let i = y; i > -1; i--)
                {
                    if(grid[x][i] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = -1;
                    }
                }

                for(let i = x; i < width * 2; i++)
                {
                    if(grid[i][y] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = width * 2;
                    }
                }

                for(let i = y; i < height * 2; i++)
                {
                    if(grid[x][i] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = height * 2;
                    }
                }

                return touched == 4
            }

            let n = getRandomInt(0, width * 2 - 1);
            let m = getRandomInt(0, height * 2 - 1);

            while(!inside(n, m) || grid[n][m] !== 0)
            {
                n = getRandomInt(0, width * 2 - 1);
                m = getRandomInt(0, height * 2 - 1);
            }

            let queue = [[n, m]];

            while(queue.length > 0)
            {
                let [a, b] = queue.shift();

                if(grid[a][b] != parseInt("ffffff", 16))
                {

                    grid[a][b] = parseInt("ffffff", 16);

                    if(a > 0) queue.push([a - 1, b]);

                    if(a < width * 2 - 1) queue.push([a + 1, b]);

                    if(b > 0) queue.push([a, b - 1]);

                    if(b < height * 2 - 1) queue.push([a, b + 1]);
                }
            }

            let sum = 0;
            let str = "";

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    if(grid[i][j] == parseInt("ffffff", 16))
                    {
                        sum++;
                    }

                    str += grid[i][j] == parseInt("ffffff", 16) ? "#" : "."
                }

                str += "\n"
            }

            return sum
        }

        let part2 = (data) =>
        {
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            data = data.split("\n").map(line =>
                {
                    let [direction, distance, colour] = line.split(" ");

                    return [
                        direction,
                        distance * 1,
                        parseInt(colour.replace("(#", "").replace(")", ""), 16)
                    ]
                })

            let width = 0;
            let height = 0;

            data.forEach(line =>
                {
                    switch(line[0])
                    {
                        case "R": width += line[1]; break;
                        case "D": height += line[1]; break;
                        case "L": width += line[1]; break;
                        case "U": height += line[1]; break;
                    }
                })

            let grid = new Array(width * 2);
            for(let i = 0; i < width * 2; i++) grid[i] = new Array(height * 2).fill(0)
                
            let x = width;
            let y = height;

            grid[x][y] = parseInt("ffffff", 16)

            data.forEach(line =>
                {
                    let [direction, distance, colour] = line;

                    while(distance > 0)
                    {
                        switch(direction)
                        {
                            case "R": x++; break;
                            case "D": y++; break;
                            case "L": x--; break;
                            case "U": y--; break;
                        }

                        grid[x][y] = parseInt("ffffff", 16);

                        grid[x + 1][y] = (grid[x + 1][y] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x - 1][y] = (grid[x - 1][y] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x][y + 1] = (grid[x][y + 1] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour
                        grid[x][y - 1] = (grid[x][y - 1] == parseInt("ffffff", 16)) ? parseInt("ffffff", 16) : colour

                        distance--;
                    }
                })

            // Floodfill time!

            let inside = (x, y) =>
            {
                let touched = 0;
                for(let i = x; i > -1; i--)
                {
                    if(grid[i][y] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = -1;
                    }
                }

                for(let i = y; i > -1; i--)
                {
                    if(grid[x][i] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = -1;
                    }
                }

                for(let i = x; i < width * 2; i++)
                {
                    if(grid[i][y] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = width * 2;
                    }
                }

                for(let i = y; i < height * 2; i++)
                {
                    if(grid[x][i] == parseInt("ffffff", 16))
                    {
                        touched ++;
                        i = height * 2;
                    }
                }

                return touched == 4
            }

            let n = getRandomInt(0, width * 2 - 1);
            let m = getRandomInt(0, height * 2 - 1);

            while(!inside(n, m) || grid[n][m] !== 0)
            {
                n = getRandomInt(0, width * 2 - 1);
                m = getRandomInt(0, height * 2 - 1);
            }

            let queue = [[n, m]];

            while(queue.length > 0)
            {
                let [a, b] = queue.shift();

                if(grid[a][b] != parseInt("ffffff", 16))
                {

                    grid[a][b] = parseInt("ffffff", 16);

                    if(a > 0) queue.push([a - 1, b]);

                    if(a < width * 2 - 1) queue.push([a + 1, b]);

                    if(b > 0) queue.push([a, b - 1]);

                    if(b < height * 2 - 1) queue.push([a, b + 1]);
                }
            }

            let sum = 0;
            let str = "";

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    if(grid[i][j] == parseInt("ffffff", 16))
                    {
                        sum++;
                    }

                    str += grid[i][j] == parseInt("ffffff", 16) ? "#" : "."
                }

                str += "\n"
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
