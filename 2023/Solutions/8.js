
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.replace(/\(/g, "").replace(/\)/g, "").split("\n\n");
            instructions = data.shift().split("").map(character => (character == "L") ? 0 : 1);
            instructionIndex = 0;
            currentPosition = 'AAA';
            steps = 0;
            directions = data[0].split("\n").map(place => place.split(" = "));

            while(currentPosition != 'ZZZ')
            {
                let instruction = instructions[instructionIndex];
                instructionIndex++;
                if(instructionIndex == instructions.length) instructionIndex = 0;
                steps++;

                let ind = 0;
                for(let i = 0; i < directions.length; i++)
                {
                    if(currentPosition == directions[i][0])
                    {
                        ind = i;
                        break;
                    }
                }

                let LR = directions[ind][1].split(", ");
                currentPosition = LR[instruction]
            }

            return steps//[instructions, directions]
        }

        let part2 = (data) =>
        {
            data = data.split("\n\n")
            let instructions = data.shift().split('');
            let directions = {};
            let starts = [];

            let gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
            let lcm = (a, b) => a / gcd(a, b) * b;
            let lcmAll = arr => arr.reduce(lcm, 1);

            data[0].split("\n")
                    .forEach(line => 
                    {
                        let arr = line.split(/ =|\(|\)|\,/g);

                        directions[arr[0]] = {
                            L: arr[2], 
                            R: arr[3].trim()
                        }

                        if (arr[0][2] == 'A') starts.push(arr[0]);
                    })

            return lcmAll(starts.map((start) => 
            {
                let steps = 0;

                while (start[2] !== 'Z') 
                {
                    start = directions[start][instructions[steps % instructions.length]];
                    steps++;
                }

                return steps;
            }));
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
