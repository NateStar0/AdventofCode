var fs = require("fs");
var day = 2;
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
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
			}
		},
		
		{ // 3
			part1 : function ()
			{
				return "A"
			},
			
			part2 : function ()
			{
				return "B"
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
