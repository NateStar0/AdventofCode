
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let imported = data.split("\n\n");

            seeds = imported.shift().split(": ")[1].split(" ").map(Number);
            imported = imported.map(n => n.split(":\n")[1].split("\n").map(line => line.split(" ").map(Number)))

            for(let i = 0; i < imported.length; i++)
            {
                let convMap = imported[i];

                for(let j = 0; j < seeds.length; j++)
                {
                    let seed = seeds[j];
                    let cont = true;

                    for(var k = 0; k < convMap.length; k++)
                    {
                        let nMap = convMap[k];
                        let [destination, source, range] = nMap;

                        if(cont)
                        {
                            if(seed >= source && seed <= source + range)
                            {
                                seeds[j] = (destination + (seed - source));
                                cont = false;
                            }
                        }
                    }
                }
            }
            
            return Math.min(...seeds)
        }

        let part2 = (data) =>
        {
            let imported = data.split("\n\n");

            seeds = imported.shift().split(": ")[1].split(" ").map(Number);
            imported = imported.map(n => n.split(":\n")[1].split("\n").map(line => line.split(" ").map(Number)))

            let temp = [];
            if(true)//for(let i = 0; i < seeds.length; i += 2)
            {
                for(let b = /*773371046*/ 920708046 - 1000; b < /*773371046 + 400582097*/  920708046 + 1000; b += 1)
                {
                    temp.push([b, b])
                }
            }


            //console.log(seeds)

            seeds = temp;

            console.log(seeds)

            for(let i = 0; i < imported.length; i++)
            {
                console.log(i)
                let convMap = imported[i];

                for(let j = 0; j < seeds.length; j++)
                {
                    let seed = seeds[j][0];
                    let cont = true;

                    for(var k = 0; k < convMap.length; k++)
                    {
                        let nMap = convMap[k];
                        let [destination, source, range] = nMap;

                        if(cont)
                        {
                            if(seed >= source && seed <= source + range)
                            {
                                seeds[j][0] = (destination + (seed - source));
                                cont = false;
                            }
                        }
                    }
                }
            }
            
            let small = [999_999_999_999, 0];

            for(var i = 0; i < seeds.length; i++)
            {
                if(seeds[i][0] < small[0])
                {
                    small = seeds[i]
                }
            }

            return small;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
