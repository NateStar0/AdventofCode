
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n").map(line=> line.split("-").sort());
            let connections = new Map();
            let sum = 0;

            for (let i = 0; i < data.length; i++) 
            {
                let [left, right] = data[i];

                if (!connections.has(left)) connections.set(left,[right]);
                else connections.get(left).push(right);

                if (!connections.has(right)) connections.set(right,[left]);
                else connections.get(right).push(left);
            }

            let groups = new Set();

            connections.forEach((primaryValue, primaryKey) =>
            {
                for (let i = 0; i < primaryValue.length; i++) 
                {
                    for (let j = 0; j < primaryValue.length; j++) 
                    {
                        if (connections.get(primaryValue[i]).includes(primaryValue[j]) || connections.get(primaryValue[j]).includes(primaryValue[i])) 
                        {
                            groups.add([primaryKey, primaryValue[i], primaryValue[j]].sort().join(","))
                        }
                        
                    }
                }
            })

            groups.forEach(group =>
            {
                let groupDealt = false;

                group.split(",").map(computer => {
                    if(computer.startsWith('t') && !groupDealt)
                    {
                        sum++;
                        groupDealt = true;
                    }
                })
            })

            return sum;
        }

        let part2 = (data) =>
        {
            data = data.split("\n").map(line=> line.split("-").sort());
            let connections = new Map();
            let sum = 0;

            for (let i = 0; i < data.length; i++) 
            {
                let [left, right] = data[i];

                if (!connections.has(left)) connections.set(left,[right]);
                else connections.get(left).push(right);

                if (!connections.has(right)) connections.set(right,[left]);
                else connections.get(right).push(left);
            }

            let biggestGroup = new Set();

            // I never did the oathfinding shit in HS, that was covered in maths standard, not advanced :pensivebrew:

            return [...biggestGroup.values()].sort().join(",");
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
