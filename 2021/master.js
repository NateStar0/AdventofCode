var fs = require("fs");

var data =
[
	{ // 1
		part1 : function ()
		{
			return "A"
		},
		
		part2 : function ()
		{
			return "B"
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

var day = 1;
var currentday = data[day - 1];

console.log('Day ' + day + '\'s answers are : ', currentday.part1(), currentday.part2());
