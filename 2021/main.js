var fs = require("fs");
var day = 4;
var data = []; 

fs.readFile('./Inputs/' + day + '.txt', 'utf8', function(e, d) 
{
	if(e) throw e;
	data = run(d);
	
	var currentday = data[day - 1];
	console.log('Day ' + day + '\'s answers are : ', currentday.part1(), currentday.part2());	
});

function run(input)
{
	input = input.replace(/\r/g, "");
	return [
		{ // 1
			part1 : function ()
			{
				var split = input.split("\n");
				var inc = 0;
				
				for(var i = 1; i < split.length; i++)
				{
					if(parseInt(split[i - 1]) < parseInt(split[i]))
					{		
						inc ++;
					}
				}
				
				return inc;
			},
			
			part2 : function ()
			{
				var split = input.split("\n");
				var inc = 0;
				var windowarr = [];
				
				for(var i = 0; i < split.length - 2; i++)
				{
					windowarr.push(parseInt(split[i]) + parseInt(split[i + 1]) + parseInt(split[i + 2]))
				}
				
				for(var i = 1; i < windowarr.length; i++)
				{
					if(windowarr[i - 1] < windowarr[i])
					{		
						inc ++;
					}
				}
				
				return inc;
			}
		},
		
		{ // 2
			part1 : function ()
			{
				var lines = input.split("\n");
				var pos = { x : 0, y : 0} ;
				
				for(var i = 0; i < lines.length; i++)
				{
					var com = lines[i].split(" ")[0];
					var dis = parseInt(lines[i].split(" ")[1]);
					
					switch(com)
					{
						case "forward": pos.x += dis; break;
						case "up": pos.y -= dis; break;
						case "down": pos.y += dis; break;
					}
				}
				
				
				
				return pos.x * pos.y
			},
			
			part2 : function ()
			{
				var lines = input.split("\n");
				var pos = { x : 0, y : 0} ;
				var ang = 0;
				
				for(var i = 0; i < lines.length; i++)
				{
					var com = lines[i].split(" ")[0];
					var dis = parseInt(lines[i].split(" ")[1]);
					
					switch(com)
					{
						case "forward": 
							pos.x += dis; 
							pos.y += ang * dis;
						break;
						case "up": ang -= dis; break;
						case "down": ang += dis; break;
					}
				}
				
				
				
				return pos.x * pos.y
			}
		},
		
		{ // 3
			part1 : function ()
			{
				var split = input.split("\n");
				var gam = "";
				var eps = "";
				
				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split("");
				}
				
				for(var j = 0; j < split[0].length; j++)
				{
					var highs = 0;
					for(var i = 0; i < split.length; i++)
					{
						if(split[i][j] == "1") highs ++;
					}
					
					if(highs > split.length / 2)
					{
						gam += "1";
						eps += "0";
					}
					else
					{
						gam += "0";
						eps += "1";
					}
				}
				
				return parseInt(gam, 2) * parseInt(eps, 2)
			},
			
			part2 : function ()
			{
				var split = input.split("\n");
				var dup = [[]];
				var ox = [];
				var cb = [];
				
				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split("");
				}
				
				dup = JSON.parse(JSON.stringify(split));
				
				for(var j = 0; j < split[0].length; j++)
				{
					var highs = 0;
					var lows = 0;
					for(var i = 0; i < dup.length; i++)
					{
						if(dup[i][j] == "1") highs ++;
						if(dup[i][j] == "0") lows ++;
					}
					
					var selector = (highs >= lows) ? "1" : "0";
					
					for(var i = dup.length - 1; i >= 0; i--)
					{
						if(dup[i][j] != selector) dup.splice(i, 1);
					}
				}
				
				ox = JSON.parse(JSON.stringify(dup)).join().replace(/,/g, "");
				
				dup = JSON.parse(JSON.stringify(split));
				
				for(var j = 0; j < split[0].length; j++)
				{
					var highs = 0;
					var lows = 0;
					for(var i = 0; i < dup.length; i++)
					{
						if(dup[i][j] == "1") highs ++;
						if(dup[i][j] == "0") lows ++;
					}
					
					var selector = (lows > highs) ? "1" : "0";
					if(dup.length == 1) selector = dup[0][j];
					
					for(var i = dup.length - 1; i >= 0; i--)
					{
						if(dup[i][j] != selector) dup.splice(i, 1);
					}
				}
				
				cb = JSON.parse(JSON.stringify(dup)).join().replace(/,/g, "");
				
				return [parseInt(ox, 2), parseInt(cb, 2), parseInt(ox, 2) * parseInt(cb, 2)];
			}
		},
		
		{ // 4
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 5
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 6
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 7
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 8
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 9
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 10
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 11
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 12
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 13
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 14
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 15
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 16
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 17
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 18
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 19
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 20
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 21
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 22
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 23
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 24
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 25
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		}
	]
}


function lengthdir(l, d)
{
	return { x : l * Math.cos(d), y : l * -Math.sin(d) };
}

function log(a)
{
	console.log(a)
}
