
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let mods = {};
            let inputs = {};

            data.split("\n").forEach((l) => 
            {
                let { groups: { t, k, m }, } = l.match(/(?<t>[%&]?)(?<k>.+) -> (?<m>.+)/);
                mods[k] = { t, to: m.split(", "), s: 0 };
                
                m.split(", ").forEach((m) => 
                    {
                    inputs[m] ??= {};
                    inputs[m][k] = 0;
                    });
            });
              
            let sum = [0, 0];
            const queue = [];
            
            for (let i = 0; i < 1000; i++) 
            {
                sum[0]++;
                queue.push(["button", "broadcaster", 0]);

                while (queue.length) 
                {
                    let [from, mod, pulse] = queue.shift();

                    if (mod === "output") continue;
                    if (mod === "rx") continue;

                    const { t, to, s } = mods[mod];

                    if (mod === "broadcaster") 
                    {
                        for (const m of to) 
                        {
                            queue.push([mod, m, pulse]);
                            sum[pulse]++;
                        }
                        continue;
                    }

                    if (t === "%" && pulse === 0) 
                    {
                        mods[mod].s = s ? 0 : 1;
                        const nPulse = s ? 0 : 1;
                        for (const m of mods[mod].to)
                        queue.push([mod, m, nPulse]), sum[nPulse]++;
                        continue;
                    }

                    if (t === "&") 
                    {
                        inputs[mod][from] = pulse;
                        const nPulse = Object.values(inputs[mod]).every(Boolean) ? 0 : 1;
                        for (const m of to) queue.push([mod, m, nPulse]), sum[nPulse]++;
                        continue;
                    }
                }
            }
              
            return sum[0] * sum[1];
        }

        let part2 = (data) =>
        {
            let mods = {};
            let inputs = {};

            data.split("\n").forEach((l) => 
            {
                let { groups: { t, k, m }, } = l.match(/(?<t>[%&]?)(?<k>.+) -> (?<m>.+)/);
                mods[k] = { t, to: m.split(", "), s: 0 };
                
                m.split(", ").forEach((m) => 
                    {
                    inputs[m] ??= {};
                    inputs[m][k] = 0;
                    });
            });
              
            let sum = [0, 0];
            const queue = [];

            let n = 0;
            let i = 0
            
            for (; n == 0; i++) 
            {
                sum[0]++;
                queue.push(["button", "broadcaster", 0]);

                while (queue.length) 
                {
                    let [from, mod, pulse] = queue.shift();

                    if (mod === "rx")
                    {
                        n += (pulse == 0) ? 1 : 0;
                    }
                    else
                    {
                        if (mod === "output") continue;

                        const { t, to, s } = mods[mod];

                        if (mod === "broadcaster") 
                        {
                            for (const m of to) 
                            {
                                queue.push([mod, m, pulse]);
                                sum[pulse]++;
                            }
                            continue;
                        }

                        if (t === "%" && pulse === 0) 
                        {
                            mods[mod].s = s ? 0 : 1;
                            const nPulse = s ? 0 : 1;
                            for (const m of mods[mod].to)
                            queue.push([mod, m, nPulse]), sum[nPulse]++;
                            continue;
                        }

                        if (t === "&") 
                        {
                            inputs[mod][from] = pulse;
                            const nPulse = Object.values(inputs[mod]).every(Boolean) ? 0 : 1;
                            for (const m of to) queue.push([mod, m, nPulse]), sum[nPulse]++;
                            continue;
                        }
                    }
                }
            }
              
            return sum.reduce((acc, val) => acc + val, 0)
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
