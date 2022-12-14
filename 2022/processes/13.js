

module.exports = 
{
    run(data)
    {
        let compare = (a, b) =>
        {
            if (!a && a !== 0) return 1;
            if (!b && b !== 0) return -1;

            if (Array.isArray(a) || Array.isArray(b)) 
            {
                return compArr(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b])
            }

            if (a === b) return 0;
            return a < b ? 1 : -1;
        }

        let compArr = (a, b) =>
        {
            for (let i = 0; i < Math.max(a.length, b.length); i++) 
            {
                let fine = compare(a[i], b[i]);

                if (fine !== 0) return fine;
            }

            return 0;
        }

        data = data.split("\n\n").map(n => n.split("\n").map(m => {return JSON.parse(m)}));

        let part1 = (data) =>
        {
            let sum = [];

            for(let n = 0; n < data.length; n++)
            {
                let [first, second] = data[n];

                let order = compare(first, second);

                sum.push( (order > -1) ? n + 1 : 0);

            };

            return sum.reduce((acc, i) => acc += i, 0);
        }

        let part2 = (data) =>
        {
            let all = [[[2]], [[6]]];
            let sum = 1;
    
            data.forEach(pair => { all.push(pair[0], pair[1]) });
            all.sort((a, b) => compare(b, a));

            for(let i = 0; i < all.length; i++)
            {
                let e = all[i];

                if(compare(e, [[2]]) === 0 || compare(e, [[6]]) === 0) 
                {
                    sum *= (i + 1);
                }
            }

            return sum;
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
