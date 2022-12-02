
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let moves = data.split("\n").map(n => n.split(" "));
            let score = 0;
            
            var points =
            {
                "X": // Rock
                {
                    point : 1,
                    matchup :
                    {
                        "A" : 3, // Rock
                        "B" : 0, // Paper
                        "C" : 6 //Scissors
                    }
                },
                "Y": // Paper
                {
                    point : 2,
                    matchup :
                    {
                        "A" : 6, // Rock
                        "B" : 3, // Paper
                        "C" : 0 //Scissors
                    }
                },
                "Z":  // Scissors
                {
                    point : 3,
                    matchup :
                    {
                        "A" : 0, // Rock
                        "B" : 6, // Paper
                        "C" : 3 //Scissors
                    }
                },
            }


            moves.forEach((move) =>
            {
                let [opponent, yours] = move;

                score += (points[yours].point + points[yours].matchup[opponent]);
            })

            console.log(score);
        }

        let part2 = (data) =>
        {
            let moves = data.split("\n").map(n => n.split(" "));
            let score = 0;
            
            var points =
            {
                "A" : // Tock 1
                {
                    "X" : 3, // Lose
                    "Y" : 1, //Draw
                    "Z" : 2 // Win
                },
                "B": // taper 2
                {
                    "X" : 1, // Lose
                    "Y" : 2, //Draw
                    "Z" : 3 // Win
                },
                "C": // tscissors 3
                {
                    "X" : 2, // Lose
                    "Y" : 3, //Draw
                    "Z" : 1 // Win
                }
            }

            let outcome = 
            {
                "X" : 0, // Lose
                "Y" : 3, //Draw
                "Z" : 6 // Win
            }


            moves.forEach((move) =>
            {
                let [opponent, yours] = move;

                score += (outcome[yours] + points[opponent][yours]);
            })

            console.log(score);
        }
        
        part1(data);
        part2(data);
    }
}
