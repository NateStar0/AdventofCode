
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
                return data.split("\n")
                            .map(line => 
                                line.split("")
                                    .map(char => char * 1)
                                    .filter((char) => !isNaN(char * 1)))
                            .map(val =>
                                {
                                    return val[0] * 10 + val[val.length - 1]
                                })
                            .reduce((acc, val) => acc + val, 0);
        }

        let part2 = (data) =>
        {
            let letterNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

            let numbers = data.split("\n")
                .map(line => [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)]
                    .map(match => match[1])
                    .map(n => /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1))
                    .map(val =>
                    {
                        return val[0] * 10 + val[val.length - 1]
                    })
                .reduce((acc, val) => acc + val, 0);

                return numbers
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
