
const dk = require("dijkstrajs")

module.exports = 
{
    run(data)
    {
        let letters = "SabcdefghijklmnopqrstuvwxyzE"
        data = data.split("\n").map(n => n.split("").map(m => letters.indexOf(m)));

        let start = [0, 0];
        let end = [0, 0];

        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data[i].length; j++)
            {
                switch(data[i][j])
                {
                    case 0: 
                        start = [i, j].join(",");
                    break;
                    case 27: 
                        end = [i, j].join(",");
                    break;
                    default: break;
                }
            }
        }

        let graph = {};

        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < data[i].length; j++)
            {
                let links = {};

                if(i > 0)
                {
                    if(data[i][j] - data[i - 1][j] >= -1)
                    {
                        links[`${i - 1},${j}`] = 0;
                    }
                } 

                if(j > 0)
                {
                    if((data[i][j] - data[i][j - 1])  >= -1)
                    {
                        links[`${i},${j - 1}`] = 0;
                    }
                } 

                if(i < data.length - 1)
                {
                    if((data[i][j] - data[i + 1][j])  >= -1)
                    {
                        links[`${i + 1},${j}`] = 0;
                    }
                } 

                if(j < data[0].length - 1)
                {
                    if((data[i][j] - data[i][j + 1]) >= -1)
                    {
                        links[`${i},${j + 1}`] = 1;
                    }
                } 

                graph[`${i},${j}`] = links;
            }
        }

        let part1 = (data) =>
        {
            let path = dk.find_path(graph, start, end);

            return path.length - 1;
        }

        let part2 = (data) =>
        {
            let smallest = 9999999;

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i].length; j++)
                {
                    if(data[i][j] == letters.indexOf("a"))
                    {
                        try 
                        {
                            let p = dk.find_path(graph, `${i},${j}`, end).length - 1;

                            smallest = (p < smallest) ? p : smallest;
                        }
                        catch
                        {
                            break;
                        }
                    }
                }
            }

            return smallest;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
