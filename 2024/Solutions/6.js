
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
            data = data.split('\n').map(line=>line.split("").map(c=>c == "#"?1 : c));
        
            const guard ={
                x: -1,
                y: -1,
                dir: 90,
            }
            const turns = [];
        
            let found = false;
            for (let x=0;x<data[0].length;x++) {
                for (let y=0;y<data.length;y++) {
                    if (grid[y][x] == '^') {
                        guard.x = x;
                        guard.y = y;
                        guard.dir = 90;
                        found = true;
                        break;
                    }

                    if(data[y][x] !== 1)
                    {
                        data[y][x] = 0;
                    }
                }
                if (found == true) break;
            }
            let positions = 0;
            const guard_init = structuredClone(guard);
        
            for (let x=0;x<data[0].length;x++) {
                for (let y=0;y<data.length;y++) {
                    turns.splice(0,turns.length);
                    let map = new Array(data.length);
                    for(let i = 0; i < data.length; i++) 
                    {
                        map[i] = new Array(data[0].length)
                        for(let j = 0; j < data[0].length; j++) 
                        {
                            map[i][j] = data[i][j]
                        }
                    }
                    // can't place on the guard, or on anotehr wall
                    if (map[y][x] == 1) continue;
                    if (x == guard.x && y == guard.y) continue;
                    map[y][x] = 1;
        
                    let found_loop = false;
                    while(true) {
                        map.set(guard.x,guard.y,'X');
                        const next_x = guard.x + dir_to_x(guard.dir);
                        const next_y = guard.y + dir_to_y(guard.dir);
                
                        let next = map.get(next_x,next_y);
                        if (next == '#') {
                            // wall
                            //console.log('found a wall')
                            guard.dir -= 90;
                            if (guard.dir < 0) guard.dir += 360;
                            if (guard.dir > 360) guard.dir -= 360;
                            for (const turn of turns) {
                                if (turn.x == guard.x && turn.y == guard.y && turn.dir == guard.dir) {
                                    found_loop = true;
                                }
                            }
                            if (found_loop == true) break;
                            turns.push({x: guard.x, y: guard.y, dir: guard.dir});
                            continue;
                        }
                        if (next == undefined) {
                            //console.log('out of bounds')
                            break;
                        }
                        guard.x = next_x;
                        guard.y = next_y;
                        const t = map.get(guard.x,guard.y);
                        map.set(guard.x,guard.y,'^');
                        //map.log();
                        //console.log('\n');
                        map.set(guard.x,guard.y,t);
                    }
                    if (found_loop) {
                        positions += 1;
                    }
                    guard.x = guard_init.x;
                    guard.y = guard_init.y;
                    guard.dir = guard_init.dir;
                }
            }

            return positions
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
