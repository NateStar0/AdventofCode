
module.exports = 
{
    run(data)
    {
        let TWOArray = (width, height)=>
        {
            var arr = new Array(width);
            for(let i = 0; i < arr.length; i++)
            {
                arr[i] = new Array(height);
            }

            return arr;
        }

        var [stacks, instructions] = data.split("\n\n");
        

        instructions = instructions.replace(/move /g, "").replace(/ from /g, ",").replace(/ to /g, ",").split("\n").map(n => n.split(",").map(Number))

        let part1 = (data) =>
        {

            var queues = TWOArray(32, 0);

            for(let i = 0; i < stacks.split("\n").length -1; i++)
            {
                for(let j = 1; j < stacks.split("\n")[0].length; j+=4)
                {
                    if(stacks.split("\n")[i].charAt(j) != " ")
                    {
                        queues[stacks.split("\n")[stacks.split("\n").length - 1].charAt(j) * 1].push(stacks.split("\n")[i].charAt(j))
                    }
                }
            }

            for(let i = 0; i < instructions.length; i++)
            {
                let [quantity, origin, destination] = instructions[i];
                let sliced = queues[origin].splice(0, quantity)

                for(let j = 0; j < sliced.length; j++)
                {
                    queues[destination].unshift(sliced[j]);
                }
            }
            
            let output = "";

            for(let i = 0; i < queues.length; i++)
            {
                if(queues[i][0] != undefined)
                {
                    output += queues[i][0];
                }
            }

            console.log(output)//, queues)
        }

        let part2 = (data) =>
        {
            var queues = TWOArray(32, 0);
            
            for(let i = 0; i < stacks.split("\n").length -1; i++)
            {
                for(let j = 1; j < stacks.split("\n")[0].length; j+=4)
                {
                    if(stacks.split("\n")[i].charAt(j) != " ")
                    {
                        queues[stacks.split("\n")[stacks.split("\n").length - 1].charAt(j) * 1].push(stacks.split("\n")[i].charAt(j))
                    }
                }
            }

            for(let i = 0; i < instructions.length; i++)
            {
                let [quantity, origin, destination] = instructions[i];
                let sliced = queues[origin].splice(0, quantity)

                for(let j = sliced.length - 1; j >= 0; j--)
                {
                    queues[destination].unshift(sliced[j]);
                }
            }
            
            let output = "";

            for(let i = 0; i < queues.length; i++)
            {
                if(queues[i][0] != undefined)
                {
                    output += queues[i][0];
                }
            }

            console.log(output)
        }
        
        part1(data);
        part2(data);
    }
}
