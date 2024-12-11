
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split("").map(Number));
            let trailheads = [];

            let scores = {};

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == 0)
                    {
                        trailheads.push(`${i},${j}`);
                        scores[`${i},${j}`] = new Set();
                    }

                    if(grid[i][j] == NaN)
                    {
                        grid[i][j] = 11;
                    }
                }
            }

            trailheads.forEach(trailhead =>
            { 
                let [x, y] = trailhead.split(",").map(Number);

                let walk = function(nx, ny, currentVal, trailhead)
                {
                    if(currentVal < 9)
                    {
                        if(nx - 1 >= 0 && grid[nx - 1][ny] == currentVal + 1) walk(nx - 1, ny, currentVal + 1, trailhead);
                        if(ny - 1 >= 0 && grid[nx][ny - 1] == currentVal + 1) walk(nx, ny - 1, currentVal + 1, trailhead);
                        if(nx + 1 < grid.length && grid[nx + 1][ny] == currentVal + 1) walk(nx + 1, ny, currentVal + 1, trailhead);
                        if(ny + 1 < grid[0].length && grid[nx][ny + 1] == currentVal + 1) walk(nx, ny + 1, currentVal + 1, trailhead);
                    }
                    else
                    {
                        scores[trailhead].add(`${nx},${ny}`)
                    }
                }

                walk(x, y, 0, trailhead);
            }
            )

            let sum = 0;
            
            for(let score in scores)
            {
                sum += scores[score].size
            }

            return sum
        }

        let part2 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split("").map(Number));
            let trailheads = [];

            let scores = {};

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == 0)
                    {
                        trailheads.push(`${i},${j}`);
                        scores[`${i},${j}`] = new Set();
                    }

                    if(grid[i][j] == NaN)
                    {
                        grid[i][j] = 11;
                    }
                }
            }

            trailheads.forEach(trailhead =>
            { 
                let [x, y] = trailhead.split(",").map(Number);

                let walk = function(nx, ny, currentVal, trailhead, path)
                {
                    path += `${nx},${ny}`
                    if(currentVal < 9)
                    {
                        if(nx - 1 >= 0 && grid[nx - 1][ny] == currentVal + 1) walk(nx - 1, ny, currentVal + 1, trailhead, path);
                        if(ny - 1 >= 0 && grid[nx][ny - 1] == currentVal + 1) walk(nx, ny - 1, currentVal + 1, trailhead, path);
                        if(nx + 1 < grid.length && grid[nx + 1][ny] == currentVal + 1) walk(nx + 1, ny, currentVal + 1, trailhead, path);
                        if(ny + 1 < grid[0].length && grid[nx][ny + 1] == currentVal + 1) walk(nx, ny + 1, currentVal + 1, trailhead, path);
                    }
                    else
                    {
                        scores[trailhead].add(path)
                    }
                }

                walk(x, y, 0, trailhead, `${trailhead}`);
            }
            )

            let sum = 0;
            
            for(let score in scores)
            {
                sum += scores[score].size
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
