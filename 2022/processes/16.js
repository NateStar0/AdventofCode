
var memoize = require("memoizee");

module.exports = 
{
    run(data)
    {
        let memo = func => 
        {
            let cache = new Map();
            return (...args) => 
            {
                let key = args.join();
                if (cache.has(key)) 
                {
                    return cache.get(key);
                } 
                else 
                {
                    let val = func(...args);
                    cache.set(key, val);

                    return val;
                }
            };
        };
                    
        data = new Map(
              data
                .split("\n")
                .map(line => /Valve (..) has flow rate=(\d+); tunnels? leads? to valves? (.*)/.exec(line))
                .map(([, valve, rate, valves]) => [valve, rate * 1, valves.split(", "),])
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([valve, rate, valves], i, arr) => [
                  1n << BigInt(i),
                  [
                    rate,
                    valves.map(v => 1n << BigInt(arr.findIndex(([valve]) => v === valve))),
                    valve,
                  ],
                ]));
          
        let shortestPath = graph => 
        {
            let keys = [...graph.keys()];
            let distMap = new Map(keys.map(k => [k, new Map(keys.map(l => [l, Number.MAX_SAFE_INTEGER])),]));

            keys.forEach(u => graph.get(u).map(v => distMap.get(u).set(v, 1)));
            keys.forEach(k => distMap.get(k).set(k, 0));
            keys.forEach(k => keys.forEach(i => keys.forEach(j => distMap.get(i).set(j, Math.min(distMap.get(i).get(j), distMap.get(i).get(k) + distMap.get(k).get(j))))));

            return distMap;
        };

        let part1 = (data) =>
        {
            let firstrun = false;
            let time = 30;

            let distMap = shortestPath(new Map([...data].map(([key, data]) => [key, data[1]])));
            let keys = [...data.keys()];
            let flow = new Map(keys.map(k => [k, data.get(k)[0]]));
          
            let START = 1n;
            
            let dfs = memo((valve, minutes, open, firstrun) =>
                keys
                    .filter(k => !(open & k) && flow.get(k) && distMap.get(valve).get(k) < minutes)
                    .map(k => 
                    {
                        let d = distMap.get(valve).get(k) + 1;
                        let timeleft = minutes - d;
                        return ( timeleft * flow.get(k) + dfs(k, timeleft, open | k, firstrun) );
                    })
                    .reduce((max, v) => (max > v ? max : v), firstrun ? dfs(START, time, open, false) : 0)
                );

            return dfs(START, time, 0n, firstrun);
        }

        let part2 = (data) =>
        {   
            let firstrun = true;
            let time = 26;

            let distMap = shortestPath(new Map([...data].map(([key, data]) => [key, data[1]])));
            let keys = [...data.keys()];
            let flow = new Map(keys.map(k => [k, data.get(k)[0]]));
          
            let START = 1n;
            
            let dfs = memo((valve, minutes, open, firstrun) =>
                keys.filter(k => !(open & k) && flow.get(k) && distMap.get(valve).get(k) < minutes)
                    .map(k => 
                    {
                        let d = distMap.get(valve).get(k) + 1;
                        let timeleft = minutes - d;
                        return ( timeleft * flow.get(k) + dfs(k, timeleft, open | k, firstrun) );
                    })
                    .reduce((max, v) => (max > v ? max : v), firstrun ? dfs(START, time, open, false) : 0));

            return dfs(START, time, 0n, firstrun);
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
