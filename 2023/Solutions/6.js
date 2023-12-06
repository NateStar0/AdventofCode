
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n");
            times = data[0].match(/\d+/g).map(Number);
            dists = data[1].match(/\d+/g).map(Number);
            wincount = new Array(times.length).fill(0);

            for(let i = 0; i < times.length; i++)
            {
                let time = times[i];
                let distance = dists[i];

                for(let j = 0; j < time - 1; j++)
                {
                    if((time - j) * j > distance)
                    {
                        wincount[i]++;
                    }
                }
            }
            
            return wincount.reduce((acc, val) => acc * val, 1);
        }

        let part2 = (data) =>
        {
            data = data.replace(/ /g, "").split("\n");
            times = data[0].match(/\d+/g).map(Number);
            dists = data[1].match(/\d+/g).map(Number);
            wincount = new Array(times.length).fill(0);

            for(let i = 0; i < times.length; i++)
            {
                let time = times[i];
                let distance = dists[i];

                for(let j = 0; j < time; j++)
                {
                    if((time - j) * j > distance)
                    {
                        return time - j * 2 + 1;
                    }
                }
            }
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}

/*
Time:        53     71     78     80
Distance:   275   1181   1215   1524
*/
