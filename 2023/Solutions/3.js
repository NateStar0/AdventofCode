
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;
            let grid = data.split("\n").map(line => line.split(""));
            let width = grid[0].length;
            let height = grid.length;

            let counted = new Array(height);
            for(let i = 0; i < height; i++) counted[i] = new Array(width).fill(false);

            let isDigit = (char) => !isNaN(char * 1);
            let isSpecial = (char) => !(isDigit(char) || char == ".");
            let outOfBounds = (y, x) => (x < 0) || (y < 0) || (x >= width) || (y >= height);

            let getWholeValue = (y, x) =>
            {
                let length = x;
                let start = x;

                while(start >= 0 && isDigit(grid[y][start])) start--;
                while(length <= width && isDigit(grid[y][length])) length ++;

                let accumulator = ""

                for(let i = start + 1; i <= length - 1; ++i)
                {
                    accumulator += grid[y][i];
                    counted[y][i] = 1;
                }

                return accumulator * 1
            }

            for(var x = 0; x < width; x++)
            {
                for(let y = 0; y < height; y++)
                {
                    if(isSpecial(grid[y][x]))
                    {
                        for(let i = -1; i <= 1; i++)
                        {
                            for(let j = -1; j <= 1; j++)
                            {
                                if(!(i == j && i == 0) && !outOfBounds(y + i, x + j))
                                {
                                    if(!counted[y + i][x + j] && isDigit(grid[y + i][x + j]))
                                    {
                                        sum += getWholeValue(y + i, x + j)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;
            let grid = data.split("\n").map(line => line.split(""));
            let width = grid[0].length;
            let height = grid.length;

            let counted = new Array(height);
            for(let i = 0; i < height; i++) counted[i] = new Array(width).fill(false);

            let isDigit = (char) => !isNaN(char * 1);
            let isSpecial = (char) => char == "*";
            let outOfBounds = (y, x) => (x < 0) || (y < 0) || (x >= width) || (y >= height);

            let getWholeValue = (y, x) =>
            {
                let length = x;
                let start = x;

                while(start >= 0 && isDigit(grid[y][start])) start--;
                while(length <= width && isDigit(grid[y][length])) length ++;

                let accumulator = ""

                for(let i = start + 1; i <= length - 1; ++i)
                {
                    accumulator += grid[y][i];
                    counted[y][i] = 1;
                }

                return accumulator * 1
            }

            for(var x = 0; x < width; x++)
            {
                for(let y = 0; y < height; y++)
                {
                    if(isSpecial(grid[y][x]))
                    {
                        let ratioValues = [];

                        for(let i = -1; i <= 1; i++)
                        {
                            for(let j = -1; j <= 1; j++)
                            {
                                if(!(i == j && i == 0) && !outOfBounds(y + i, x + j))
                                {
                                    if(!counted[y + i][x + j] && isDigit(grid[y + i][x + j]))
                                    {
                                        ratioValues.push(getWholeValue(y + i, x + j));
                                    }
                                }
                            }
                        }

                        if(ratioValues.length == 2)
                        {
                            sum += ratioValues.reduce((acc, val) => acc * val, 1);
                        }
                    }
                }
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
