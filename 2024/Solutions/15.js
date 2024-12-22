
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let position = [-1, -1];
            let [grid, instructions] = data.split("\n\n");
            let sum = 0;

            instructions = instructions.replace(/\n/g, "").split("");
            grid = grid.split("\n").map(line=> line.split(""));

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == "@")
                    {
                        position = [i, j];
                        grid[i][j] = "."
                    }
                }
            }

            let moves = {
                "^": {x:0, y:-1},
                "v": {x:0, y:1},
                "<": {x:-1, y:0},
                ">": {x:1, y:0},
            }

            for(inst of instructions)
            {
                let dx = moves[inst].x;
                let dy = moves[inst].y;

                switch(grid[position[0] + dy][position[1] + dx])
                {
                    case "O":
                        let canGo = false;
                        let canContinue = true;

                        for(var i = 2; canContinue; i++)
                        {
                            canGo = grid[position[0] + dy * i][position[1]+dx * i] == ".";
                            canContinue = !(grid[position[0] + dy * i][position[1]+dx * i] == "." || grid[position[0] + dy * i][position[1]+dx * i] == "#")
                        }

                        i--;

                        if(canGo)
                        {
                            grid[position[0] + dy][position[1]+dx] = "."
                            grid[position[0] + dy * i][position[1]+dx * i] = "O"
                        }
                    break;

                    case ".":
                        position[0] += dy;
                        position[1] += dx;
                    break;
                }
            }

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    if(grid[i][j] == "O") sum += 100 * i + j
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            let position = [-1, -1];
            let [grid, instructions] = data.split("\n\n");
            let sum = 0;

            instructions = instructions.replace(/\n/g, "").split("");
            grid = grid.replace(/\#/g, "##").replace(/O/g, "[]").replace(/\./g, "..").replace(/@/g, "@.").split("\n").map(line=> line.split(""));

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[i].length; j++)
                {
                    if(grid[i][j] == "@")
                    {
                        position = [i, j];
                        grid[i][j] = "."
                    }
                }
            }

            let moves = {
                "^": {x:0, y:-1},
                "v": {x:0, y:1},
                "<": {x:-1, y:0},
                ">": {x:1, y:0},
            }

            for(inst of instructions)
            {
                let dx = moves[inst].x;
                let dy = moves[inst].y;

                let next = grid[position[0] + dy][position[1] + dx]

                if(next == '[' || next == ']')
                {
                    if(dx !== 0)
                    {
                        let canGo = false
                        let canContinue = true;

                        for(var i = 1; canContinue; i++)
                        {
                            canGo = grid[position[0] + dy * i][position[1]+dx * i] == ".";
                            canContinue = !(grid[position[0] + dy * i][position[1]+dx * i] == "." || grid[position[0] + dy * i][position[1]+dx * i] == "#")
                        }

                        i--;

                        if(canGo)
                        {
                            for(let j = i; j > 1; j--)
                            {
                                let tile = grid[position[0]][position[1] + dx * (j - 1)];
                                grid[position[0]][position[1] + dx * (j)] = tile;
                            }

                            grid[position[0]][position[1] + dx] = "."
                        }
                    }
                    else
                    {
                        // veritcal pushing requires more effort, sadly
                        let toCheck = [{x: position[1], y: position[0] + dy}];
                        let checked = new Map();
                        let toPush = new Map();
                        let canPush = true;

                        while (toCheck.length > 0) 
                        {
                            let loc = toCheck.shift();
                            let check = grid[loc.y][loc.x];
                            checked.set(`${loc.x},${loc.y}`,true);

                            // if wall - early exit
                            if (check == '#') 
                            {
                                canPush = false;
                                break;
                            }

                            if (check == '.') 
                            {
                                continue;
                            }

                            if (check == '[') 
                            {
                                toPush.set(`${loc.x},${loc.y}`,{x:loc.x,y:loc.y});

                                if (!checked.has(`${loc.x+1},${loc.y}`)) 
                                {
                                    toCheck.push({x: loc.x+1,y: loc.y})
                                }
                            }

                            if (check == ']') 
                            {
                                toPush.set(`${loc.x},${loc.y}`,{x:loc.x,y:loc.y});

                                if (!checked.has(`${loc.x-1},${loc.y+dy}`)) 
                                {
                                    toCheck.push({x: loc.x-1,y: loc.y})
                                }
                            }          
                            
                            if (!checked.has(`${loc.x},${loc.y+dy}`)) 
                            {
                                toCheck.push({x: loc.x, y: loc.y+dy});
                            }
                        }

                        if (canPush == true) 
                        {
                            let boxes = [...toPush.values()];
                            let s = -Math.sign(boxes[0].y - position[0]);
                            boxes.sort((a, b) => (a.y - b.y) * s);

                            for (let box of boxes) 
                            {
                                let b = grid[box.y][box.x]
                                grid[box.y + dy][box.x] = b;
                                grid[box.y][box.x] = "."
                            }
                        }
                    }
                }

                if(grid[position[0] + dy][position[1] + dx] == ".")
                {
                    position[0] += dy;
                    position[1] += dx;
                }
            }

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    if(grid[i][j] == "[") sum += 100 * i + j
                }
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}

/*
let str = "";
for(let i = 0; i < grid.length; i++) str += grid[i].join("") + "\n"
console.log(str)
*/
