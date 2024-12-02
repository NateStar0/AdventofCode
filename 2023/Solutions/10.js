
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
                let lines = data.split('\n');
                let start = {};

                for(let y = 0; y < lines.length; y++) 
                {
                    let line = lines[y];
                    for(let x = 0; x < line.length; x++) 
                    {
                        if(line[x] === 'S') 
                        {
                            start = { x, y };
                        }
                    }
                }

                let x = start.x;
                let y = start.y;
                let dir;
                let below = lines[y + 1][x];
                if(below === '|' || below === 'L' || below === 'J') 
                {
                    dir = 'S';
                    y++;
                }
                if(!dir) 
                {
                    let above = lines[y - 1][x];
                    if(above === '|' || above ==='F' || above === '7') {
                        dir = 'N';
                        y--;
                    }
                    else
                    {
                        dir = 'E'
                        x++;
                    }
                }

                let path = [start, { x, y }];
                let steps = 1;

                while(x !== start.x || y !== start.y) 
                {
                    let delta = {x : 0, y : 0};
                    let potentials = {
                        '|S' : {x:0, y:1},
                        '|N': {x:0, y:-1},
                        '-E': {x:1, y:0},
                        '-W': {x:-1, y:0},
                        'LS': {x:1, y:0},
                        'LW': {x:0, y:-1},
                        'JS': {x:-1, y:0},
                        'JE': {x:0, y:-1},
                        '7N': {x:-1, y:0},
                        '7E': {x:0, y:1},
                        'FN': {x:1, y:0},
                        'FW': {x:0, y:1},
                    }

                    delta = potentials[lines[y][x] + dir];

                    if(delta.y === 1) {
                        dir = 'S';
                    }
                    else if(delta.y === -1) {
                        dir = 'N';
                    }
                    else if(delta.x === -1) {
                        dir = 'W';
                    }
                    else {
                        dir = 'E';
                    }

                    x += delta.x;
                    y += delta.y;

                    steps++;

                    path.push({ x, y });
                }
            
                return steps / 2
        }

        let part2 = (data) =>
        {
            let lines = data.split('\n');
            let start = {};
            let isLoop = [];

            for(let y = 0; y < lines.length; y++) 
            {
                isLoop[y] = [];
                let line = lines[y];

                for(let x = 0; x < line.length; x++) 
                {
                    if(line[x] === 'S') {
                        start = { x, y };
                    }
                }
            }

            let x = start.x;
            let y = start.y;
            let dir;
            let below = lines[y + 1][x];

            if(below === '|' || below === 'L' || below === 'J') 
            {
                dir = 'S';
                y++;
            }
            if(!dir) 
            {
                let above = lines[y - 1][x];
                if(above === '|' || above ==='F' || above === '7') 
                {
                    dir = 'N';
                    y--;
                }
                else
                {
                    dir = 'E'
                    x++;
                }
            }

            let path = [start, { x, y }];
            isLoop[start.y][start.x] = true;
            isLoop[y][x] = true;

            while(x !== start.x || y !== start.y) 
            {
                let delta = {x : 0, y : 0};
                let potentials = {
                    '|S' : {x:0, y:1},
                    '|N': {x:0, y:-1},
                    '-E': {x:1, y:0},
                    '-W': {x:-1, y:0},
                    'LS': {x:1, y:0},
                    'LW': {x:0, y:-1},
                    'JS': {x:-1, y:0},
                    'JE': {x:0, y:-1},
                    '7N': {x:-1, y:0},
                    '7E': {x:0, y:1},
                    'FN': {x:1, y:0},
                    'FW': {x:0, y:1},
                }

                delta = potentials[lines[y][x] + dir];

                if(delta.y === 1) {
                    dir = 'S';
                }
                else if(delta.y === -1) {
                    dir = 'N';
                }
                else if(delta.x === -1) {
                    dir = 'W';
                }
                else {
                    dir = 'E';
                }

                x += delta.x;
                y += delta.y;
                isLoop[y] = isLoop[y] || [];
                isLoop[y][x] = true;

                path.push({ x, y });
            }

            let count  = 0;
            for(let yy = 0; yy < lines.length; yy++) 
            {
                let crosses = 0;
                let line = lines[yy];
                let corner = false;
                for(let xx = 0; xx < line.length; xx++) 
                {
                    if(isLoop[yy][xx]) 
                    {
                        let current = lines[yy][xx];

                        if(current === '|') 
                        {
                            crosses++;
                        }
                        else if(current !== '-') 
                        {
                            if(corner) 
                            {
                                if(corner === 'L' && current === '7') 
                                {
                                    crosses++;
                                }
                                else if(corner === 'F' && current === 'J') 
                                {
                                    crosses ++;
                                }
                                corner = false;
                            }
                            else 
                            {
                                corner = current;
                            }
                        }
                    }
                    else 
                    if(crosses % 2 === 1) 
                    {
                        count++;
                    }
                }
            }
            
            return count
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
