
var input = 
`0: 4 1 5
1: 2 3 | 3 2
4: "a"
2: 4 4 | 5 5
3: 4 5 | 5 4
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`

function part1(data)
{
	var chop = data.split("\n\n");
	var rules = chop[0].split("\n");
	rules = rules.sort((b1, b2) => b1.split(": ")[0] - b2.split(": ")[0])
	rules.forEach((rule) => rules[rules.indexOf(rule)] = rule.split(": ")[1]);
	var check = chop[1].split("\n")
	
	
	
	console.log(rules, check)
	
	return "Dick and bballs"
}

function part2(data)
{
	return "No functionality :/"
}

console.log("Part 1: ", part1(input));
console.log("Part 2: ", part2(input));
