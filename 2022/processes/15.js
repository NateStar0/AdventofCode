
module.exports = 
{
    run(data)
    {
        let manDist = (p1, p2) =>
        {
            return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
        }

        let pointInRectangle = (p1, r1, r2) =>
        {
            let minx = Math.min(r1.x, r2.x);
            let maxx = Math.max(r1.x, r2.x);

            let miny = Math.min(r1.y, r2.y);
            let maxy = Math.max(r1.y, r2.y);

            return (p1.x >= minx && p1.x <= maxx && p1.y >= miny && p1.y <= maxy)
        }

        class point
        {
            constructor (_x = 0, _y = 0)
            {
                this.x = _x;
                this.y = _y;
            }
        }

         data = data.split("\n").map(n => 
            {
                let vals = n.match(/[-\d]+/g).map(Number);
                let sensor = {x : vals[0], y : vals[1]};
                let beacon = {x : vals[2], y : vals[3]};

                let distance = manDist(sensor, beacon);

                return { sensor, beacon, distance }
            })

        let part1 = (data) =>
        {

            const targetRow = {};

            data.forEach(line =>
            {
                if (line.beacon.y === 2000000) 
                {
                    targetRow[line.beacon.x] = 0;
                }

                const dx = line.distance - Math.abs(line.sensor.y - 2000000);

                for (let n = line.sensor.x - dx; n <= line.sensor.x + dx; n++) 
                {
                    if (targetRow[n] !== 0) 
                    {
                        targetRow[n] = 1;
                    }
                }
            })

            return Object.values(targetRow).reduce((acc, n) => acc + n)
        }

        let inter = (a, b, c, d) =>
        {
            // Two lines
            // Line 1
            let dY1 = a;

            // Line 2

            // intersection

        }

        let part2 = (data) =>
        {
            let intersect = (a, b, c, d) => 
            {
                let a1 = b.y - a.y;
                let b1 = a.x - b.x;

                let c1 = a1 * a.x + b1 * a.y;
              
                let a2 = d.y - c.y;
                let b2 = c.x - d.x;

                let c2 = a2 * c.x + b2 * c.y;
              
                let de = a1 * b2 - a2 * b1;
              
                let x = Math.round((b2 * c1 - b1 * c2) / de);
                let y = Math.round((a1 * c2 - a2 * c1) / de);

                return new point(x, y);
              }
              
                let sensors = [];
                let diamonds = [];

                data.forEach(line => 
                {
                  sensors.push([line.sensor.x, line.sensor.y, line.distance]);

                  diamonds.push([
                    new point(line.sensor.x + (line.distance + 1), line.sensor.y), // Right
                    new point(line.sensor.x, line.sensor.y + (line.distance + 1)), // Down
                    new point(line.sensor.x - (line.distance + 1), line.sensor.y), // Left
                    new point(line.sensor.x, line.sensor.y - (line.distance + 1)), // Up
                  ]);
                })
              
                for (let i = 0; i < diamonds.length - 1; i++) 
                {
                    let diamondFirst = diamonds[i];

                    for (let j = i + 1; j < diamonds.length; j++) 
                    {
                        let diamondSecond = diamonds[j];
                        for (let n of [0, 1, 2, 3]) 
                        {
                            for (let m of [n + 1, n + 3]) 
                            {
                                let interPoint = intersect(
                                        diamondFirst[n],
                                        diamondFirst[(n + 1) % 4],
                                        diamondSecond[m % 4],
                                        diamondSecond[(m + 1) % 4]
                                    );

                                if (pointInRectangle(interPoint, new point(0, 0), new point(4000000, 4000000)) && sensors.every(([x, y, d]) => manDist({x : x, y : y}, interPoint) > d)) 
                                {
                                    return 4000000 * interPoint.x + interPoint.y;
                                }
                            }
                        }
                    }
                }
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
