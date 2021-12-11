var input = 
`247819356`

var example_input =
`389125467`

function part1(data)
{
	var cups = [...data].map(Number)
	var turn = 0;
	var turn_limit = 100;
	
	while(turn < turn_limit)
	{
		var yoink = cups.slice(1, 4);
		var splurg = [cups[0]].concat(cups.slice(4));

		var current = cups[0] - 1;
		while (true) 
		{
			if (current < 1) current += cups.length;

			const pos = splurg.indexOf(current);
			if (pos !== -1) 
			{
				cups = splurg
				.slice(0, pos + 1)
				.concat(yoink)
				.concat(splurg.slice(pos + 1));
				break;
			}

			current -= 1;
		}

		cups.push(cups.shift());
		
		turn += 1;
	}
	
	return cups.concat(cups).slice(cups.concat(cups).indexOf(1) + 1, cups.concat(cups).indexOf(1) + cups.length).join("")
}

function part2(data)
{
	var cups = [...data].map(Number)
	var turn = 0;
	var turn_limit = 10000000;
	
	for (var i = Math.max(...cups) + 1; i <= turn_limit / 10; i++) 
	{
	  cups.push(i);
	}
	
	cups.forEach((v, i) => (cups[i] = { v }));
	cups.forEach((v, i) => 
	{
		cups[i].n = cups[0];
		if(i < cups.length - 1) cups[i].n = cups[i + 1];
	});

	var m = new Map(cups.map((item) => [item.v, item]));

	var head = cups[0];

	while(turn < turn_limit)
	{
		var extract = [head.n.v, head.n.n.v, head.n.n.n.v];
		var eh = head.n;
		head.n = head.n.n.n.n;

		var cur = head.v - 1;
		while(1) 
		{
			while (extract.includes(cur)) cur -= 1;
			if(cur == 0) cur += cups.length;
			while (extract.includes(cur)) cur -= 1;

			var pos = m.get(cur);
			if (pos) 
			{
				eh.n.n.n = pos.n;
				pos.n = eh;
				break;
			}

			cur--;
		}

		head = head.n;
		turn++
	}

	return (m.get(1).n.v * m.get(1).n.n.v).toString();
}

console.log("part 1: ", part1(input));
console.log("part 2: ", part2(input));
