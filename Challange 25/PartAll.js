var input = 
`19241437
17346587`

function part1(data)
{
	var dice = data.split("\n");
	var card = dice[0] * 1;
	var door = dice[1] * 1;
	
	var k = 1;
	var targ = 1;
	
	console.log(dice)
	
	while(door !== targ)
	{
		targ = (targ * 7) % 20201227
		k = (k * card) % 20201227
	}
	
	return k;
}

//Part 2 returns nothing
//There isn't anything to solve

console.log("part 1: ", part1(input));
console.log("part 2: ", part2(input));
