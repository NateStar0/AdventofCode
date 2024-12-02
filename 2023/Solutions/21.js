
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));

            let startX = 0;
            let startY = 0;

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == "S")
                    {
                        grid[i][j] = ".";
                        startX = i;
                        startY = j;
                    }
                }
            }

            let canReach = [startX + "," + startY];
            let step = 0;

            while(step < 64)
            {
                let newCanStep = [];

                canReach.forEach(pos =>
                    {
                        let [x, y] = pos.split(",").map(Number);

                        if(x > 0 && grid[x - 1][y] == ".") newCanStep.push((x - 1) + "," + y);
                        if(x < grid.length - 1 && grid[x + 1][y] == ".") newCanStep.push((x + 1) + "," + y);
                        if(y > 0 && grid[x][y - 1] == ".") newCanStep.push(x + "," + (y - 1));
                        if(y < grid[0].length - 1 && grid[x][y + 1] == ".") newCanStep.push(x + "," + (y + 1));
                    })

                canReach = [... new Set(newCanStep)];
                step++;
            }

            return canReach.length;
        }

        let part2 = (data) =>
        {
            return 0
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
