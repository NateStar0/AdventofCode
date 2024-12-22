
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split("\n").map(line=>line.split(""));
            let visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
            let regions = {}; 
            
            let directions = [
                [-1, 0], // Up
                [1, 0],  // Down
                [0, -1], // Left
                [0, 1]   // Right
            ];
            
            function floodFill(r, c, letter) 
            {
                let queue = [[r, c]];
                let region = [];
                visited[r][c] = true;
            
                while (queue.length > 0) 
                {
                    let [x, y] = queue.shift();
                    region.push([x, y]);
                
                    for (let [dx, dy] of directions) 
                    {
                        let nx = x + dx;
                        let ny = y + dy;
                
                        if (
                        nx >= 0 && nx < data.length && // Valid row
                        ny >= 0 && ny < data[0].length && // Valid column
                        !visited[nx][ny] &&     // Not yet visited
                        data[nx][ny] === letter // Same letter
                        ) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                        }
                    }
                }
            
                return region;
            }
            
            for (let r = 0; r < data.length; r++) 
            {
                for (let c = 0; c < data[0].length; c++) 
                {
                    if (!visited[r][c]) 
                    {
                        if (!regions[data[r][c]]) 
                        {
                            regions[data[r][c]] = [];
                        }
                
                        let region = floodFill(r, c, data[r][c]);
                        regions[data[r][c]].push(region);
                    }
                }
            }

            let sum = 0;

            for(let char in regions)
            {
                let subregions = regions[char];
                subregions.forEach(subregion =>
                {
                    let area = subregion.length;
                    let per = 0;

                    let regHas = (x, y) =>
                    {
                        for(let i = 0; i < subregion.length; i++)
                        {
                            if(subregion[i][0] == x && subregion[i][1] == y) return true;
                        }
                        return false;
                    }

                    subregion.forEach(point =>
                    {
                        if(!regHas(point[0] - 1, point[1])) per++;
                        if(!regHas(point[0] + 1, point[1])) per++;
                        if(!regHas(point[0], point[1] - 1)) per++;
                        if(!regHas(point[0], point[1] + 1)) per++;
                    }
                    )

                    sum += area * per
                })
            }
            
            return sum
        }

        let part2 = (data) =>
        {
            data = data.split("\n").map(line=>line.split(""));
            let visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
            let regions = {}; 
            
            let directions = [
                [-1, 0], // Up
                [1, 0],  // Down
                [0, -1], // Left
                [0, 1]   // Right
            ];
            
            function floodFill(r, c, letter) 
            {
                let queue = [[r, c]];
                let region = [];
                visited[r][c] = true;
            
                while (queue.length > 0) 
                {
                    let [x, y] = queue.shift();
                    region.push([x, y]);
                
                    for (let [dx, dy] of directions) 
                    {
                        let nx = x + dx;
                        let ny = y + dy;
                
                        if (
                        nx >= 0 && nx < data.length && // Valid row
                        ny >= 0 && ny < data[0].length && // Valid column
                        !visited[nx][ny] &&     // Not yet visited
                        data[nx][ny] === letter // Same letter
                        ) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                        }
                    }
                }
            
                return region;
            }
            
            for (let r = 0; r < data.length; r++) 
            {
                for (let c = 0; c < data[0].length; c++) 
                {
                    if (!visited[r][c]) 
                    {
                        if (!regions[data[r][c]]) 
                        {
                            regions[data[r][c]] = [];
                        }
                
                        let region = floodFill(r, c, data[r][c]);
                        regions[data[r][c]].push(region);
                    }
                }
            }

            let sum = 0;

            for(let char in regions)
            {
                let subregions = regions[char];
                subregions.forEach(subregion =>
                {
                    let area = subregion.length;
                    let minX = subregion[0][0];
                    let minY = subregion[0][1];
                    let maxX = subregion[0][0];
                    let maxY = subregion[0][1];
                    let sides = 0;

                    let regHas = (x, y) =>
                    {
                        for(let i = 0; i < subregion.length; i++)
                        {
                            if(subregion[i][0] == x && subregion[i][1] == y) return true;
                        }
                        return false;
                    }

                    subregion.forEach(point =>
                    {
                        if(point[0] < minX) minX = point[0];
                        if(point[0] > maxX) maxX = point[0];
                        if(point[1] < minY) minY = point[1];
                        if(point[1] > maxY) maxY = point[1];
                    })

                    // left
                    for (let x = minX; x <= maxX; x++) 
                    {
                        let isEdge = regHas(x,minY) && !regHas(x-1,minY);
                        sides += isEdge;

                        for (let y = minY; y <= maxY; y++) 
                        {
                            let paraisEdge = isEdge;
                            isEdge = regHas(x,y) && !regHas(x-1,y);
                            sides += isEdge && !paraisEdge;
                        }
                    }

                    // right
                    for (let x = minX; x <= maxX; x++) 
                    {
                        let isEdge = regHas(x,minY) && !regHas(x+1,minY);
                        sides += isEdge;

                        for (let y = minY; y <= maxY; y++) 
                        {
                            
                            let paraisEdge = isEdge;
                            isEdge = regHas(x,y) && !regHas(x+1,y);
                            sides += isEdge && !paraisEdge;
                        }
                    }

                    // top 
                    for (let y = minY; y <= maxY; y++) 
                    {
                        let isEdge = regHas(minX,y) && !regHas(minX,y-1);
                        sides += isEdge;
                        
                        for (let x=minX;x<=maxX;x++) 
                        {
                            let paraisEdge = isEdge;
                            isEdge = regHas(x,y) && !regHas(x,y-1);
                            sides += isEdge && !paraisEdge;
                        }
                    }

                    // bottom
                    for (let y = minY; y <= maxY; y++) 
                    {
                        let isEdge = regHas(minX,y) && !regHas(minX,y+1);
                        sides += isEdge;
                        
                        for (let x = minX; x <= maxX; x++) 
                        {
                            let paraisEdge = isEdge;
                            isEdge = regHas(x,y) && !regHas(x,y+1);
                            sides += isEdge && !paraisEdge;
                        }
                    }

                    sum += area * sides
                })
            }

            return sum;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
