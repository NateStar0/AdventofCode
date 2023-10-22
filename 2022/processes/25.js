
module.exports = 
{
    run(data)
    {
        data = data.split("\n").map(n => n.split("").reverse())

        let MAPPING = "=-012";

        let toSNAFU = number =>
        [...number.toString(5)]
          .map(Number)
          .reduceRight(([res, carry], v) => ((v += carry), [[v > 2 ? v - 5 : v, ...res], v > 2 ? 1 : 0]), [[], 0])[0]
          .map(v => MAPPING[v + 2])
          .join("");

        let part1 = (data) =>
        {
            let base10 = data.reduce((acc, i) => 
            {
                let sum = 0;

                for(let j = 0; j < i.length; j++)
                {
                    sum += Math.pow(5, j) * (MAPPING.indexOf(i[j]) - 2);
                }

                return acc += sum;
            }, 0)

            console.log(base10)

            return toSNAFU(base10);
        }

        let part2 = (data) =>
        {
            return "AoC IS NOW COMPLETE! MERRY CHRISTMAS!";
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
