
module.exports = 
{
    run(data)
    {
        data = data.split("\n");

        let dirs = {};
        let dirstack = [];
                
        for(let i = 0; i < data.length; i++)
        {
            let [isCommand, func, arg] = data[i].split(" ");

            if(isCommand == "$")
            {
                // Is a command
                // Ignore ls

                if(func == "cd")
                {
                    if(arg == "..")
                    {
                        dirstack.pop();
                    }
                    else
                    {
                        dirstack.push(arg);
                        dirs[dirstack] = dirs[dirstack] ?? {};
                    }
                }
            }
            else
            {
                //let [name, data] = data[i].split(" ").reverse();
                dirs[dirstack][data[i]] = 1;
            }
        }

        let dirsz = {};

        for(let i = 0; i < 10; i++) // Dont ask?
        {
            changed = false;
            mainLoop:

            for (let d in dirs) 
            {
                if (dirsz[d]) continue;

                for (let file in dirs[d]) 
                {
                    let [isDir, directory] = file.split(" ");

                    if (isDir == "dir" && dirsz[`${d},${directory}`] === undefined)
                    {
                        continue mainLoop;
                    }
                }

                let sum = 0;

                for (let file in dirs[d]) 
                {
                    let [isDir, directory] = file.split(" ");
                    sum += (isDir == 'dir') ? dirsz[`${d},${directory}`] : parseInt(file);
                }
                        
                dirsz[d] = sum;
            }
        }

        let part1 = (data) =>
        {     
            let sum = 0;

            for (let d in dirs) 
            {
                if (dirsz[d] <= 100000)
                {
                    sum += dirsz[d];
                } 
            }

            return sum;
        }

        let part2 = (data) =>
        {
            let spaceGoal = 30000000 - (70000000 - dirsz["/"]);
            let smallest = [];
                
            for (let d in dirs) 
            {
                if (dirsz[d] >= spaceGoal)
                { 
                    smallest.push(dirsz[d]);
                }
            }

            smallest.sort((a, b) => a - b)

            return smallest[0];
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
