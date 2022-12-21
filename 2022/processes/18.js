
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(m => m.split(',').map(Number));

        let part1 = (data) =>
        {
            let cubes = data;

            return cubes.reduce((acc, cube) => 
            {
                return acc + 6 - cubes.filter(alt => cube.reduce((a, v, i) => a + Math.abs(v - alt[i]), 0) == 1).length
            }, 0)
        }

        let part2 = (data) =>
        {
            
            let cubes = data;

            let water = []
            let processed = new Set()
            let cubeSet = new Set()
            let max = [0,0,0]
            let min = [20, 20, 20];
        
            let dirs = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];

            let reformat = cube => cube.join(',')
            let inRange = cube => cube.every((v, i) => v >= min[i] && v <= max[i]);
            let addCube = (c1, c2) => c1.map((v, i) => v+c2[i]);
            let cubeDist = (c1, c2) => c1.reduce((a, v, i) => a+Math.abs(v-c2[i]), 0);
            
            cubes.reduce((acc, c1) => 
            {
                cubeSet.add(reformat(c1));

                max = max.map((v, d) => Math.max(v, c1[d] + 1));
                min = min.map((v, d) => Math.min(v, c1[d] - 1));

                return acc + 6 - cubes.filter(c2 => cubeDist(c1, c2) == 1).length
            }, 0)
            
            let spread = cube => 
            {
                if (processed.has(reformat(cube))) return;

                processed.add(reformat(cube));
                water.push(cube);

                for (let i = 0; i < dirs.length; i++) 
                {
                    let targetCube = addCube(cube, dirs[i]);
                    if (inRange(targetCube) && !cubeSet.has(reformat(targetCube)))
                    {
                        spread(targetCube);
                    } 
                }
            }
            
            spread(min);
            
            return water.reduce((acc, c1) => acc+cubes.filter(c2 => cubeDist(c1, c2) == 1).length, 0);
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
