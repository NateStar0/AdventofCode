
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let grid = data.split("\n").map(line => line.split(""));
            let solids = [];
            let rocks = [];

            for(let i = 0; i < grid.length; i++)
            {
                for(let j = 0; j < grid[0].length; j++)
                {
                    switch(grid[i][j])
                    {
                        case "#": solids.push(i + "," + j); break;
                        case "O": rocks.push(i + "," + j); break;
                        case ".": break;
                    }
                }
            }

            let hasMoved = true;
            while(hasMoved)
            {
                hasMoved = false;

                for(let i = 0; i < rocks.length; i++)
                {
                    let [y, x] = rocks[i].split(",");

                    if(!solids.includes((y - 1) + "," + x) && !rocks.includes((y - 1) + "," + x) && y > 0)
                    {
                        rocks[i] = (y - 1) + "," + x;
                        hasMoved = true;
                    }
                }
            }

            return rocks.reduce((acc, val) => acc + (grid.length - val.split(",")[0]), 0)
        }

        let part2 = (data) =>
        {
            let lines = data.split("\n").map(line => line.split(""));
            let FINAL_CYCLE = 1_000_000_000;

            let directions = ['n', 'w', 's', 'e'];

            let rockRows = [];

            let uniqueSnapshots = [];
            let minRunsRequired = FINAL_CYCLE;
            
            for (let run = 0; run < minRunsRequired; ++run) 
            {
                rockRows.length = 0;
                for (let d = 0; d < directions.length; d++)
                {
                    let direction = directions[d];
                    
                    for (let i = 0; direction === 'n' || direction === 's' ? i < lines[0].length : i < lines.length; ++i) {
                        let firstDot = -1;
                        for (
                            let j =
                                direction === 'n' || direction === 'w'
                                    ? 0
                                    : direction === 's'
                                    ? lines.length - 1
                                    : lines[0].length - 1;
                            direction === 'n' ? j < lines.length : direction === 'w' ? j < lines[0].length : j >= 0;
                            direction === 'n' || direction === 'w' ? ++j : --j
                        ) {
                            function get(outer, inner) {
                                if (direction === 'n' || direction === 's') return lines[inner][outer];
                                return lines[outer][inner];
                            }
                            function getY(outer, inner) {
                                if (direction === 'n' || direction === 's') return inner;
                                return outer;
                            }
                            function set(outer, inner, val) {
                                if (direction === 'n' || direction === 's') {
                                    lines[inner][outer] = val;
                                } else {
                                    lines[outer][inner] = val;
                                }
                            }
                            function addRockWeight(weight) {
                                if (direction === directions[directions.length - 1]) {
                                    rockRows.push(weight);
                                }
                            }

                            if (get(i, j) === '.') {
                                if (firstDot === -1) {
                                    firstDot = j;
                                } else {
                                    continue;
                                }
                            } else if (get(i, j) === '#') {
                                firstDot = -1;
                            } else if (get(i, j) === 'O') {
                                if (firstDot > -1) {
                                    set(i, firstDot, 'O');
                                    set(i, j, '.');
                                    j = firstDot;
                                    addRockWeight(lines.length - getY(i, firstDot));
                                    firstDot = -1;
                                } else {
                                    addRockWeight(lines.length - getY(i, j));
                                    continue;
                                }
                            }
                        }
                    }
                }

                if (minRunsRequired === FINAL_CYCLE) 
                {
                    let snapshot = lines.map((row) => row.reduce((p, c) => p + c)).reduce((p, c) => p + '\n' + c);
                    let index = uniqueSnapshots.indexOf(snapshot);

                    if (index !== -1) 
                    {
                        let duplicateItems = uniqueSnapshots.length - index;
                        let itemsIntoDupSet = (FINAL_CYCLE - uniqueSnapshots.length) % duplicateItems;
                        minRunsRequired = uniqueSnapshots.length + itemsIntoDupSet + (itemsIntoDupSet === 0 ? itemsIntoDupSet : 0);
                    } 
                    else 
                    {
                        uniqueSnapshots.push(snapshot);
                    }
                }
            }
            
            return rockRows.reduce((p, c) => p + c, 0)
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
