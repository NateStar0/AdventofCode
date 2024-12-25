
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let values = new Map();
            let [knowns, operations] = data.split("\n\n");
            knowns = knowns.split("\n").map(line => line.split(": ")).forEach((line) => values.set(line[0], line[1] * 1));
            operations = operations.split("\n")
            
            let undoneQueue = [];

            while(operations.length > 0)
            {
                let operation = operations.shift();
                let [op, out] = operation.split(" -> ");
                let [a, gate, b] = op.split(" ");

                if(!values.has(a) || !values.has(b))
                {
                    undoneQueue.push(operation);
                }
                else
                {
                    let result = 0;
                    switch(gate)
                    {
                        case "AND":
                            result = (values.get(a) && values.get(b))
                        break;

                        case "XOR":
                            result = (values.get(a) ^ values.get(b))
                        break;

                        case "OR":
                            result = (values.get(a) || values.get(b))
                        break;
                    }

                    values.set(out, result);
                }

                if(operations.length == 0 && undoneQueue.length > 0)
                {
                    operations = undoneQueue;
                }
            }

            let zs = [];
            values.forEach((value, key) =>
            {
                if(key.startsWith("z"))
                {
                    let ind = key.split("z")[1] * 1;
                    zs[ind] = value;
                }
            })

            return parseInt(zs.reverse().join(""), 2)
        }

        let part2 = (data) =>
        {
            let values = new Map();
            let [knowns, operations] = data.split("\n\n");
            knowns = knowns.split("\n").map(line => line.split(": ")).forEach((line) => values.set(line[0], line[1] * 1));
            operations = operations.split("\n")
            
            let undoneQueue = [];

            while(operations.length > 0)
            {
                let operation = operations.shift();
                let [op, out] = operation.split(" -> ");
                let [a, gate, b] = op.split(" ");

                if(!values.has(a) || !values.has(b))
                {
                    undoneQueue.push(operation);
                }
                else
                {
                    let result = 0;
                    switch(gate)
                    {
                        case "AND":
                            result = (values.get(a) && values.get(b))
                        break;

                        case "XOR":
                            result = (values.get(a) ^ values.get(b))
                        break;

                        case "OR":
                            result = (values.get(a) || values.get(b))
                        break;
                    }

                    values.set(out, result);
                }

                if(operations.length == 0 && undoneQueue.length > 0)
                {
                    operations = undoneQueue;
                }
            }

            let zs = [];
            values.forEach((value, key) =>
            {
                console.log(value, key)
                if(key.startsWith("z"))
                {
                    let ind = key.split("z")[1] * 1;
                    zs[ind] = value;
                }
            })

            return parseInt(zs.reverse().join(""), 2)
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
