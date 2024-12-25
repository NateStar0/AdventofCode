
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;
            let red = function(obj)
            {
                let lengths = new Array(obj[0].length).fill(-1);

                for(var i = 0; i < obj.length; i++)
                {
                    for(let j = 0; j < obj[i].length; j++)
                    {
                        if(obj[i][j] == "#") lengths[j]++;
                    }
                }

                return lengths
            }

            let keys = [];
            let locks = [];
            data.split("\n\n").map(kl => kl.split("\n").map(line => line.split(""))).forEach(kl => (kl[0][0] == "#") ? locks.push(kl) : keys.push(kl));
            
            for(let i = 0; i < locks.length; i++) locks[i] = red(locks[i]);
            for(let i = 0; i < keys.length; i++) keys[i] = red(keys[i]);

            for(let i = 0; i < locks.length; i++)
            {
                for(let j = 0; j < keys.length; j++)
                {
                    let lock = locks[i];
                    let key = keys[j];
                    let canAdd = true;

                    for(let n = 0; n < lock.length; n++)
                    {
                        if(lock[n] + key[n] > 5)
                        {
                            canAdd = false;
                        }
                    }

                    if(canAdd) sum++;
                }
            }

            return sum
        }

        let part2 = (data) =>
        {
            return "Merry Christmas!"
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
