
module.exports = 
{
    run(data)
    {
        data = data.split("\n\n").map(v => v.split("\n").map(Number).reduce((sum, a) => sum + a, 0));
        data.sort((a, b) => {return b - a});

        let part1 = (data) =>
        {
            return data[0]
        }

        let part2 = (data) =>
        {
            return data.splice(0, 3).reduce((acc, i) => acc += i, 0)
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
