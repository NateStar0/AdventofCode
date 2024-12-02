
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            const valueMap = {
                "T": 10,
                "J": 11,
                "Q": 12,
                "K": 13,
                "A": 14
            };
            
            function mapToCombinationValues(counts) {
                // Five of a kind
                if (Object.keys(counts).length == 1)
                    return 6;
            
                if (Object.keys(counts).length == 2) {
                    let values = Object.values(counts);
            
                    // Four of a kind
                    if (values.includes(4))
                        return 5;
            
                    // Full house
                    if (values.includes(3))
                        return 4;
                }
            
                if (Object.keys(counts).length == 3) {
                    let values = Object.values(counts);
            
                    // Three of a kind
                    if (values.includes(3))
                        return 3;
            
                    // Two pair
                    if (values.includes(2))
                        return 2;
                }
            
                // One pair
                if (Object.keys(counts).length == 4)
                    return 1;
            
                // High card
                return 0;
            }
            
            const input = data.split('\n')
                .filter(line => line.length > 0)
                .map(line => line.split(" "))
                .map(line => [
                    line[0]
                        .split("")
                        .map(v => valueMap[v] || parseInt(v)),
                    parseInt(line[1])
                ])
                .map(line => [...line, line[0].reduce((counts, v) => 
                {
                    counts[v] = (counts[v] == undefined) ? 1 : counts[v] + 1;
                    return counts;
                }, {})])
                .map(line => [...line, mapToCombinationValues(line[2])])
                .map(line => [line[3] * 10000000000
                    + line[0][0] * 100000000
                    + line[0][1] * 1000000
                    + line[0][2] * 10000
                    + line[0][3] * 100
                    + line[0][4], line[1]])
                .sort((a, b) => a[0] - b[0])
                .reduce((score, line, idx) => score + line[1] * (idx + 1), 0);
            
            
            
            return input
        }

        let part2 = (data) =>
        {
            let hands = data.split("\n").map(x => x.split(" "))

            const cardRank = {"2" : 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "T": 10, "J": 1, "Q": 12, "K": 13, "A": 14}

            const handsWithRanks = hands.map((pair) => {
                    let cards = {}
                    let jokers = 0 

                    pair[0].split("").forEach(x => 
                        {
                        if (x !== "J") 
                        {
                            !cards[x] ? cards[x] = 1 : cards[x]++
                        } 
                        else 
                        {
                            jokers++;
                        }
                    })

                    let cardType = (Object.values(cards).sort((a,b) => b-a))
                    cardType[0] ? cardType[0] += jokers : cardType[0] = jokers;

                    switch(cardType[0])
                    {
                        case 5: 
                            return [...pair, 6]
                        break;
                        case 4: 
                            return [...pair, 5]
                        break;
                        case 3: 
                            if(cardType[1] === 2)
                            {
                                return [...pair, 4 ]
                            }
                            else if(cardType[1] === 1)
                            {
                                return [...pair, 3]
                            }
                            else
                            {
                                return [...pair, 0]
                            }
                        break;

                        case 2: 
                            if(cardType[1] === 2)
                            {
                                return [...pair, 2]
                            }
                            else if(cardType[1] === 1)
                            {
                                return [...pair, 1]
                            }
                            else
                            {
                                return [...pair, 0]
                            }
                        break;

                        default :
                            return [...pair, 0]
                        break;
                    }
            })

            const sortedHands = handsWithRanks.sort((a,b) => {
                    if (a[2] === b[2]) 
                    {
                        for (let i = 0; i < a[0].length; i++) 
                        {
                            if(cardRank[a[0][i]] === cardRank[b[0][i]])
                            {
                                continue;
                            }
                            else
                            {
                                return (cardRank[a[0][i]] > cardRank[b[0][i]]) ? 1 : -1;
                            }
                        }
                    }
                    else
                    {
                        return (a[2] > b[2]) ? 1 : -1;
                    }
                })

            return sortedHands.reduce((acc, card, index) =>  acc + ( +card[1] * (index + 1)), 0)
            
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
