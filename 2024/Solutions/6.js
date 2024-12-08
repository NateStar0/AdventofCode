
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n").map(line => line.split(""));

            let guardPosition = { x : -1, y : -1};
            let visitGrid = new Array(data.length);
            let dir = 0;

            for(var i = 0; i < data.length; i++)
            {
                visitGrid[i] = new Array(data[i].length);
                visitGrid[i].fill(false);

                for(var j = 0; j < data[i].length; j++)
                {
                    if(data[i][j] == "^")
                    {
                        guardPosition = {x:j, y:i};
                        data[i][j] = ".";
                    }
                }
            }

            let done = false;

            while(!done)
            {
                let offsets = 
                [
                    {x:0, y:-1, dirdir:"up"},
                    {x:1, y:0, dirdir:"right"},
                    {x:0, y:1, dirdir:"down"},
                    {x:-1, y:0, dirdir:"left"}
                ]

                if(guardPosition.y + offsets[dir].y > -1 && guardPosition.y + offsets[dir].y < data.length && guardPosition.x + offsets[dir].x > -1 && guardPosition.x + offsets[dir].x < data[0].length)
                {
                    visitGrid[guardPosition.y][guardPosition.x] = true;
                    if(data[guardPosition.y + offsets[dir].y][guardPosition.x + offsets[dir].x] == "#")
                    {
                        dir++;
                        if(dir == offsets.length) dir = 0;
                    }
                    else
                    {
                        guardPosition.x += offsets[dir].x;
                        guardPosition.y += offsets[dir].y;
                    }
                }
                else
                {
                    done = true;
                }
            }

            let sum = 0;

            for(var i = 0; i < data.length; i++)
            {
                for(var j = 0; j < data[i].length; j++)
                {
                    if(visitGrid[i][j])
                    {
                        sum++
                    }
                }
            }

            return (sum + 1)
        }

        let part2 = (data) =>
        {
            data = data.split("\n").map(line => line.split(""));

            let guardPosition = { x : -1, y : -1};
            let visitGrid = new Array(data.length);
            let dir = 0;

            for(var i = 0; i < data.length; i++)
            {
                visitGrid[i] = new Array(data[i].length);
                visitGrid[i].fill(false);

                for(var j = 0; j < data[i].length; j++)
                {
                    if(data[i][j] == "^")
                    {
                        guardPosition = {x:j, y:i};
                        data[i][j] = ".";
                    }
                }
            }

            let done = false;
            let changes = 0;

            while(!done)
            {
                let offsets = 
                [
                    {x:0, y:-1, dirdir:"up"},
                    {x:1, y:0, dirdir:"right"},
                    {x:0, y:1, dirdir:"down"},
                    {x:-1, y:0, dirdir:"left"}
                ]

                if(guardPosition.y + offsets[dir].y > -1 && guardPosition.y + offsets[dir].y < data.length && guardPosition.x + offsets[dir].x > -1 && guardPosition.x + offsets[dir].x < data[0].length)
                {
                    visitGrid[guardPosition.y][guardPosition.x] = true;
                    if(data[guardPosition.y + offsets[dir].y][guardPosition.x + offsets[dir].x] == "#")
                    {
                        dir++;
                        if(dir == offsets.length) dir = 0;

                        changes++;
                    }
                    else
                    {
                        guardPosition.x += offsets[dir].x;
                        guardPosition.y += offsets[dir].y;
                    }
                }
                else
                {
                    done = true;
                }
            }

            let sum = 0;
            let visited = '';

            for(var i = 0; i < data.length; i++)
            {
                for(var j = 0; j < data[i].length; j++)
                {
                    if(visitGrid[i][j])
                    {
                        sum++
                        visited += 'X';
                    }
                    else
                    {
                        visited += data[i][j];
                    }
                }

                visited += '\n'
            }

            return changes - 2;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
