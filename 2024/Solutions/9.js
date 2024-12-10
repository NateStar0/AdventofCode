
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let disc = [];
            let id = 0;
            let sum = 0;

            data = data.split("").map(Number);

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i]; j++)
                {
                    if((i % 2 == 0))
                    {
                        disc.push(id);
                    }
                    else
                    {
                        disc.push(-1);
                    }
                }

                if((i % 2 == 0)) id++;
            }

            while(disc.includes(-1))
            {
                let last = disc.pop();
                while(last == -1)
                {
                    last = disc.pop();
                }

                for(let i = 0; i < disc.length; i++)
                {
                    if(disc[i] == -1)
                    {
                        disc[i] = last;
                        i = disc.length
                    }
                }
            }

            for(let i = 0; i < disc.length; i++)
            {
                sum += i * disc[i];
            }

            return sum
        }

        let part2 = (data) =>
        {
            let disc = [];
            let id = 0;
            let sum = 0;

            const countOccurrences = (arr, val) =>
                arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

            data = data.split("").map(Number);

            // Generate a disc.

            for(let i = 0; i < data.length; i++)
            {
                for(let j = 0; j < data[i]; j++)
                {
                    if((i % 2 == 0))
                    {
                        disc.push(id);
                    }
                    else
                    {
                        disc.push(-1);
                    }
                }

                if((i % 2 == 0)) id++;
            }

            let halfId = id / 2;
            id--;

            // Do all the other stuff

            while(id >= 0)
            {
                let count = countOccurrences(disc, id);
                let firstIndex = 0;

                for(let i = 0; i < disc.length; i++)
                {
                    if(disc[i] == id)
                    {
                        firstIndex = i;
                        i = disc.length;
                    }
                }

                for(let i = 0; i < disc.length - count; i++)
                {
                    var canPlace = firstIndex > i;
                    for(let j = 0; j < count; j++)
                    {
                        if(disc[i + j] !== -1)
                        {
                            canPlace = false;
                        }
                    }

                    if(canPlace)
                    {
                        for(let j = 0; j < count; j++)
                        {
                            disc[i + j] = id;
                            disc[j + firstIndex] = -1;
                        }

                        i = disc.length
                    }
                }

                id -= 1;
            }

            // Count the checksum

            for(let i = 0; i < disc.length; i++)
            {
                sum += (disc[i] == -1) ? 0 : i * disc[i];
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
