
var input = 
`1000001
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,577,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,601,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`

var work = input.split("\n");
var list = work[1];
var bumpup = [];
var refinedarr = [];
var min = 100000000000000n
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

refinedarr.sort((b1, b2) => b2[0] - b1[0])
refinedarr.forEach(bigify)
console.log(refinedarr)

function bigify(item)
{
	refinedarr[refinedarr.indexOf(item)] = [BigInt(item[0] * 1), BigInt(item[1])];
}

var access = refinedarr[0]
var bus_id = access[0];
var numb = access[1];
for(var i = 1; i < refinedarr.length; i++) 
{
	//console.log(i)
	var acc = refinedarr[i]
    //var bus = acc[i];
    while (numb % acc[0] !== acc[1]) 
	{
        numb += bus_id;
    }
    bus_id *= acc[0];
}


console.log(refinedarr, numb, bus_id)

// 8 * 13
