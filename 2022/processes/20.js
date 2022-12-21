
module.exports = 
{
    run(data)
    {
        Array.prototype.insert = function ( index, ...items ) {
            this.splice( index, 0, ...items );
        };

        data = data.split("\n").map(Number);

        let mix = (data, count) =>
        {
            data = data.map(x => ({ n: x }))
            let originalOrder = [...data]

            for (let mixCount = 0; mixCount < count; mixCount++) 
            {
                originalOrder.forEach((num) => 
                {
                    let index = data.indexOf(num)

                    data.splice(index, 1)

                    let target = index + num.n

                    if (target < 0) target += data.length * Math.abs(Math.floor(target / data.length))
                    if (target >= data.length) target = target % data.length

                    data.splice(target, 0, num)
                });
            }

            return data.map(x => x.n);
        }

        let part1 = (data) =>
        {
            let mixed = mix(data, 1);

            return [
                mixed[(1000 + mixed.indexOf(0)) % mixed.length],
                mixed[(2000 + mixed.indexOf(0)) % mixed.length],
                mixed[(3000 + mixed.indexOf(0)) % mixed.length]
            ].reduce((acc, i) => acc += i, 0)
        }

        let part2 = (data) =>
        {
            data = data.map(n => n * 811589153)
            let mixed = mix(data, 10);

            return [
                mixed[(1000 + mixed.indexOf(0)) % mixed.length],
                mixed[(2000 + mixed.indexOf(0)) % mixed.length],
                mixed[(3000 + mixed.indexOf(0)) % mixed.length]
            ].reduce((acc, i) => acc += i, 0)
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
