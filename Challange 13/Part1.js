
var input = 
`1000001
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,577,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,601,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`

var work = input.split("\n");
var target = work[0] * 1;
var list = work[1];
var reflist = [];
var diflist = [];
var itlist = [];
list = list.split(",");
list = list.sort();

while(list.includes("x"))
{
	for(var x = 0; x < list.length; x++)
	{
		if(list[x] == "x")
		{
			list.splice(x, 1);
		}
		else
		{
			list[x] = list[x] * 1;
		}
	}
}

for(var i = 0; i < list.length; i++)
{
	
	reflist[i] = list[i] * 1;
	var it = 0
	while(reflist[i] < target)
	{
		reflist[i] += list[i];
		it++
	}
	itlist[i] = it;
	diflist[i] = reflist[i] - target 
	
	
	/*
	reflist[i] = list[i];
	var it = 0
	while(!Number.isInteger(target / list))
	{
		reflist += 1;
		it++
	}
	itlist[i] = it;
	diflist[i] = target - reflist[i]
	*/
}

function lowest_retid(l)
{
	var low = 100;
	var id = -1;
	
	for(var t = 0; t < l.length; t++)
	{
		if(l[t] < low)
		{
			low = l[t];
			id = t
		}
	}
	
	return id;
}

var low_dif = lowest_retid(diflist);
var ind = list[low_dif];
console.log(ind, ind * diflist[low_dif], target, diflist[low_dif], list[low_dif], itlist[low_dif], reflist[low_dif] - target)

