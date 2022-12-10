
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(n => n.split(" "));

        let part1 = (data) =>
        {
            let x = 1;
            let tick = 0;

            let sum = 0;

            let cycle = () =>
            {
                tick ++;

                if(tick % 40 - 20 == 0)
                {
                    sum += x * tick;
                }
            }

            data.forEach(line => 
            {
                let [func, arg] = line;
                arg *= 1;

                switch(func)
                {
                    case "addx": 
                        cycle();
                        cycle();
                        x += arg;
                    break;

                    case "noop": 
                        cycle();
                    break;
                }
            });

            return sum;
        }

        let part2 = (data) =>
        {
            let x = 1;
            let tick = 0;

            let grid = "";

            console.log(grid)

            let cycle = () =>
            {
                let pix = tick % 40;

                grid += (pix == 0 ? '\n' : '') + ((Math.abs(pix - x) <= 1) ? "#" : " ")

                tick ++;
            }

            data.forEach(line => 
            {
                let [func, arg] = line;
                arg *= 1;

                switch(func)
                {
                    case "addx": 
                        cycle();
                        cycle();

                        x += arg;
                    break;

                    case "noop": 
                        cycle();
                    break;
                }
            });

            return grid;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
