
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(n => n.split(",").map(m => m.split("-").map(Number)))
        let part1 = (data) =>
        {
            let sum = 0;

            data.forEach(pair => 
            {
                sum += (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) || (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]) * 1;
            });

            console.log(sum);
        }

        let part2 = (data) =>
        {
            let sum = 0;

            data.forEach(pair => 
            {
                let plots = [[], []];
                let hasnt = true;

                for(let j = 0; j <= 1; j++)
                {
                    for(let i = pair[j][0]; i <= pair[j][1]; i++)
                    {
                        plots[j][i - pair[j][0]] = i;
                    }
                }

                for(let i = 0; i < plots[0].length; i++)
                {
                    if(plots[1].includes(plots[0][i]) && hasnt)
                    {
                        sum ++;
                        hasnt = false;
                    }
                }

            });

            console.log(sum);
        }
        
        part1(data);
        part2(data);
    }
}
