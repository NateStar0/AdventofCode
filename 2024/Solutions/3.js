
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let matches = data.match(/mul\(\s*([-+]?\d+(\.\d+)?),\s*([-+]?\d+(\.\d+)?)\s*\)/g);
            let sum = 0;

            matches.forEach(mulOp => 
                {
                    let values = mulOp.match(/[-+]?\d*\.?\d+/g).map(Number);
                    sum += values[0] * values[1]
                })

            return sum
        }

        let part2 = (data) =>
        {
            let matches = data.match(/(mul\(\s*([-+]?\d+(\.\d+)?),\s*([-+]?\d+(\.\d+)?)\s*\))|(do\(\))|(don't\(\))/g);
            let sum = 0;
            let enabled = true;

            matches.forEach(mulOp => 
                {
                    switch(mulOp.split("(")[0])
                    {   
                        case "mul": 
                            if(enabled)
                            {
                                let values = mulOp.match(/[-+]?\d*\.?\d+/g).map(Number);
                                sum += values[0] * values[1]
                            }
                        break;
                        case "do": enabled = true; break;
                        case "don't": enabled = false; break;
                    }
                })
                
            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
