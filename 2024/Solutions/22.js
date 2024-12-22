
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let secretNumbers = data.split("\n").map(Number);

            let mix = (a, b) => { return a ^ b };
            let modulo = (x, n) => ((x % n) + n) % n
            let prune = (n) => modulo(n, 16777216)

            let newSecret = (n) =>
            {
                n = prune(mix(n, n * 64));
                n = prune(mix(n, Math.floor(n / 32)));
                n = prune(mix(n, n * 2048))
                return n;
            }

            for(let i = 0; i < 2000; i++)
            {
                for(let j = 0; j < secretNumbers.length; j++)
                {
                    secretNumbers[j] = newSecret(secretNumbers[j])
                }
            }

            return secretNumbers.reduce((i, acc) => acc += i, acc = 0)
        }

        let part2 = (data) =>
        {
            let secretNumbers = data.split("\n").map(Number);

            let mix = (a, b) => { return a ^ b };
            let modulo = (x, n) => ((x % n) + n) % n
            let prune = (n) => modulo(n, 16777216)

            let newSecret = (n) =>
            {
                n = prune(mix(n, n * 64));
                n = prune(mix(n, Math.floor(n / 32)));
                n = prune(mix(n, n * 2048))
                return n;
            }

            let first = (n) => String(n).split("").reverse().shift() * 1

            let yeilds = new Map();


            for(let i = 0; i < secretNumbers.length; i++)
            {
                let secretNumberSeries = [secretNumbers[i]];
                let deltas = [];

                for(let j = 0; j < 2001; j++)
                {
                    secretNumberSeries.push(newSecret(secretNumberSeries[j]));
                    deltas.push((first(secretNumberSeries[j]) - first(secretNumberSeries[j + 1])) * -1);
                }

                let hasDone = [];

                for(let j = 3; j < deltas.length; j++)
                {
                    let series = [deltas[j - 3], deltas[j - 2], deltas[j - 1], deltas[j]].join(",");
                    if(!hasDone.includes(series))
                    {
                        if(!yeilds.has(series))
                        {
                            yeilds.set(series, first(secretNumberSeries[j + 1]))
                        }
                        else
                        {
                            yeilds.set(series, first(secretNumberSeries[j + 1]) + yeilds.get(series))
                        }

                        hasDone.push(series)
                    }
                }
            }

            return Math.max(...yeilds.values())
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
