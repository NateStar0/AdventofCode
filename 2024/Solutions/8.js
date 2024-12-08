
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));
            let antennas = {};
            let antinodes = new Set();

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] !== ".")
                    {
                        if(antennas[grid[i][j]] == undefined)
                        {
                            antennas[grid[i][j]] = new Array();
                        }

                        antennas[grid[i][j]].push(`${i},${j}`);
                    }
                }
            }

            let distance = function(xa, ya, xb, yb)
            {
                let dx = (xb - xa);
                let dy = (yb - ya);
                return Math.sqrt(dx * dx + dy * dy)
            }

            let inGrid = function(x, y)
            {
                return (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length)
            }

            for(antennaType in antennas)
            {
                let currentAntennas = antennas[antennaType];
                let hasDone = [];
                
                for(let n = 0; n < currentAntennas.length; n++)
                {
                    for(let m = 0; m < currentAntennas.length; m++)
                    {
                        if(n !== m && !hasDone.includes(`${n},${m}`))
                        {
                            let antA = currentAntennas[n].split(",").map(Number);
                            let antB = currentAntennas[m].split(",").map(Number);

                            let dx = antB[0] - antA[0];
                            let dy = antB[1] - antA[1];

                            console.log(dx, dy, antA, antB)

                            if(inGrid(antB[0] + dx, antB[1] + dy)) antinodes.add(`${antB[0] + dx},${antB[1] + dy}`)
                            if(inGrid(antA[0] - dx, antA[1] - dy)) antinodes.add(`${antA[0] - dx},${antA[1] - dy}`)

                            hasDone.push(`${n},${m}`)
                            hasDone.push(`${m},${n}`)
                        }
                    }
                }
            }

            return antinodes.size;
        }

        let part2 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));
            let antennas = {};
            let antinodes = new Set();

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] !== ".")
                    {
                        if(antennas[grid[i][j]] == undefined)
                        {
                            antennas[grid[i][j]] = new Array();
                        }

                        antennas[grid[i][j]].push(`${i},${j}`);
                    }
                }
            }

            let inGrid = function(x, y)
            {
                return (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length)
            }

            for(antennaType in antennas)
            {
                let currentAntennas = antennas[antennaType];
                let hasDone = [];
                
                for(let n = 0; n < currentAntennas.length; n++)
                {
                    for(let m = 0; m < currentAntennas.length; m++)
                    {
                        if(n !== m && !hasDone.includes(`${n},${m}`))
                        {
                            let antA = currentAntennas[n].split(",").map(Number);
                            let antB = currentAntennas[m].split(",").map(Number);

                            let dx = antB[0] - antA[0];
                            let dy = antB[1] - antA[1];

                            for(var k = 0; k < grid.length; k++)
                            {
                                if(inGrid(antB[0] + dx * k, antB[1] + dy * k)) antinodes.add(`${antB[0] + dx * k},${antB[1] + dy * k}`)
                                if(inGrid(antA[0] - dx * k, antA[1] - dy * k)) antinodes.add(`${antA[0] - dx * k},${antA[1] - dy * k}`)
                            }

                            hasDone.push(`${n},${m}`)
                            hasDone.push(`${m},${n}`)
                        }
                    }
                }
            }

            return antinodes.size;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
