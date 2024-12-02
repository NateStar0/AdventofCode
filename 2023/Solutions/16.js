
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n");

            let slash = { u: "r", d: "l", l: "d", r: "u" };
            let backslash = { u: "l", d: "r", l: "u", r: "d" };
            let dash = { u: ["l", "r"], d: ["l", "r"], l: ["l"], r: ["r"] };
            let pipe = { u: ["u"], d: ["d"], l: ["u", "d"], r: ["u", "d"] };

            let sum = 0;

            let test = (dir, pos) => 
            {
                let set = new Set();
                let arr = [];

                function move(dir, pos) 
                {
                    switch(dir)
                    {
                        case "u":  pos[0]--; break;
                        case "d":  pos[0]++; break;
                        case "l":  pos[1]--; break;
                        case "r":  pos[1]++; break;
                    }

                    if (pos[0] < 0 || pos[0] > data.length - 1 || pos[1] < 0 || pos[1] > data[0].length - 1) return;

                    set.add(pos.toString());

                    if (arr.includes(pos.toString() + "," + dir)) return;
                    arr.push(pos.toString() + "," + dir);
 
                    switch(data[pos[0]][pos[1]])
                    {
                        case ".": move(dir, [...pos]); break;
                        case "\\": move(backslash[dir], [...pos]); break;
                        case "/": move(slash[dir], [...pos]); break;
                        case "-": for (let x of dash[dir]) move(x, [...pos]); break;
                        case "|": for (let x of pipe[dir]) move(x, [...pos]); break;
                    }

                    return;
                }

                move(dir, pos);

                sum = sum || set.size;
                return;
            }

            test("r", [0, -1]);

            return sum
        }

        let part2 = (data) =>
        {
            data = data.split("\n");

            let slash = { u: "r", d: "l", l: "d", r: "u" };
            let backslash = { u: "l", d: "r", l: "u", r: "d" };
            let dash = { u: ["l", "r"], d: ["l", "r"], l: ["l"], r: ["r"] };
            let pipe = { u: ["u"], d: ["d"], l: ["u", "d"], r: ["u", "d"] };

            let sum = 0;

            let test = (dir, pos) => 
            {
                let set = new Set();
                let arr = [];

                function move(dir, pos) 
                {
                    switch(dir)
                    {
                        case "u":  pos[0]--; break;
                        case "d":  pos[0]++; break;
                        case "l":  pos[1]--; break;
                        case "r":  pos[1]++; break;
                    }

                    if (pos[0] < 0 || pos[0] > data.length - 1 || pos[1] < 0 || pos[1] > data[0].length - 1) return;

                    set.add(pos.toString());

                    if (arr.includes(pos.toString() + "," + dir)) return;
                    arr.push(pos.toString() + "," + dir);
 
                    switch(data[pos[0]][pos[1]])
                    {
                        case ".": move(dir, [...pos]); break;
                        case "\\": move(backslash[dir], [...pos]); break;
                        case "/": move(slash[dir], [...pos]); break;
                        case "-": for (let x of dash[dir]) move(x, [...pos]); break;
                        case "|": for (let x of pipe[dir]) move(x, [...pos]); break;
                    }

                    return;
                }

                move(dir, pos);

                sum = Math.max(sum, set.size);

                return;
            }

            test("r", [0, -1]);

            for (let i = 0; i < data.length - 1; i++) 
            {
                test("r", [i, -1]);
                test("l", [i, data[0].length - 1 + 1]);
            }

            for (let i = 0; i < data[0].length - 1; i++) 
            {
                test("d", [-1, i]);
                test("u", [data.length - 1 + 1, i]);
            }

            return sum;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
