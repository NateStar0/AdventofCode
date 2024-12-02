
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;

            function arrayEquals(a, b) {
                return Array.isArray(a) &&
                    Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((val, index) => val === b[index]);
            }

            data = data.split("\n")
                    .map(line => line.split(" ").map(chunk =>
                        {
                            let chars = chunk.split("");
                            return (chars.includes("?")) ? chars : chunk.split(",").map(Number);
                        }))
                    .forEach(record =>
                    {
                        let [arrangement, potential] = record;
                        let tempSum = 0;

                        let count = arrangement.reduce((acc, val) => acc += (val == "?") ? 1 : 0, 0)
                        for(let i = 0; i < Math.pow(2, count + 1); i++)
                        {
                            let insertionString = i.toString(2).padStart(Math.pow(2, count).toString(2).length, "0").replace(/1/g, "#").replace(/0/g, ".");
                            let n = 0;
                            let temp = [];
                            for(let j = 0; j < arrangement.length; j++)
                            {
                                if(arrangement[j] == "?")
                                {
                                    temp.push(insertionString.charAt(n))
                                    n++
                                }
                                else
                                {
                                    temp.push(arrangement[j])
                                }
                            }

                            // verify
                            n = 0;
                            let series = [0];
                            for(let j = 0; j < arrangement.length; j++)
                            {
                                if(temp[j] == "#")
                                {
                                    series[n]++;
                                }
                                else
                                {
                                    if(series[n] >= 1)
                                    {
                                        series.push(0);
                                        n++
                                    }
                                }
                            }

                            
                            const index = series.indexOf(0);
                            if (index > -1) { // only splice array when item is found
                                series.splice(index, 1); // 2nd parameter means remove one item only
                            }

                            if(arrayEquals(series, potential))
                            {
                                tempSum++;
                            }

                            //console.log(temp.join(""), series, potential, arrayEquals(series, potential))
                        }
                        sum += tempSum / 2;
                    })

            return sum;
        }

        let part2 = (data) =>
        {
            data = data.replace(/\n$/, "").split('\n')
                .map(v => v.split(' ')).map(v => [v[0], v[1].split(',').map(u => parseInt(u))])
            J = (a, b) =>
                a.split('')
                    .map((v, k) => (b[k] != '?' && b[k] != a[k]) ? 0 : 1).reduce((a, b) => a * b)
            C = (q, d) => {
                if (q.length == 0) { return 0 + (d.length == 0) }
                if (d.length == 0 && q.length > 0) { return 1 - q.includes('#') }
                let s = 0
                for (let i = 0; i <= q.length - d[0]; i++) {
                    let w = '#'.repeat(d[0])
                    if (d.length > 1) { w = w + '.' }
                    if (J(w, q.slice(i, i + w.length))) s += C(q.slice(i + w.length), d.slice(1))
                    if (q[i] == '#') break
                }
                return s }
            M = f => {
                var c = new Map()
                return function () {
                    var k = JSON.stringify(arguments);
                    if (c.has(k)) { return c.get(k) }
                    else {v = f.apply(null, arguments); c.set(k, v); return v}}}
            C = M(C)
            A = (q, d) => [[q, d], [q + ('?' + q).repeat(4), [].concat(...Array(5).fill(d))]]
            return data.map(v => A(...v).map((v, k) => C(...v)))
                .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
