
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let doP1 = false;

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

            let start = [0, 0]
            let end = [0,0]; 

            grid = data.split("\n").map(line=> line.split("").map(element => element == "#" ? 1 : element));
            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    switch(grid[i][j])
                    {
                        case "S": 
                            start = [i, j]
                            grid[i][j] = 0;
                        break;
                        case "E": 
                            end = [i, j]
                            grid[i][j] = 0;
                        break;
                        case ".": 
                            grid[i][j] = 0;
                        break;
                    }
                }
            }

            let currentLength = shortestPath(grid, start, end);
            let sum = 0;

            if(doP1)
            {
                for(let i = 0; i < grid.length; i++)
                {
                    for(let j = 0; j < grid[i].length; j++)
                    {
                        var newGrid = grid.map(function(arr) {
                            return arr.slice();
                        });

                        newGrid[i][j] = 0;

                        var newLength = shortestPath(newGrid, start, end);

                        if(currentLength - newLength >= 100)
                        {
                            sum++;
                        }

                        console.log(i * grid.length + j, grid.length * grid[0].length)
                    }
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
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
                let visited = [];
                
                let isValid = (x, y) => (
                    x >= 0 && x < rows &&
                    y >= 0 && y < cols &&
                    !grid[x][y] && 
                    !visited.includes(`${x},${y}`) 
                );
                
                visited.push(`${start[0]},${start[1]}`);
                
                while (queue.length > 0) 
                {
                    let [x, y, distance] = queue.shift();
                
                    if (x === end[0] && y === end[1]) 
                    {
                        return [visited, distance];
                    }
                
                    for (let [dx, dy] of directions) 
                    {
                        let nx = x + dx, ny = y + dy;
                        if (isValid(nx, ny)) 
                        {
                            queue.push([nx, ny, distance + 1]);
                            visited.push(`${nx},${ny}`);
                        }
                    }
                }
                
                return -1; 
            }

            let start = [0, 0]
            let end = [0,0]; 

            grid = data.split("\n").map(line=> line.split("").map(element => element == "#" ? 1 : element));
            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    switch(grid[i][j])
                    {
                        case "S": 
                            start = [i, j]
                            grid[i][j] = 0;
                        break;
                        case "E": 
                            end = [i, j]
                            grid[i][j] = 0;
                        break;
                        case ".": 
                            grid[i][j] = 0;
                        break;
                    }
                }
            }

            let distanceGrid = new Array(grid.length);
            for(let i = 0; i < grid.length; i++) distanceGrid[i] = new Array(grid[0].length).fill(-1)

            let [path, currentLength] = shortestPath(grid, start, end);
            let sum = 0;

            for(let i = 0; i < path.length; i++)
            {
                let [x, y] = path[i].split(",").map(Number);
                distanceGrid[x][y] = currentLength - i;
            }

            let times = {};
            let thresh = 100;

            for(let i = 0; i < path.length - thresh; i++)
            {
                for(let j = i + 1; j < path.length; j++)
                {
                    if(i != j)
                    {
                        let [x, y] = path[i].split(",").map(Number);
                        let [a, b] = path[j].split(",").map(Number);
                        let dist = Math.abs(x - a) + Math.abs(y - b);

                        if(dist <= 20)
                        {
                            var delta = j - i - dist
                            if(delta >= thresh)
                            {
                                if(!times[delta]) times[delta] = 1;
                                else times[delta]++;
                                
                                sum++;
                            }
                        }
                    }
                }
            }

            let str = "";
            for(let i = 0; i < distanceGrid.length; i++) str += `${distanceGrid[i].join("")}\n`

            return [times, sum]
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
