
var input = 
`1000001
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,577,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,601,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`

var work = input.split("\n");
var list = work[1];
var bumpup = [];
var refinedarr = [];
var min = 10000000000n;
list = list.split(",");

for(var o = 0; o < list.length; o++)
{
	refinedarr[o] = list[o];
}

var numb_o_index = 0;
for(var x = 0; x < list.length; x++)
{
	if(list[x] != "x")
	{
		bumpup[x] = numb_o_index;
		numb_o_index = 0;
	}
	else
	{
		numb_o_index += 1;
	}
}

while(refinedarr.includes("x"))
{
	for(var v = 0; v < refinedarr.length; v++)
	{
		if(refinedarr[v] == "x")
		{
			refinedarr.splice(v, 1);
			bumpup.splice(v, 1);
		}
	}
}

for(var f = 0; f < refinedarr.length; f++)
{
	refinedarr[f] = [refinedarr[f], bumpup[f]];
}

//refinedarr.sort((b1, b2) => b2[0] - b1[0])
refinedarr.forEach(bigify)
console.log(refinedarr)

function bigify(item)
{
	refinedarr[refinedarr.indexOf(item)] = [BigInt(item[0] * 1), BigInt(item[1])];
}

function getClosest(base, n)
{
	return base - (base % n);
}

function generate_possibilities(n, times)
{
	var b = [];
	
	for(var s = 0; s < times; s++)
	{
		b[s] = n * s + 1;
	}
	
	return b;
}


var start = refinedarr[0]
var gotit = false;
var guessed = getClosest(min, start[0]);
console.log(guessed, min / guessed)
while(!gotit)
{
	gotit = true;
	for(var u = BigInt(0); u < refinedarr.length; u++)
	{
		var ref = refinedarr[u];
		if((u + guessed) == getClosest(guessed, ref[0]) - ref[1])
		{
			gotit = false;
		}
	}
	
	console.log(guessed)
	guessed += start[0];
}

/*
let cN = inputs[0].id;
let cA = inputs[0].offset;
for (let i = 1; i < inputs.length; i++) {
    const bus = inputs[i];
    while (cA % bus.id !== bus.offset) {
        cA += cN;
    }
    cN *= bus.id;
}*/

console.log(refinedarr, guessed)

// 8 * 13
