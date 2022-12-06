
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            for(let i = 3; i < data.length; i++)
            {
                let caught = [];

                for(let j = i - 3; j <= i; j++)
                {
                    let presence = data[j];

                    if(!caught.includes(presence))
                    {
                        caught.push(presence);
                    }
                }

                if(caught.length == 4)
                {
                    console.log(i + 1);
                    return;
                }
            }
        }

        let part2 = (data) =>
        {
            for(let i = 13; i < data.length; i++)
            {
                let caught = [];

                for(let j = i - 13; j <= i; j++)
                {
                    let presence = data[j];

                    if(!caught.includes(presence))
                    {
                        caught.push(presence);
                    }
                }

                if(caught.length == 14)
                {
                    console.log(i + 1);
                    return;
                }
            }
        }
        
        part1(data);
        part2(data);
    }
}
