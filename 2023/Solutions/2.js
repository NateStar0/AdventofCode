
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let games = data.split("\n").map(game => game.split(": ")[1].split("; ").map(indiv => indiv.split(", ").map(cubes => cubes.split(" "))))
            let limits = 
            {
                red : 12,
                green : 13,
                blue : 14
            }
            
            let sum = 0;

            for(var i = 0; i < games.length; i++)
            {
                var game = games[i];
                var fine = true;

                for(var j = 0; j < game.length; j++)
                {
                    var subsets = game[j];

                    for(var k = 0; k < subsets.length; k++)
                    {
                        for(var l = 0; l < subsets.length; l++)
                        {
                            var subset = subsets[l];

                            if(limits[subset[1]] < subset[0] * 1)
                            {
                                fine = false;
                            }
                        }
                    }
                }

                if(fine)
                {
                    sum += i + 1;
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;
            let games = data.split("\n")
                    .map(game => game.split(": ")[1]
                        .split("; ")
                            .map(indiv => indiv.split(", ")
                                .map(cubes => cubes.split(" "))))
            

            for(var i = 0; i < games.length; i++)
            {
                var game = games[i];
                let mimumums = 
                {
                    red : 1,
                    green: 1,
                    blue: 1
                }

                for(var j = 0; j < game.length; j++)
                {
                    var subsets = game[j];

                    for(var k = 0; k < subsets.length; k++)
                    {
                        for(var l = 0; l < subsets.length; l++)
                        {
                            var subset = subsets[l];

                            if(mimumums[subset[1]] < subset[0] * 1)
                            {
                                mimumums[subset[1]] = subset[0] * 1
                            }
                        }
                    }
                }

                sum += mimumums.red * mimumums.blue * mimumums.green;
            }

            return sum

        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
