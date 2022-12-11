
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let monkeys = data.replace(/  /g, "")
                                .split("\n\n")
                                .map(n => 
                                    {
                                        n = n.split("\n").splice(1);

                                        let line = n[0].split(': ')[1].split(", ").map(a => BigInt(a))
                                        let operation = n[1].replace(/ /g, "").split("=")[1];
                                        let test = n[2].split("by ")[1] * 1;
                                        let tmonk = n[3].split("monkey ")[1] * 1;
                                        let fmonk = n[4].split("monkey ")[1] * 1;

                                        return {line, operation, test, tmonk, fmonk}
                                    });

            let times = new Array(monkeys.length).fill(0);

            for(let cycles = 0; cycles < 20; cycles++)
            {
                for(let i = 0; i < monkeys.length; i++)
                {
                    let monkey = monkeys[i];

                    while(monkey.line.length > 0)
                    {
                        times[i] ++;

                        let item = monkey.line.splice(0, 1)[0];

                        // Operation
                        item = Math.floor(eval(monkey.operation.replace(/old/g, item)) / 3)

                        // Test
                        let test = (item % (monkey.test) == 0)
                        monkeys[((test) ? (monkey.tmonk) : (monkey.fmonk))].line.push(item);
                    };
                }
            }

            times = times.sort((a, b) => b - a);

            return times[0] * times[1];
        }

        let part2 = (data) =>
        {
            let monkeys = data.replace(/  /g, "")
                                .split("\n\n")
                                .map(n => 
                                    {
                                        n = n.split("\n").splice(1);

                                        let line = n[0].split(': ')[1].split(", ").map(a => BigInt(a))
                                        let operation = n[1].replace(/ /g, "").split("=")[1];
                                        let test = n[2].split("by ")[1] * 1;
                                        let tmonk = n[3].split("monkey ")[1] * 1;
                                        let fmonk = n[4].split("monkey ")[1] * 1;

                                        return {line, operation, test, tmonk, fmonk}
                                    });

            let times = new Array(monkeys.length).fill(0);

            let highestValue = monkeys.reduce((acc, monkey) => acc *= monkey.test, 1);

            for(let cycles = 0; cycles < 10000; cycles++)
            {
                for(let i = 0; i < monkeys.length; i++)
                {
                    let monkey = monkeys[i];

                    while(monkey.line.length > 0)
                    {
                        times[i] ++;

                        let item = monkey.line.splice(0, 1)[0];

                        // Operation
                        item = eval(monkey.operation.replace(/old/g, item)) % highestValue

                        // Test
                        let test = (item % (monkey.test) == 0)
                        monkeys[((test) ? (monkey.tmonk) : (monkey.fmonk))].line.push(item);
                    };
                }
            }

            times = times.sort((a, b) => b - a);

            return times[0] * times[1];
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
