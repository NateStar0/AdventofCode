
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let len = 71;
            let grid = new Array(len);
            for(let i = 0; i < len; i++) grid[i] = new Array(len).fill(0);

            data = data.split("\n").map(line => line.split(",").map(Number)) //.forEach(([x,y]) => grid[x][y] = true);
            for(let i = 0; i < 1024; i++)
            {
                let [x, y] = data[i];
                grid[x][y] = 1;
            }

            function shortestPath(grid, start, end) 
            {
                let rows = grid.length;
                let cols = grid[0].length;
                let directions = [
                    [-1, 0], // Up
                    [1, 0],  // Down
                    [0, -1], // Left
                    [0, 1]   // Right
                ];
                let queue = [[...start, 0]]; 
                let visited = new Set();
                
                let isValid = (x, y) => (
                    x >= 0 && x < rows &&
                    y >= 0 && y < cols &&
                    !grid[x][y] && 
                    !visited.has(`${x},${y}`) 
                );
                
                visited.add(`${start[0]},${start[1]}`);
                
                while (queue.length > 0) 
                {
                    let [x, y, distance] = queue.shift();
                
                    if (x === end[0] && y === end[1]) 
                    {
                        return distance;
                    }
                
                    for (let [dx, dy] of directions) 
                    {
                        let nx = x + dx, ny = y + dy;
                        if (isValid(nx, ny)) 
                        {
                            queue.push([nx, ny, distance + 1]);
                            visited.add(`${nx},${ny}`);
                        }
                    }
                }
                
                return -1; 
            }

            return shortestPath(grid, [0, 0], [70, 70]);
        }

        let part2 = (data) =>
        {
            let len = 71;
            let grid = new Array(len);
            for(let i = 0; i < len; i++) grid[i] = new Array(len).fill(0);

            data = data.split("\n").map(line => line.split(",").map(Number)) //.forEach(([x,y]) => grid[x][y] = true);
            for(let i = 0; i < 1024; i++)
            {
                let [x, y] = data[i];
                grid[x][y] = 1;
            }

            function shortestPath(grid, start, end) 
            {
                let rows = grid.length;
                let cols = grid[0].length;
                let directions = [
                    [-1, 0], // Up
                    [1, 0],  // Down
                    [0, -1], // Left
                    [0, 1]   // Right
                ];
                let queue = [[...start, 0]]; 
                let visited = new Set();
                
                let isValid = (x, y) => (
                    x >= 0 && x < rows &&
                    y >= 0 && y < cols &&
                    !grid[x][y] && 
                    !visited.has(`${x},${y}`) 
                );
                
                visited.add(`${start[0]},${start[1]}`);
                
                while (queue.length > 0) 
                {
                    let [x, y, distance] = queue.shift();
                
                    if (x === end[0] && y === end[1]) 
                    {
                        return distance;
                    }
                
                    for (let [dx, dy] of directions) 
                    {
                        let nx = x + dx, ny = y + dy;
                        if (isValid(nx, ny)) 
                        {
                            queue.push([nx, ny, distance + 1]);
                            visited.add(`${nx},${ny}`);
                        }
                    }
                }
                
                return -1; 
            }

            let j = 0;
            while(shortestPath(grid, [0, 0], [70, 70]) != -1)
            {
                let [x, y] = data[1024 + j];
                grid[x][y] = 1;

                j++;
            }

            return data[1024 + j - 1].join(",");
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
