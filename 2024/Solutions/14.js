
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let width = 101;
            let height = 103;
            let seconds = 100;

            let counts = [0, 0, 0, 0];

            data = data.split("\n").map(robot => robot.split(" ").map(coord => coord.split("=")[1].split(",").map(Number))).forEach(robot =>
            {
                let [pos, vel] = robot;

                for(let sec = 0; sec < seconds; sec++)
                {    
                    pos[0] += vel[0];
                    pos[1] += vel[1];

                    if(pos[0] >= width) pos[0] -= width;
                    if(pos[0] < 0) pos[0] += width;

                    if(pos[1] >= height) pos[1] -= height;
                    if(pos[1] < 0) pos[1] += height;
                }

                if(pos[0] > Math.floor(width / 2) && pos[1] < Math.floor(height / 2)) counts[0]++;
                if(pos[0] < Math.floor(width / 2) && pos[1] < Math.floor(height / 2)) counts[1]++;
                if(pos[0] > Math.floor(width / 2) && pos[1] > Math.floor(height / 2)) counts[2]++;
                if(pos[0] < Math.floor(width / 2) && pos[1] > Math.floor(height / 2)) counts[3]++;
            })

            return counts.reduce((acc, i) => acc *= i, acc = 1)
        }

        let part2 = (data) =>
        {
            let width = 101;
            let height = 103;
            let seconds = 100;
            let go = true;

            let counts = [0, 0, 0, 0];

            data = data.split("\n").map(robot => robot.split(" ").map(coord => coord.split("=")[1].split(",").map(Number)));

            for(var sec = 0; go; sec++)
            {
                let grid = new Array(width).fill(0);
                for(let i = 0; i < width; i++) grid[i] = new Array(height).fill(".");

                for(let i = 0; i < data.length; i++)
                {
                    let robot = data[i];
                    let [pos, vel] = robot;

                    pos[0] += vel[0];
                    pos[1] += vel[1];

                    if(pos[0] >= width) pos[0] -= width;
                    if(pos[0] < 0) pos[0] += width;

                    if(pos[1] >= height) pos[1] -= height;
                    if(pos[1] < 0) pos[1] += height;

                    if(pos[0] > Math.floor(width / 2) && pos[1] < Math.floor(height / 2)) counts[0]++;
                    if(pos[0] < Math.floor(width / 2) && pos[1] < Math.floor(height / 2)) counts[1]++;
                    if(pos[0] > Math.floor(width / 2) && pos[1] > Math.floor(height / 2)) counts[2]++;
                    if(pos[0] < Math.floor(width / 2) && pos[1] > Math.floor(height / 2)) counts[3]++;

                    grid[pos[0]][pos[1]] = "#";
                }

                let str = "";
                for(let i = 0; i < grid.length; i++)
                {
                    str += `${grid[i].join("")}\n`

                    if(grid[i].join("").includes("###########")) go = false
                }

                if(!go) console.log(str, sec)
            }
            
            return sec
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
