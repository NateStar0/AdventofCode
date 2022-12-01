
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let elves = data.split("\n\n").map(v => v.split("\n").map(Number).reduce((sum, a) => sum + a, 0));
            console.log(elves.sort((a, b) => {return b - a})[0]);
        }

        let part2 = (data) =>
        {
            let elves = data.split("\n\n").map(v => v.split("\n").map(Number).reduce((sum, a) => sum + a, 0));
            elves.sort((a, b) => {return b - a});

            console.log(elves[0] + elves[1] + elves[2]);
        }
        
        part1(data);
        part2(data);
    }
}