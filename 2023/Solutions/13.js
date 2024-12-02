
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            function arrayEquals(a, b) {
                return Array.isArray(a) &&
                    Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((val, index) => val === b[index]);
            }

            function transpose(matrix) {
                return matrix[0].map((col, i) => matrix.map(row => row[i]));
              }

            let sum = 0;
            data.split("\n\n").map(grid =>
                {
                    grid = grid.split("\n");

                    // Vertical check!

                    for(let i = 0; i < grid.length; i++)
                    {
                        let a = i, b = i + 1;
                        let x = [], y = [];
                        while(a >= 0 && b <= grid.length - 1)
                        {
                            x.push(grid[a]);
                            y.push(grid[b]);
                            a--;
                            b++;
                        }

                        if(arrayEquals(x, y) && !arrayEquals(x, []))
                        {
                            sum += (i + 1) * 100;
                            i = grid.length;
                            return grid;
                        }
                    }

                    grid = grid.map(line => line.split(""));
                    grid = transpose(grid);
                    grid = grid.map(line => line.join(""))

                    for(let i = 0; i < grid.length; i++)
                    {
                        let a = i, b = i + 1;
                        let x = [], y = [];
                        while(a >= 0 && b <= grid.length - 1)
                        {
                            x.push(grid[a]);
                            y.push(grid[b]);
                            a--;
                            b++;
                        }

                        if(arrayEquals(x, y) && !arrayEquals(x, []))
                        {
                            sum += (i + 1);
                            i = grid.length;
                            return grid;
                        }
                    }
                })


            return sum
        }

        let part2 = (data) =>
        {
            function arrayEquals(a, b) {
                return Array.isArray(a) &&
                    Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((val, index) => val === b[index]);
            }

            function transpose(matrix) {
                return matrix[0].map((col, i) => matrix.map(row => row[i]));
              }

            let sum = 0;
            let c = 0;
            data = data.split("\n\n").map(grid =>
                {
                    c++;
                    grid = grid.split("\n");

                    // Vertical check!

                    for(let i = 0; i < grid.length; i++)
                    {
                        let a = i, b = i + 1;
                        let x = [], y = [];
                        while(a >= 0 && b <= grid.length - 1)
                        {
                            x.push(grid[a]);
                            y.push(grid[b]);
                            a--;
                            b++;
                        }

                        let differences = 0;
                        for(let j = 0; j < x.length; j++)
                        {
                            if(x[j] !== y[j])
                            {
                                for(let k = 0; k < x[j].length; k++)
                                {
                                    differences += (x[j].charAt(k) == y[j].charAt(k)) ? 0 : 1;
                                }
                            }
                        }

                        if(differences == 1 && !arrayEquals(x, []))
                        {
                            sum += (i + 1) * 100;
                            i = grid.length;

                            return grid;
                        }

                    }

                    grid = grid.map(line => line.split(""));
                    grid = transpose(grid);
                    grid = grid.map(line => line.join(""))

                    for(let i = 0; i < grid.length; i++)
                    {
                        let a = i, b = i + 1;
                        let x = [], y = [];
                        while(a >= 0 && b <= grid.length - 1)
                        {
                            x.push(grid[a]);
                            y.push(grid[b]);
                            a--;
                            b++;
                        }

                        let differences = 0;
                        for(let j = 0; j < x.length; j++)
                        {
                            if(x[j] !== y[j])
                            {
                                for(let k = 0; k < x[j].length; k++)
                                {
                                    if(x[j].charAt(k) !== y[j].charAt(k))
                                    {
                                        differences++;
                                    }
                                }
                            }
                        }

                        if(differences == 1 && !arrayEquals(x, []))
                        {
                            sum += (i + 1);
                            i = grid.length;
                            return grid;
                        }
                    }
                })


            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
