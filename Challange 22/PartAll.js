var input = 
`Player 1:
29
30
44
35
27
2
4
38
45
33
50
21
17
11
25
40
5
43
41
24
12
19
23
8
42

Player 2:
32
13
22
7
31
16
37
6
10
20
47
46
34
39
1
26
49
9
48
36
14
15
3
18
28`

var example_input =
`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`

function part1(data)
{
	var decks = data.split("\n\n");
	decks.forEach((deck) =>
	{
		var ind = decks.indexOf(deck);
		deck = deck.substring(10);
		deck = deck.split("\n");
		
		decks[ind] = deck
	})
	
	var target = decks[0].length * 2;
	while(decks[0].length > 0 && decks[1].length > 0)
	{
		//Get the two runnups!
		var runups = [decks[0].shift(), decks[1].shift()];
		
		//Compare them
		var winner = 0;
		var not_winner = 1;
		if(runups[1] * 1 > runups[0] * 1)
		{
			winner = 1;
			not_winner = 0;
		}
		
		//Add them to the end of the winner
		decks[winner].push(runups[winner])
		decks[winner].push(runups[not_winner])
		
		//console.log(decks)
	}
	
	var check_deck = 0; 
	if(decks[check_deck].length == 0) check_deck = 1;
	
	var sum = 0;
	var j = decks[check_deck].length;
	for(var i = 0; i < decks[check_deck].length; i++)
	{
		sum += (decks[check_deck][i] * 1) * j;
		j--;
	}
	
	return sum
}

function part2(data)
{
	var decks = data.split("\n\n");
	var players = decks.map(player => player.split(':\n')[1]).map(player => player.split('\n').map(card => +card));
	
    function play(players) 
	{
        var previous = new Set();
        while (players[0].length > 0 && players[1].length > 0) 
		{
            if (previous.has(players[0] + ' ' + players[1])) 
			{
                return 0;
            }
                
			previous.add(players[0] + ' ' + players[1]);
            var runups = [players[0].shift(), players[1].shift()];
            var winner = runups[0] > runups[1] ? 0 : 1;
			
            if (players[0].length >= runups[0] && players[1].length >= runups[1]) 
			{
                winner = play([players[0].slice(0, runups[0]), players[1].slice(0, runups[1])]);
            }
			
            if (winner == 0) 
			{
                players[0].push(runups[0], runups[1]);
            }
            else 
			{
                players[1].push(runups[1], runups[0]);
            }
        }
			
        return players[0].length ? 0 : 1;
    }
        
	var winner = play(players, 1);
    var score = players[winner].reverse().reduce((score, card, i) => score += card * (i + 1), 0);
    return score
}

console.log("part 1: ", part1(input));
console.log("part 2: ", part2(input));
