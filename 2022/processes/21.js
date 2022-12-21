
module.exports = 
{
    run(data)
    {
        let monkeys = data.replace(/ /g, "").split("\n").map(n => {
            n = n.split(":");

            let monkey = n[0]
            let val = (n[1] * 1 == n[1]) ? n[1] * 1 : n[1]

            return {monkey, val}
        })

        let known = [];
        let unknown = [];

        monkeys.forEach(element => {
            if(element.val * 1 == element.val)
            {
                known[element.monkey] = (element.val);
            }
            else
            {
                unknown.push(element);
            }
        });

        let part1 = (data) =>
        {
            while(unknown.length > 0)
            {
                unknown.forEach(m =>
                {
                    let result = NaN;
                    let q = m.val;

                    if(q.includes("+")) result = known[q.split("+")[0]] + known[q.split("+")[1]];
                    if(q.includes("-")) result = known[q.split("-")[0]] - known[q.split("-")[1]];
                    if(q.includes("*")) result = known[q.split("*")[0]] * known[q.split("*")[1]];
                    if(q.includes("/")) result = known[q.split("/")[0]] / known[q.split("/")[1]];

                    if(!isNaN(result))
                    {
                        known[m.monkey] = result;
                        unknown.splice(unknown.indexOf(m), 1);
                    }

                    
                })

                //console.log([known, unknown])
            }

            return known.root//[known, unknown];
        }

        let part2 = (data) =>
        {
            let i = 3353687996000;

            while(true)
            {
                i++

                let known = [];
                let unknown = [];

                monkeys.forEach(element => {

                    if(element.monkey == "root") element.val = element.val.replace("+", "=");

                    if(element.val * 1 == element.val)
                    {
                        known[element.monkey] = (element.val);
                    }
                    else
                    {
                        unknown.push(element);
                    }
                });

                known.humn = i;

                while(unknown.length > 0)
                {
                    unknown.forEach(m =>
                    {
                        let result = NaN;
                        let q = m.val;

                        if(q.includes("=")) result = (known[q.split("=")[0]] !== undefined && known[q.split("=")[1]] !== undefined) ? known[q.split("=")[0]] == known[q.split("=")[1]] : NaN;
                        if(q.includes("+")) result = known[q.split("+")[0]] + known[q.split("+")[1]];
                        if(q.includes("-")) result = known[q.split("-")[0]] - known[q.split("-")[1]];
                        if(q.includes("*")) result = known[q.split("*")[0]] * known[q.split("*")[1]];
                        if(q.includes("/")) result = known[q.split("/")[0]] / known[q.split("/")[1]];

                        if(!isNaN(result) || typeof result == "boolean")
                        {
                            known[m.monkey] = result;
                            unknown.splice(unknown.indexOf(m), 1);
                        }           
                    })
                }

                if(known.root) return i;
            }
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
