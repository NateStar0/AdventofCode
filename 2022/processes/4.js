
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
                sum += (pair[0][0] <= pair[1][1] && pair[1][0] <= pair[0][1])

            });

            console.log(sum);
        }
        
        part1(data);
        part2(data);
    }
}
