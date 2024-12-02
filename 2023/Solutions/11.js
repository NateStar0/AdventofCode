
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));
            let sum = 0;

            // Expand the universe!

            let horizontalGaps = [];

            for(let i = 0; i < grid.length; i++)
            {
                let count = 0;
                for(let j = 0; j < grid[i].length; j++)
                {
                    count += grid[i][j] == "#" ? 1 : 0;
                }

                if(count == 0)
                {
                    horizontalGaps.push(i);
                }
            }

            let verticalGaps = [];

            for(let i = 0; i < grid[0].length; i++)
            {
                let count = 0;
                for(let j = 0; j < grid.length; j++)
                {
                    count += grid[j][i] == "#" ? 1 : 0;
                }

                if(count == 0)
                {
                    verticalGaps.push(i);
                }
            }

            let addoffset = 0;
            verticalGaps.forEach(gap =>
                {
                    for(let i = 0; i < grid.length; i++)
                    {
                        grid[i].splice(gap + addoffset, 0, ".")
                    }

                    addoffset++;
                })

            addoffset = 0;
            horizontalGaps.forEach(gap =>
                {
                    grid.splice(gap + addoffset, 0, new Array(grid[0].length).fill("."))

                    addoffset++;
                })

            // Find the nearest!

            // List all the galaxies
            let positions = [];
            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == "#")
                    {
                        positions.push([i, j]);
                    }
                }
            }

            checked = [];

            for(let i = 0; i < positions.length; i++)
            {
                let a = positions[i];

                for(let j = 0; j < positions.length; j++)
                {
                    if(i !== j && !checked.includes(j + " " + i))
                    {
                        let b = positions[j];

                        // Find the distance!
                        sum += Math.abs(b[1] - a[1]) + Math.abs(b[0]-a[0])
                        checked.push(i + " " + j)
                    }
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));
            let sum = 0;

            // Expand the universe!

            // List all the galaxies
            let positions = [];
            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == "#")
                    {
                        positions.push([i, j]);
                    }
                }
            }

            let horizontalGaps = [];

            for(let i = 0; i < grid.length; i++)
            {
                let count = 0;
                for(let j = 0; j < grid[i].length; j++)
                {
                    count += grid[i][j] == "#" ? 1 : 0;
                }

                if(count == 0)
                {
                    horizontalGaps.push(i);
                }
            }

            let verticalGaps = [];

            for(let i = 0; i < grid[0].length; i++)
            {
                let count = 0;
                for(let j = 0; j < grid.length; j++)
                {
                    count += grid[j][i] == "#" ? 1 : 0;
                }

                if(count == 0)
                {
                    verticalGaps.push(i);
                }
            }

            let addoffset = 0;
            verticalGaps.forEach(gap =>
                {
                    for(let i = 0; i < positions.length; i++)
                    {
                        if(positions[i][1] > gap)
                        {
                            positions[i][1] += (1000000 - 1);
                        }
                    }

                    for(let i = verticalGaps.indexOf(gap); i < verticalGaps.length; i++)
                    {
                        verticalGaps[i] += (1000000 - 1)
                    }
                })

            addoffset = 0;
            horizontalGaps.forEach(gap =>
                {
                    for(let i = 0; i < positions.length; i++)
                    {
                        if(positions[i][0] > gap)
                        {
                            positions[i][0] += (1000000 - 1);
                        }
                    }

                    for(let i = horizontalGaps.indexOf(gap); i < horizontalGaps.length; i++)
                    {
                        horizontalGaps[i] += (1000000 - 1)
                    }
                })

            checked = [];

            for(let i = 0; i < positions.length; i++)
            {
                let a = positions[i];

                for(let j = 0; j < positions.length; j++)
                {
                    if(i !== j && !checked.includes(j + " " + i))
                    {
                        let b = positions[j];

                        // Find the distance!
                        sum += Math.abs(b[1] - a[1]) + Math.abs(b[0]-a[0])
                        checked.push(i + " " + j)
                    }
                }
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
