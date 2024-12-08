
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;
            data = data.split("\n").map(line => line.split(": ").map(group => group.split(" ").map(Number)))
            data.forEach(operation =>
            {
                let [product, reactants] = operation;
                product = product[0];

                let operations = Math.pow(2, reactants.length - 1) - 1;
                let doAdd = false;

                for(let i = 0; i <= operations; i++)
                {
                    let opList = (i.toString(2).padStart(operations.toString(2).length, 0)).split("");
                    let acc = reactants[0]
                    for(let j = 0; j < opList.length; j++)
                    {
                        if(opList[j] == "1")
                        {
                            acc = acc * reactants[j + 1];
                        }
                        else
                        {
                            acc = acc + reactants[j + 1];
                        }
                    }

                    if(acc == product)
                    {
                        i = operations;
                        doAdd = true;
                    }          
                }

                if(doAdd)
                {
                    sum += product;
                }
            }
            )

            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;
            data = data.split("\n").map(line => line.split(": ").map(group => group.split(" ").map(Number)))
            data.forEach(operation =>
            {
                let [product, reactants] = operation;
                product = product[0];

                let operations = Math.pow(3, reactants.length - 1) - 1;
                let doAdd = false;

                for(let i = 0; i <= operations; i++)
                {
                    let opList = (i.toString(3).padStart(operations.toString(3).length, 0)).split("");
                    let acc = reactants[0]
                    for(let j = 0; j < opList.length; j++)
                    {
                        switch(opList[j])
                        {
                            case "0":
                                acc = acc * reactants[j + 1];
                            break;

                            case "1":
                                acc = acc + reactants[j + 1];
                            break;

                            case "2":
                                acc = (String(acc) + reactants[j + 1]) * 1;
                            break;
                        }
                    }

                    if(acc == product)
                    {
                        i = operations;
                        doAdd = true;
                    }          
                }

                if(doAdd)
                {
                    sum += product;
                }
            }
            )

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
