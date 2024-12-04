
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;

            data = data.split("\n").map(line => line.split(""));

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i].length; j++)
                {
                    if(i <= data.length - 4 && ((data[i][j] == "X" && data[i + 1][j] == "M" && data[i + 2][j] == "A" && data[i + 3][j] == "S") || (data[i][j] == "S" && data[i + 1][j] == "A" && data[i + 2][j] == "M" && data[i + 3][j] == "X")))
                    { 
                        sum++;
                    }

                    if(j <= data[i].length - 4 && ((data[i][j] == "X" && data[i][j + 1] == "M" && data[i][j + 2] == "A" && data[i][j + 3] == "S") || (data[i][j] == "S" && data[i][j + 1] == "A" && data[i][j + 2] == "M" && data[i][j + 3] == "X")))
                    { 
                        sum++;
                    }

                    if(j <= data[i].length - 4 && i <= data.length - 4 &&((data[i][j] == "X" && data[i+1][j + 1] == "M" && data[i+2][j + 2] == "A" && data[i+3][j + 3] == "S") || (data[i][j] == "S" && data[i+1][j + 1] == "A" && data[i+2][j + 2] == "M" && data[i+3][j + 3] == "X")))
                    { 
                        sum++;
                    }

                    if(j <= data[i].length - 4 && i >= 3 &&((data[i][j] == "X" && data[i-1][j + 1] == "M" && data[i-2][j + 2] == "A" && data[i-3][j + 3] == "S") || (data[i][j] == "S" && data[i-1][j + 1] == "A" && data[i-2][j + 2] == "M" && data[i-3][j + 3] == "X")))
                    { 
                        sum++;
                    }
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;

            data = data.split("\n").map(line => line.split(""));

            for(let i = 1; i < data.length - 1; i++)
            {
                for(let j = 1; j < data[i].length - 1; j++)
                {
                    if(data[i][j] == "A")
                    {
                        if( (data[i - 1][j - 1] == "M" && data[i - 1][j + 1] == "M" && data[i + 1][j - 1] == "S" && data[i + 1][j + 1] == "S") || 
                            (data[i - 1][j - 1] == "S" && data[i - 1][j + 1] == "S" && data[i + 1][j - 1] == "M" && data[i + 1][j + 1] == "M") || 
                            (data[i - 1][j - 1] == "S" && data[i - 1][j + 1] == "M" && data[i + 1][j - 1] == "S" && data[i + 1][j + 1] == "M") || 
                            (data[i - 1][j - 1] == "M" && data[i - 1][j + 1] == "S" && data[i + 1][j - 1] == "M" && data[i + 1][j + 1] == "S"))
                            {
                                sum++;
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
