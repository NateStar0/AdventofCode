
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n").map(l => l.split("   ").map(Number))
            let [left, right] = [[], []];
            let sum = 0;

            data.forEach(row => 
            {
                left.push(row[0]);
                right.push(row[1]);
            }
            );

            left.sort((a, b) => b - a);
            right.sort((a, b) => b - a);

            for(let i = 0; i < left.length; i++)
            {
                sum += Math.abs(left[i] - right[i])
            }

            return sum
        }

        let part2 = (data) =>
        {
            data = data.split("\n").map(l => l.split("   ").map(Number))
            let [left, right] = [[], []];
            let sum = 0;

            data.forEach(row => 
            {
                left.push(row[0]);
                right.push(row[1]);
            }
            );

            let count = right.reduce(function (value, value2) {
                return (
                    value[value2] ? ++value[value2] :(value[value2] = 1),
                    value
                );
            }, {});

            for(let i = 0; i < left.length; i++)
            {
                let freq = (count[left[i]] != undefined) ? count[left[i]] : 0;
                sum += freq * left[i];
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
