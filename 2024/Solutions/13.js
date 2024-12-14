
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n\n").map(machine => machine.split("\n").map(line => line.match(/-?\d+(\.\d+)?/g).map(Number)));

            let sum = 0;

            data.forEach(machine =>
            {
                let [a, b, goal] = machine;
                // goal[0] = A * a[0] + B * b[0]
                // goal[1] = A * a[1] + B * b[1]

                // Mult 0 by a[1], mult 1 by a[0]
                // goal[0] * a[1] = A * a[0] * a[1] + B * b[0] * a[1]
                // goal[1] * a[0] = A * a[1] * a[0] + B * b[1] * a[0]

                // goal[0] * a[1] - goal[1] * a[0] / (b[0] * a[1] - b[1] * a[0]) = B;

                let B = (goal[0] * a[1] - goal[1] * a[0]) / (b[0] * a[1] - b[1] * a[0])
                let A = (goal[0] - (B * b[0])) / a[0];

                let total = B + 3 * A;

                if(Number.isInteger(total) && A <= 100 && B <= 100)
                {
                    sum += total
                }
            })

            return sum
        }

        let part2 = (data) =>
        {
            data = data.split("\n\n").map(machine =>
                {
                    let [a, b, goal] = machine.split("\n").map(line => line.match(/-?\d+(\.\d+)?/g).map(Number));
    
                    goal[0] += 10000000000000;
                    goal[1] += 10000000000000;
    
                    return {a : a, b : b, goal : goal}
                })
    
                let sum = 0;
    
                data.forEach(machine =>
                {
                    let {a, b, goal} = machine;
    
                    let B = (goal[0] * a[1] - goal[1] * a[0]) / (b[0] * a[1] - b[1] * a[0])
                    let A = (goal[0] - (B * b[0])) / a[0];
    
                    let total = B + 3 * A;
    
                    if(Number.isInteger(total))
                    {
                        sum += total
                    }
                })
    
                return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
