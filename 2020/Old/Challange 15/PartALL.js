
var input = 
`8,0,17,4,1,12`
input = input.split(",")
input.forEach(covToDeci)

function covToDeci(it)
{
	input[input.indexOf(it)] = it * 1
}

function getNumbAtVal(n, ln)
{
	var said = new Map();
	input.slice(0, input.length - 1).forEach((n, i) => said.set(n, i));

	for(var i = input.length; i < n; i++)
	{
		var current = 0;
		if (said.has(ln)) 
		{
			current = (i - 1) - said.get(ln);
		}
		
		said.set(ln, i - 1);
		ln = current;
	}
	
	return ln;
}

console.log(input)

var find = 0;
var lastnumb = 0;

find = 30000000;
lastnumb = input[input.length - 1];
lastnumb = getNumbAtVal(find, lastnumb);
console.log(lastnumb)

find = 2020;
lastnumb = input[input.length - 1];
lastnumb = getNumbAtVal(find, lastnumb);
console.log(lastnumb)

