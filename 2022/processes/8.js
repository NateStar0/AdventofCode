
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(row => row.split("").map(Number));

        let part1 = (data) =>
        {
            let sum = 0;

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i].length; j++)
                {
                    
                    let tree = data[i][j];
                    let visible = false;

                    let sightLines = [[], [], [], []];

                    for(let topY = 0; topY < j; topY++) sightLines[2].push(data[i][topY]);
                    for(let bottomY = data[i].length - 1; bottomY > j; bottomY--) sightLines[3].push(data[i][bottomY]);

                    for(let leftX = 0; leftX < i; leftX++) sightLines[0].push(data[leftX][j]);
                    for(let rightX = data.length - 1; rightX > i; rightX--) sightLines[1].push(data[rightX][j]);

                    sightLines.forEach(line =>
                    {
                        let isGreater = false;
                        for(let n = 0; n < line.length; n++)
                        {
                            if(line[n] >= tree)
                            {
                                isGreater = true;
                            }
                        }

                        if(!isGreater)
                        {
                            visible = true;
                        }
                    })

                    if(visible) sum ++;

                }
            }

            return sum;
        }

        let part2 = (data) =>
        {
            let greatest = 0;

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i].length; j++)
                {
                    
                    let tree = data[i][j];

                    let sightLines = [[], [], [], []];
                    let visibleLines = [[], [], [], []]

                    for(let topY = 0; topY < j; topY++) sightLines[0].push(data[i][topY]);
                    for(let bottomY = data[i].length - 1; bottomY > j; bottomY--) sightLines[1].push(data[i][bottomY]);

                    for(let leftX = 0; leftX < i; leftX++) sightLines[2].push(data[leftX][j]);
                    for(let rightX = data.length - 1; rightX > i; rightX--) sightLines[3].push(data[rightX][j]);

                    //sightLines[1] = sightLines[1].reverse();
                    //sightLines[3] = sightLines[3].reverse();

                    for(let n = 0; n < sightLines.length; n++)
                    {
                        sightLines[n] = sightLines[n].reverse();
                        let doCopy = true;

                        for(let m = 0; m < sightLines[n].length; m++)
                        {
                            if(doCopy)
                            {
                                if(sightLines[n][m] < tree)
                                {
                                    visibleLines[n].push(sightLines[n][m]);
                                }
                                else
                                {
                                    visibleLines[n].push(sightLines[n][m]);
                                    doCopy = false;
                                }
                            }
                        }
                    }

                    let nGreatest = visibleLines[0].length * visibleLines[1].length * visibleLines[2].length * visibleLines[3].length;

                    if(nGreatest > greatest) greatest = nGreatest;
                    //onsole.log(nGreatest, i, j, tree, visibleLines, sightLines)
                }
            }

            return greatest;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
