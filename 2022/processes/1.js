
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let elves = data.split("\r\n\r\n").map(v => v.split("\r\n").map(Number));

            for(let i = 0; i < elves.length; i++)
            {
                elves[i] = elves[i].reduce((partialSum, a) => partialSum + a, 0);
            }

            console.log(elves.sort((a, b) => {return b - a})[0]);
        }

        let part2 = (data) =>
        {
            let elves = data.split("\r\n\r\n").map(v => v.split("\r\n").map(Number));

            for(let i = 0; i < elves.length; i++)
            {
                elves[i] = elves[i].reduce((partialSum, a) => partialSum + a, 0);
            }

            elves.sort((a, b) => {return b - a})

            console.log(elves[0] + elves[1] + elves[2]);
        }
        
        part1(data);
        part2(data);
    }
}