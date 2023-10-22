
module.exports = 
{
    run(data)
    {
        let map = [], cols = false, rows, size;
        let pos = {row: 0, col: 0, dir: '>'}

        let inc = {'>': [1, 0], 'v': [0, 1], '<': [-1, 0], '^': [0, -1]}
        let dirValue = {'>': 0, 'v': 1, '<': 2, '^': 3}
        let rotate = {
            L: {'>': '^', 'v': '>', '<': 'v', '^': '<'},
            R: {'>': 'v', 'v': '<', '<': '^', '^': '>'}
        }

        let move = (steps, nextPos) => {
            while (map[nextPos(pos).row][nextPos(pos).col] == '.' && steps) {steps--; pos = nextPos(pos)}
        }

        let [grid, path] = data.split("\n\n")

        grid.split("\n").map((line, row) => 
        {
            cols = Math.max(cols, line.length);
            let tmp = Array(cols);

            line.split('').forEach((v, col) => 
            {
                if (['.', '#'].includes(v)) tmp[col] = v;
            })

            map.push(tmp);
        })

        rows = map.length;

        let forwards = path.match(/\d+/g).map(Number);
        let rotations = path.match(/[RL]/g);
        
        let div = rows > cols ? [3, 4] : [4, 3]; // cols, rows
            size = cols/div[0];

        let sideMap = Array.from({length:div[1]}, () => Array(div[0])), side = 1;
            
        for (let row = 0; row < div[1]; row++)
                for (let col = 0; col < div[0]; col++)
                    if (map[row*size][col*size] != undefined) sideMap[row][col] = side++;

        let part1 = (data) =>
        {
            pos = {dir: '>', col: map[0].indexOf('.'), row: 0}

            for (let i = 0; i <= forwards.length+rotations.length-1; i++) 
            {
                if (i % 2 == 0) move(forwards[i/2], (p) => 
                {
                    let i = inc[p.dir];
                    let pos = {...p};

                    let step = () => 
                    {
                        pos.row += i[1];
                        pos.col += i[0];
                        if (pos.col >= cols) pos.col = 0;
                        if (pos.row >= rows) pos.row = 0;
                        if (pos.col < 0) pos.col = cols-1;
                        if (pos.row < 0) pos.row = rows-1;
                    }

                    step();

                    while (map[pos.row][pos.col] == undefined) step();
                    
                    return pos;
                });

                if (i % 2 == 1) pos.dir = rotate[rotations[(i-1)/2]][pos.dir];
            }

            return (pos.row + 1) * 1000 + (pos.col + 1) * 4 + dirValue[pos.dir]
        }

        let part2 = (data) =>
        {
            pos = {dir: '>', col: map[0].indexOf('.'), row: 0}

            for (let i = 0; i <= forwards.length + rotations.length-1; i++) 
            {
                if (i % 2 == 0) move(forwards[i/2], (p) => {
                    let i = inc[p.dir];
                    let pos = {...p};
                
                    let sideFrom = sideMap[Math.floor(p.row / size)][Math.floor(p.col / size)];
                
                    pos.row += i[1];
                    pos.col += i[0];
                
                    let sideTo = (pos.row < 0 || pos.col < 0 || pos.row >= rows || pos.col >= cols) ? undefined : sideMap[Math.floor(pos.row / size)][Math.floor(pos.col / size)];
                
                    if (sideTo == sideFrom) return pos;
                    if (sideTo) return pos;
                
                    switch(sideFrom)
                    {
                        case 1:
                            if (pos.dir == '^') 
                            {
                                // 1 to 6
                                pos.dir = '>';
                                pos.row = 150+p.col-50;
                                pos.col = 0;
                            } 
                            else if (pos.dir == '<') 
                            {
                                // 1 to 4
                                pos.dir = '>';
                                pos.row = 100+49-p.row;
                                pos.col = 0;
                            }
                        break;

                        case 2:
                            if (pos.dir == '^') 
                            {
                                pos.col = p.col-100;
                                pos.row = 199;
                            } 
                            else if (pos.dir == '>') 
                            {
                                // 2 to 5
                                pos.dir = '<';
                                pos.col = 99;
                                pos.row = 100+49-p.row;
                            } 
                            else if (pos.dir == 'v') 
                            {
                                pos.dir = '<';
                                pos.col = 99;
                                pos.row = p.col-100+50;
                            }
                        break;

                        case 3:
                            if (pos.dir == '>') 
                            {
                                // 3 -> 2
                                pos.dir = '^'
                                pos.col = p.row-50+100;
                                pos.row = 49;
                            } 
                            else if (pos.dir == '<') 
                            {
                                // 3 -> 4
                                pos.dir = 'v';
                                pos.col = p.row-50+0;
                                pos.row = 100;
                            }
                        break;

                        case 4:
                            if (pos.dir == '<') 
                            {
                                // 4 -> 1
                                pos.dir = '>';
                                pos.col = 50;
                                pos.row = 149-p.row;
                            } 
                            else if (pos.dir == '^') 
                            {
                                // 4 -> 3
                                pos.dir = '>';
                                pos.col = 50;
                                pos.row = p.col+50;
                            }
                        break;

                        case 5:
                            if (pos.dir == '>') 
                            {
                                // 5 -> 2
                                pos.dir = '<';
                                pos.col = 149;
                                pos.row = 149-p.row;
                            } 
                            else if (pos.dir == 'v') 
                            {
                                // 5 -> 6
                                pos.dir = '<';
                                pos.col = 49;
                                pos.row = p.col-50+150;
                            }
                        break;

                        case 6:
                            if (pos.dir == 'v') 
                            {
                                // 6 to 2
                                pos.col = p.col+100;
                                pos.row = 0;
                            } 
                            else if (pos.dir == '>') 
                            {
                                // 6 -> 5
                                pos.dir = '^';
                                pos.col = p.row-150+50;
                                pos.row = 149;
                            } else if (pos.dir == '<') 
                            {
                                // 6 -> 1
                                pos.dir = 'v';
                                pos.col = p.row-150+50;
                                pos.row = 0;
                            }
                        break;
                    }
                
                    return pos;
                });

                if (i % 2 == 1) pos.dir = rotate[rotations[(i-1)/2]][pos.dir];
            }

            return (pos.row + 1) * 1000 + (pos.col + 1) * 4 + dirValue[pos.dir]
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
