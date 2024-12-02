
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            
            let next = (numbers) =>
            {
                if ([... new Set(numbers)].length == 1 && numbers[0] == 0) return 0;

                return (
                    numbers[numbers.length - 1] +
                    next(numbers.map((x, i) => x - (numbers[i - 1] || 0)).slice(1))
                );
            }
            
            return data.split("\n")
                .filter((line) => line.length > 0)
                .map((line) => line.split(" ").map((x) => parseInt(x)))
                .map((line) => next(line))
                .reduce((acc, val) => acc + val, 0);
        }

        let part2 = (data) =>
        {
            let prev = (numbers) =>
            {
                if ([... new Set(numbers)].length == 1 && numbers[0] == 0) return 0;

                return (
                    numbers[0] -
                    prev(numbers.map((x, i) => x - (numbers[i - 1] || 0)).slice(1))
                );
            }
            
            return data.split("\n")
                .filter((line) => line.length > 0)
                .map((line) => line.split(" ").map((x) => parseInt(x)))
                .map((line) => prev(line))
                .reduce((acc, val) => acc + val, 0);
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
