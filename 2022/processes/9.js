
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(n => n.split(" "));

        class point
        {
            constructor (_x = 0, _y = 0)
            {
                this.x = _x;
                this.y = _y;
            }
        }

        let difference = (a, b) =>  Math.abs(a - b);

        let part1 = (data) =>
        {
            let head = new point();
            let tail = new point();

            let tails = new Set();

            for(var i = 0; i < data.length; i++)
            {
                let [direction, distance] = data[i];

                for(let n = 0; n < distance * 1; n++)
                {
                    switch(direction)
                    {
                        case "R": head.x++; break;
                        case "D": head.y--; break;
                        case "U": head.y++; break;
                        case "L": head.x--; break;
                    }

                    if (difference(tail.x, head.x) > 1 || difference(tail.y, head.y) > 1) 
                    {
                        tail.x += Math.sign(head.x - tail.x);
                        tail.y += Math.sign(head.y - tail.y);
                    }

                    tails.add(`${tail.x}, ${tail.y}`);
                }
                
            };

            return tails.size
        }

        let part2 = (data) =>
        {
            let points = new Array(10);
            let tails = new Set();

            for(let i = 0; i < 10; i++) points[i] = new point();

            for(var i = 0; i < data.length; i++)
            {
                let [direction, distance] = data[i];

                for(let n = 0; n < distance * 1; n++)
                {
                    switch(direction)
                    {
                        case "R": points[0].x++; break;
                        case "D": points[0].y--; break;
                        case "U": points[0].y++; break;
                        case "L": points[0].x--; break;
                    }

                    for(let j = 0; j < points.length - 1; j++)
                    {
                        if (difference(points[j + 1].x, points[j].x) > 1 || difference(points[j + 1].y, points[j].y) > 1) 
                        {
                            points[j + 1].x += Math.sign(points[j].x - points[j + 1].x);
                            points[j + 1].y += Math.sign(points[j].y - points[j + 1].y);
                        }
                    }

                    tails.add(`${points[points.length - 1].x}, ${points[points.length - 1].y}`);
                }
                
            };

            return tails.size
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
