
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;

            data.replace(/  /g, " ")
                .split("\n")
                    .map(card => card.split(": ")[1].split(" | ")
                        .map(numbers => numbers.split(" ").map(Number)))
                    .forEach(card =>
                    {
                        let tally = 0;

                        card[0].forEach(num =>
                        {
                            tally += (card[1].includes(num) ? 1 : 0)
                        })

                        sum += (tally == 0) ? 0 : Math.pow(2, tally - 1);
                    })
                    
            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;
            let cards = data.replace(/  /g, " ").split("\n")
                    .map(card => card.split(": ")[1].split(" | ")
                        .map(numbers => numbers.split(" ").map(Number)))

            let doCard = (index) =>
            {
                let card = cards[index];
                let tally = 0;

                card[0].forEach(num =>
                {
                    tally += (card[1].includes(num) ? 1 : 0)
                })

                for(let i = 0; i < tally; i++)
                {
                    doCard(index + 1 + i);
                }

                sum++;
            }

            for(let i = 0; i < cards.length; i++)
            {
                doCard(i);
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
