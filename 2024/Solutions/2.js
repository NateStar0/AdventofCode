
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n").map(line => line.split(" ").map(Number));
            let sum = 0;
            
            data.forEach(line => 
            {
                let isSafe = true;
                let isIncreasing = Math.sign(line[0] - line[1])

                for(let i = 0; i < line.length - 1; i++)
                {
                    let delta = line[i] - line[i + 1]
                    if(Math.abs(delta) > 3 || Math.abs(delta) < 1 || Math.sign(delta) !== isIncreasing)
                    {
                        isSafe = false;
                    }
                }

                if(isSafe) sum++;
            })

            return sum
        }

        let part2 = (data) =>
        {
            data = data.split("\n").map(line => line.split(" ").map(Number));
            let sum = 0;

            let isSafeTest = function(line)
            {
                let isSafe = true;
                let isIncreasing = Math.sign(line[0] - line[1])

                for(let i = 0; i < line.length - 1; i++)
                {
                    let delta = line[i] - line[i + 1]
                    if(Math.abs(delta) > 3 || Math.abs(delta) < 1 || Math.sign(delta) !== isIncreasing)
                    {
                        isSafe = false;
                    }
                }

                return isSafe;
            }
            
            data.forEach(line => 
            {
                if(isSafeTest(line))
                {
                    sum++;
                }
                else
                {
                    let couldSave = false;

                    for(let i = 0; i < line.length; i++)
                    {
                        let testingArr = [];
                        for(let j = 0; j < line.length; j++)
                        {
                            if(j !== i)
                            {
                                testingArr.push(line[j]);
                            }
                        }

                        if(isSafeTest(testingArr))
                        {
                            couldSave = true;
                        }
                    }

                    if(couldSave)
                    {
                        sum++;
                    }
                }
            })

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
