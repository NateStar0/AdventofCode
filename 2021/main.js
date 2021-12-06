var fs = require("fs");
var day = 6;
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
				//Separate all thye shit into: 
				//				An array of the selection sequence
				//				An array of 2D arrays, this contains all our bingo tiles
				var split = input.replace(/  /g, " ").split("\n\n");
				var order = split.splice(0, 1)[0].split(",");

				for(var i = 0; i < split.length; i++) { split[i] = split[i].split("\n") }
				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(" ");
						if(split[i][j][0] == '') split[i][j].splice(0, 1);
					}
				}
				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i].length; j++)
					{
						for(var k = 0; k < split[i][j].length; k++)
						{
							split[i][j][k] = [split[i][j][k], false];
						}
					}
				}

				//Cycle through all enteries in the array of boards, 
				var found = false;
				for(var i = 0; i < order.length; i++)
				{
					if(!found)
					{
						for(var j = 0; j < split.length; j++)
						{
							// Set a tile
							for(var k = 0; k < split[j].length; k++)
							{
								for(var l = 0; l < split[j][k].length; l++)
								{
									if(parseInt(order[i]) == parseInt(split[j][k][l][0])) split[j][k][l][1] = true;
								}
							}

							//Find a bingo
							for(var k = 0; k < 5; k++)
							{
								if((split[j][k][0][1] && split[j][k][1][1] && split[j][k][2][1] && split[j][k][3][1] && split[j][k][4][1]) ||
									(split[j][0][k][1] && split[j][1][k][1] && split[j][2][k][1] && split[j][3][k][1] && split[j][4][k][1])) 
								{

									found = true;
									
									var sum = 0;
									for(var x = 0; x < split[j].length; x++)
									{
										for(var y = 0; y < split[j][x].length; y++)
										{
											if(!split[j][x][y][1]) sum += parseInt(split[j][x][y][0]);
										}
									}

									return sum * parseInt(order[i]);
								}
							}
						}

						//log(split[0])
					}
				}

				return 0//[order, split]
			},
			
			part2 : function ()
			{
				//Separate all thye shit into: 
				//				An array of the selection sequence
				//				An array of 2D arrays, this contains all our bingo tiles
				var split = input.replace(/  /g, " ").split("\n\n");
				var order = split.splice(0, 1)[0].split(",");

				for(var i = 0; i < split.length; i++) { split[i] = split[i].split("\n") }
				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(" ");
						if(split[i][j][0] == '') split[i][j].splice(0, 1);
					}
				}
				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i].length; j++)
					{
						for(var k = 0; k < split[i][j].length; k++)
						{
							split[i][j][k] = [split[i][j][k], false];
						}
					}
				}

				//Cycle through all enteries in the array of boards, 
				var found = false;
				var rec = "";
				for(var i = 0; i < order.length; i++)
				{
					if(!found)
					{
						for(var j = split.length - 1; j >= 0 ; j--)
						{
							// Set a tile
							for(var k = 0; k < split[j].length; k++)
							{
								for(var l = 0; l < split[j][k].length; l++)
								{
									if(parseInt(order[i]) == parseInt(split[j][k][l][0])) split[j][k][l][1] = true;
								}
							}

							//Find a bingo
							var cont = true;
							for(var k = 0; k < 5; k++)
							{
								if(cont)
								{
									if((split[j][k][0][1] && split[j][k][1][1] && split[j][k][2][1] && split[j][k][3][1] && split[j][k][4][1]) ||
										(split[j][0][k][1] && split[j][1][k][1] && split[j][2][k][1] && split[j][3][k][1] && split[j][4][k][1])) 
									{
										
										if(split.length != 1)
										{
											split.splice(j, 1);
											cont = false
										}
										else
										{
											found = true;
											rec = order[i]
										}
									}
								}
							}		
						}
					}
				}
				
				var sum = 0;
				for(var x = 0; x < split[0].length; x++)
				{
					for(var y = 0; y < split[0][x].length; y++)
					{
						if(!split[0][x][y][1]) sum += parseInt(split[0][x][y][0]);
					}
				}

				return sum * parseInt(rec);
			}
		},
		
		{ // 5
			part1 : function ()
			{
				var split = input.split("\n");

				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split(" -> ");

					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(",");
					}
				}

				var size = 1000;
				var checkpad = createArray(size, size);

				for(var i = 0; i < checkpad.length; i++)
				{
					for(var j = 0; j < checkpad[i].length; j++)
					{
						checkpad[i][j] = 0;
					}
				}

				for(var i = 0; i < split.length; i++)
				{
					
					var p = { x1 : parseInt(split[i][0][0]), y1 : parseInt(split[i][0][1]), x2 : parseInt(split[i][1][0]), y2 : parseInt(split[i][1][1])}
					
					if(p.x1 == p.x2 || p.y1 == p.y2)
					{
						console.log("This one works!", p)
						checkpad[p.x1][p.y1]++;
						//checkpad[p.x2][p.y2]++;

						while(p.x1 != p.x2 || p.y1 != p.y2)
						{
							if(p.x1 != p.x2)
							{
								if(p.x1 > p.x2) p.x1--;
								else p.x1++;
							}

							if(p.y1 != p.y2)
							{
								if(p.y1 > p.y2) p.y1--;
								else p.y1++;
							}

							checkpad[p.x1][p.y1]++;
						}
					}
				}

				var count = 0;
				for(var i = 0; i < checkpad.length; i++)
				{
					for(var j = 0; j < checkpad[i].length; j++)
					{
						if(checkpad[i][j] > 1) count++;
					}
				}
				
				return count
			},
			
			part2 : function ()
			{
				var split = input.split("\n");

				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split(" -> ");

					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(",");
					}
				}

				var size = 1000;
				var checkpad = createArray(size, size);

				for(var i = 0; i < checkpad.length; i++)
				{
					for(var j = 0; j < checkpad[i].length; j++)
					{
						checkpad[i][j] = 0;
					}
				}

				for(var i = 0; i < split.length; i++)
				{
					
					var p = { x1 : parseInt(split[i][0][0]), y1 : parseInt(split[i][0][1]), x2 : parseInt(split[i][1][0]), y2 : parseInt(split[i][1][1])}
					
					if(1)//p.x1 == p.x2 || p.y1 == p.y2)
					{
						console.log("This one works!", p)
						checkpad[p.x1][p.y1]++;
						//checkpad[p.x2][p.y2]++;

						while(p.x1 != p.x2 || p.y1 != p.y2)
						{
							if(p.x1 != p.x2)
							{
								if(p.x1 > p.x2) p.x1--;
								else p.x1++;
							}

							if(p.y1 != p.y2)
							{
								if(p.y1 > p.y2) p.y1--;
								else p.y1++;
							}

							checkpad[p.x1][p.y1]++;
						}
					}
				}

				var count = 0;
				for(var i = 0; i < checkpad.length; i++)
				{
					for(var j = 0; j < checkpad[i].length; j++)
					{
						if(checkpad[i][j] > 1) count++;
					}
				}
				
				return count
			}
		},
		
		{ // 6
			part1 : function ()
			{
				var initial = input.split(",");
				var counts = new Array(9);
				var days = 80;

				for(var i = 0; i < counts.length; i++) { counts[i] = 0 }

				for(var i = 0; i < initial.length; i++)
				{
					counts[parseInt(initial[i])]++;
				}

				for(var counter = 0; counter < days; counter++)
				{
					var babies = counts.shift();
					counts[6] += babies;
					counts.push(babies);
				}

				var sum = 0;
				for(var i = 0; i < counts.length; i++) { sum += counts[i] }

				return sum
			},
			
			part2 : function ()
			{
				var initial = input.split(",");
				var counts = new Array(9);
				var days = 256;

				for(var i = 0; i < counts.length; i++) { counts[i] = 0 }

				for(var i = 0; i < initial.length; i++)
				{
					counts[parseInt(initial[i])]++;
				}

				for(var counter = 0; counter < days; counter++)
				{
					var babies = counts.shift();
					counts[6] += babies;
					counts.push(babies);
				}

				var sum = 0;
				for(var i = 0; i < counts.length; i++) { sum += counts[i] }

				return sum
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

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function log(a)
{
	console.log(a)
}
