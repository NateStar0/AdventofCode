
module.exports = 
{
    run(data)
    {
        let split = (str, index) =>
        {
            return [str.slice(0, index), str.slice(index)];
        }

        let priority = (char) =>
        {
            return (char.toUpperCase() == char) ? char.charCodeAt(0) - 64 + 26 : char.charCodeAt(0) - 96;
        }

        data = data.split("\n")

        let part1 = (data) =>
        {
            let bags = data.map(n => split(n, n.length / 2))
            let sum = 0;

            bags.forEach(bag => 
            {
               for(let i = 0; i < bag[0].length; i++)
               {
                    for(let j = 0; j < bag[0].length; j++)
                    {
                        if(bag[0].charAt(i) == bag[1].charAt(j))
                        {
                            sum += priority(bag[0].charAt(i));
                            return;
                        }
                    }
               }
            });

            console.log(sum)
        }

        let part2 = (data) =>
        {
            let teams = [];
            let sum = 0;

            for(let i = 0; i < data.length; i += 3)
            {
                teams.push([data[i], data[i + 1], data[i + 2]])
            }

            teams.forEach(team =>
            {
                for(let i = 0; i < team[0].length; i++)
                {
                    let char = team[0].charAt(i);

                    if(team[1].includes(char) && team[2].includes(char))
                    {
                        console.log(char)
                        sum += priority(char);
                        return
                    }
                }
            })

            console.log(sum)
        }
        
        part1(data);
        part2(data);
    }
}
