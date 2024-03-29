var fs = require("fs");
var dk = require("dijkstrajs");
var _ = require("underscore");
var day = 25;
var data = []; 

String.prototype.ssplice = function(idx, rem, str) {
		return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

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
				var split = input.replace(/	/g, " ").split("\n\n");
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
				var split = input.replace(/	/g, " ").split("\n\n");
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
				var crabs = input.split(",");
				var max = 0;
				var lowest = [10000000000, 10000000000];

				for(var i = 0; i < crabs.length; i++) { max = Math.max(max, parseInt(crabs[i])) }
				
				for(var i = 0; i < max; i++)
				{
					var cur = 0
					
					for(var j = 0; j < crabs.length; j++)
					{
						cur += Math.abs(i - parseInt(crabs[j]));
					}

					if(cur < lowest[0])
					{
						lowest = [cur, i]
					}
				}

				return lowest[0]
			},
			
			part2 : function ()
			{
				var crabs = input.split(",");
				var max = 0;
				var lowest = [10000000000, 10000000000];

				for(var i = 0; i < crabs.length; i++) { max = Math.max(max, parseInt(crabs[i])) }
				
				for(var i = 0; i < max; i++)
				{
					var cur = 0
					
					for(var j = 0; j < crabs.length; j++)
					{
						var f = Math.abs(i - parseInt(crabs[j]));
						cur += ((f * f + f) / 2);
					}

					if(cur < lowest[0])
					{
						lowest = [cur, i]
					}
				}

				return lowest[0]
			}
		},
		
		{ // 8
			part1 : function ()
			{
				var split = input.split("\n");
				var sum = 0;

				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split(" | ");

					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(" ")
					}
				}

				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i][1].length; j++)
					{
						switch(split[i][1][j].length)
						{
							case 2:
							case 3:
							case 4:
							case 7:
								sum ++;
							break;
						}
					}
				}

				return sum
			},
			
			part2 : function ()
			{
				var split = input.split("\n");
				var tot = 0;

				for(var i = 0; i < split.length; i++)
				{
					split[i] = split[i].split(" | ");

					for(var j = 0; j < split[i].length; j++)
					{
						split[i][j] = split[i][j].split(" ")

						if(!j)
						{
							split[i][0].sort((a, b) => { return a.length - b.length})
						}
					}
				}

				for(var i = 0; i < split.length; i++)
				{
					var j = 0;
					var no = {};
					var tl = [];
					var zn = [];
					var letter = null;

					while(Object.keys(no).length != 10)
					{
						var s = split[i][0][j];
						switch(s.length)
						{
							case 2:
								no[s.split('').sort().join('')] = '1'
								tl = s.split("")
							break;

							case 3:
								no[s.split('').sort().join('')] = '7'
							break;

							case 4:
								no[s.split('').sort().join('')] = '4'

								if (tl.length > 0) 
								{
									zn = s.split("")
									zn = zn.filter(letter => !tl.includes(letter))
								}
							break;

							case 5:
								if (s.includes(tl[0]) && s.includes(tl[1])) 
								{
									no[s.split('').sort().join('')] = '3'
								} 
								else 
								if (s.includes(letter) && tl.length > 0 && letter != null) 
								{
									no[s.split('').sort().join('')] = '5'
								} 
								else 
								if (!s.includes(letter) && letter != null) 
								{
									no[s.split('').sort().join('')] = '2'
								}

							break;

							case 6:
								if (s.includes(tl[0]) && s.includes(tl[1]) && s.includes(zn[0]) && s.includes(zn[1])) 
								{
									no[s.split('').sort().join('')] = '9'
								} 
								else 
								if ((!s.includes(tl[0]) || !s.includes(tl[1])) && (s.includes(zn[0]) && s.includes(zn[1]))) 
								{
									no[s.split('').sort().join('')] = '6'
									if (s.includes(tl[0])) 
									{
										letter = tl[0]
									} 
									else 
									{
										letter = tl[1]
									}
								} 
								else 
								if (tl.length > 0 && zn.length > 0) 
								{
									no[s.split('').sort().join('')] = '0'
								}
							break;

							case 7:
								no[s.split('').sort().join('')] = '8'
							break;

							
						}

						j = (j == 9) ? 0 : j + 1;
					}


					var sum = ""

					for (var s = 0; s < split[i][1].length; s++) 
					{
						sum += no[split[i][1][s].split('').sort().join('')]
					}

					tot += parseInt(sum);
				}

				return tot
			}
		},
		
		{ // 9
			part1 : function ()
			{
				var split = input.split("\n").map(a => a.split("").map(Number));
				var sum = 0;

				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[0].length; j++)
					{
						var a = (i > 0) ? split[i - 1][j] : 10;
						var b = (i < split.length - 1) ? split[i + 1][j] : 10;
						var c = (j > 0) ? split[i][j - 1] : 10;
						var d = (j < split[0].length - 1) ? split[i][j + 1] : 10;

						if(split[i][j] < a &&
							split[i][j] < b &&
							split[i][j] < c &&
							split[i][j] < d)
						{
							sum += split[i][j] + 1;
						}
					}
				}

				return sum;
			},
			
			part2 : function ()
			{
				var split = input.split("\n").map(a => a.split("").map(Number));
				var basins = [];

				var neighbours = (x, y) =>
				{
					var p = [];
					if(x > 0) p.push([x - 1, y])
					if(y > 0) p.push([x, y - 1])
					if(x < split.length - 1) p.push([x + 1, y])
					if(y < split[0].length - 1) p.push([x, y + 1])
					return p
				}

				var fill = (set, x, y) =>
				{
					if(set.has(`${x}x${y}`) || split[x][y] === 9) return;
					set.add(`${x}x${y}`);
					neighbours(x, y).forEach(([a, b]) => fill(set, a, b));
					return set;
				}

				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[0].length; j++)
					{
						if(neighbours(i, j).every(([a, b]) => split[a][b] > split[i][j]))
						{
							basins.push(fill(new Set(), i, j).size);
						}
					}
				}

				return basins.sort((a, b) => b - a).slice(0, 3).reduce((a, v) => a * v, 1);
			}
		},
		
		{ // 10
			part1 : function ()
			{
				var split = input.split("\n");
				var sum = 0;

				var check = ["(", "{", "[", "<"]
				var end = [")", "}", "]", ">"]
				var points = [3, 1197, 57, 25137]

				var flip = (c, check, end) =>
				{
					for(var i = 0; i < check.length; i++)
					{
						if(c == end[i]) return check[i];
					}

					return -1;
				}

				var score = (c, check) =>
				{
					for(var i = 0; i < check.length; i++)
					{
						if(c == check[i]) return points[i]
					}
				}

				for(var i = 0; i < split.length; i++)
				{
					var stack = [];

					var cont = true;

					for(var j = 0; j < split[i].length; j++)
					{
						if(cont)
						{
							if(check.includes(split[i].charAt(j))) stack.push(split[i].charAt(j));

							if(end.includes(split[i].charAt(j)))
							{
								if(stack[stack.length - 1] != flip(split[i].charAt(j), check, end))
								{
									sum += score(flip(split[i].charAt(j), check, end), check)
									cont = false;
								}
								else
								{
									stack.splice(stack.length - 1, 1);
								}
							}
						}
					}
				}

				return sum
			},
			
			part2 : function ()
			{
				var split = input.split("\n");

				var check = ["(", "{", "[", "<"]
				var end = [")", "}", "]", ">"]
				var points = [1, 3, 2, 4]
				var scores = [];

				var flip = (c, check, end) =>
				{
					for(var i = 0; i < check.length; i++)
					{
						if(c == end[i]) return check[i];
					}

					return -1;
				}

				var valorant = (c) =>
				{
					for(var i = 0; i < check.length; i++)
					{
						if(c == check[i]) return points[i];
					}

					return -1;
				}

				console.log(split.length)

				// Weed out all of the stinky corrupt ones
				for(var i = split.length - 1; i >= 0; i--)
				{
					var stack = [];

					var cont = true;

					for(var j = 0; j < split[i].length; j++)
					{
						if(cont)
						{
							if(check.includes(split[i].charAt(j))) stack.push(split[i].charAt(j));

							if(end.includes(split[i].charAt(j)))
							{
								if(stack[stack.length - 1] != flip(split[i].charAt(j), check, end))
								{
									
									split.splice(i, 1);
									break;
								}
								else
								{
									stack.splice(stack.length - 1, 1);
								}
							}
						}
					}
				}

				console.log(split.length, split)

				for(var i = 0; i < split.length; i++)
				{
					var stack = [];

					for(var j = 0; j < split[i].length; j++)
					{
						if(check.includes(split[i].charAt(j))) stack.push(split[i].charAt(j));

						if(end.includes(split[i].charAt(j)))
						{
							if(stack[stack.length - 1] == flip(split[i].charAt(j), check, end))
							{
								stack.splice(stack.length - 1, 1);
							}
						}
					}

					console.log(stack, split[i])

					for(var j = stack.length -1; j >= 0; j--)
					{
						var thang = stack.splice(j, 1);

						if(isNaN(scores[i])) 
						{
							scores[i] = 0;
						}

						scores[i] = scores[i] * 5;
						scores[i] += valorant(thang);
					}
				}

				return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]
			}
		},
		
		{ // 11
			part1 : function ()
			{
				var split = input.split("\n").map(a => a.split("").map(Number));
				var flashes = 0;
				var cycles = 100;

				var increase = (inp, i, j, flashed = new Set()) =>
				{
					if(i < 0 || i >= inp.length || j < 0 || j >= inp[0].length || flashed.has(`${i}${j}`)) return;

					inp[i][j]++;

					if(inp[i][j] < 10) return;

					flashed.add(`${i}${j}`);
					inp[i][j] = 0;

					for(var x = -1; x <= 1; x++)
					{
						for(var y = -1; y <= 1; y++)
						{
							if(!(x == y && x + y == 0))
							{
								increase(inp, i + x, j + y, flashed)
							}
						}
					}
				}

				var gen = (inp) =>
				{
					var flashed = new Set();

					for(var i = 0; i < inp.length; i++)
					{
						for(var j = 0; j < inp[i].length; j++)
						{
							increase(inp, i, j, flashed);
						}
					}

					return flashed.size;
				}

				for(var naenae = 0; naenae < cycles; naenae++)
				{
					flashes += gen(split)
				}

				return flashes
			},
			
			part2 : function ()
			{
				var split = input.split("\n").map(a => a.split("").map(Number));
				var flashes = 0;
				var cycles = 0;

				var increase = (inp, i, j, flashed = new Set()) =>
				{
					if(i < 0 || i >= inp.length || j < 0 || j >= inp[0].length || flashed.has(`${i}${j}`)) return;

					inp[i][j]++;

					if(inp[i][j] < 10) return;

					flashed.add(`${i}${j}`);
					inp[i][j] = 0;

					for(var x = -1; x <= 1; x++)
					{
						for(var y = -1; y <= 1; y++)
						{
							if(!(x == y && x + y == 0))
							{
								increase(inp, i + x, j + y, flashed)
							}
						}
					}
				}

				var gen = (inp) =>
				{
					var flashed = new Set();

					for(var i = 0; i < inp.length; i++)
					{
						for(var j = 0; j < inp[i].length; j++)
						{
							increase(inp, i, j, flashed);
						}
					}

					return flashed.size;
				}

				while(true)
				{
					flashes = gen(split)
					console.log(flashes)
					if(flashes == (split.length * split[0].length))
					{
						console.log(split.length * split[0].length)
						break;
					}

					cycles ++;
				}

				return cycles + 1
			}
		},
		
		{ // 12
			part1 : function ()
			{
				var split = input.trim().split("\n")
				var map = {};
				var found = [];
				
				split.forEach(a => 
				{
					var [current, end] = a.split("-");
					if(Array.isArray(map[current])) 
					{
						map[current].push(end)
					}
					else
					{
						map[current] = [end];
					}

					if(Array.isArray(map[end]))
					{
						map[end].push(current)
					}
					else
					{
						map[end] = [current];
					}
				})

				var find = (p, c) =>
				{
					var next = [...c, p]

					if(p == "end")
					{
						found.push(next);
						return;
					}

					map[p].forEach(a => 
					{
						if(a.toLowerCase() !== a || c.indexOf(a) === -1) find(a, next);
					})
				}

				find("start", []);

				return found.length
			},
			
			part2 : function ()
			{
				var split = input.trim().split("\n")
				var map = {};
				var found = [];
				
				split.forEach(a => 
				{
					var [current, end] = a.split("-");
					if(Array.isArray(map[current])) 
					{
						map[current].push(end)
					}
					else
					{
						map[current] = [end];
					}

					if(Array.isArray(map[end]))
					{
						map[end].push(current)
					}
					else
					{
						map[end] = [current];
					}
				})

				var find = (p, c) =>
				{
					var next = [...c, p]
					if(p === "start" && c.length > 0) return;
					if(p === "end")
					{
						found.push(next);
						return;
					}

					var count = {};
					next.forEach(a => 
					{
						if(a.toLowerCase() === a) count[a] = (count[a] ?? 0) + 1;
					})

					var low = Object.values(count).some((v) => v > 1)

					map[p].forEach(a => 
					{
						if(!low || a.toLowerCase() !== a || c.indexOf(a) === -1) find(a, next);
					})

				}

				find("start", []);

				return found.length
			}
		},
		
		{ // 13
			part1 : function ()
			{
				var [dots, fold] = input.split("\n\n");

				dots = dots.split("\n").map(a => a.split(",").map(Number));
				fold = fold.split("\n").map(a =>
				{
					a = a.split(" ")[2].split("=");
					a[1] = +a[1];
					return a
				})

				var [mx, my] = [0, 0];
				for(var i = 0; i < dots.length; i++)
				{
					mx = Math.max(mx, dots[i][0]);
					my = Math.max(my, dots[i][1]);
				}

				var grid = [...Array(my + 1)].map(x => Array(mx + 1).fill(0));

				for(var i = 0; i < dots.length; i++)
				{
					var [x, y] = dots[i];
					grid[y][x] = 1;
				}

				for(var i = 0; i < fold.length; i++)
				{
					var [axis, val] = fold[i];

					switch(axis)
					{
						case "y":
							for (var x = 0; x < grid[0].length; x++) 
							{
								for (var y = 0; y < val; y++) 
								{
									grid[y][x] = grid[y][x] | grid[2 * val - y]?.[x];
								}
								}
								grid.length = val;
						break;

						case "x":
							for (var y = 0; y < grid.length; y++) 
							{
								for (var x = 0; x < val; x++) 
								{
									grid[y][x] = grid[y][x] | grid[y][2 * val - x];
								}
								grid[y].length = val;
							}
						break;
					}

					if(!i) return grid.flat().filter(Boolean).length;
				}

			},
			
			part2 : function ()
			{
				var [dots, fold] = input.split("\n\n");

				dots = dots.split("\n").map(a => a.split(",").map(Number));
				fold = fold.split("\n").map(a =>
				{
					a = a.split(" ")[2].split("=");
					a[1] = +a[1];
					return a
				})

				var [mx, my] = [0, 0];
				for(var i = 0; i < dots.length; i++)
				{
					mx = Math.max(mx, dots[i][0]);
					my = Math.max(my, dots[i][1]);
				}

				var grid = [...Array(my + 1)].map(x => Array(mx + 1).fill(0));

				for(var i = 0; i < dots.length; i++)
				{
					var [x, y] = dots[i];
					grid[y][x] = 1;
				}

				for(var i = 0; i < fold.length; i++)
				{
					var [axis, val] = fold[i];

					switch(axis)
					{
						case "y":
							for (var x = 0; x < grid[0].length; x++) 
							{
								for (var y = 0; y < val; y++) 
								{
									grid[y][x] = grid[y][x] | grid[2 * val - y]?.[x];
								}
								}
								grid.length = val;
						break;

						case "x":
							for(var y = 0; y < grid.length; y++) 
							{
								for(var x = 0; x < val; x++) 
								{
									grid[y][x] = grid[y][x] | grid[y][2 * val - x];
								}
								grid[y].length = val;
							}
						break;
					}
				}

				return "\n" + grid.map((line) => line.map((dot) => (dot ? '0' : ' ')).join('')).join('\n')	
			}
		},
		
		{ // 14
			part1 : function ()
			{
				var [template, rules] = input.split("\n\n");
				var [high, low] = [0, 99999999999];

				rules = rules
						.split("\n")
						.map(a => 
							a.split("\n")
							.map(b => {
								b = b.split(" -> ")
								b[0] = b[0].split("")
								return b }));

				for(var r = 0; r < 10; r++)
				{
					var n = [];
					low = 99999999999;

					for(var i = 0; i < rules.length; i++)
					{
						var [chk, rep] = rules[i][0];

						for(var j = 0; j < template.length; j++)
						{
							if(template.charAt(j) == chk[0] && template.charAt(j + 1) == chk[1])
							{
								n.push([j + 1, rep])
							}
						}
					}

					n.sort((a, b) => a[0] - b[0]);

					for(var i = 0; i < n.length; i++)
					{
						template = template.ssplice(n[i][0] + i, 0, n[i][1]);
					}

					var char = charCount(template);
					for(var i in char)
					{
						high = Math.max(high, char[i]);
						low = Math.min(low, char[i]);

					}
				}
				return high - low;
			},
			
			part2 : function ()
			{
				var [template, rules] = input.split('\n\n');

				var nextPairs = rules.split('\n').reduce((acc, rule) => 
				{
					var [left, right] = rule.split(' -> ');
					acc[left] = [left[0] + right, right + left[1]];
					return acc;
				}, {});

				var count = {};

				for (var i = 0; i < template.length - 1; i++) 
				{
					var pair = template.slice(i, i + 2);
					count[pair] = (count[pair] ?? 0) + 1;
				}

				for (var step = 0; step < 40; step++) 
				{
					var ncount = {};
					for (var pair in count) 
					{
						for (var nextPair of nextPairs[pair]) 
						{
							ncount[nextPair] = (ncount[nextPair] ?? 0) + count[pair];
						}
					}
					count = ncount;
				}

				var el = {
					[template[0]]: 1,
				};

				for (var pair in count) {
					el[pair[1]] = (el[pair[1]] ?? 0) + count[pair];
				}

				var val = Object.values(el);
				return (Math.max(...val) - Math.min(...val));
			}
		},
		
		{ // 15
			part1 : function ()
			{
				var split = input.split("\n").map((a) => a.split("").map(Number))
				
				for(var i = 0; i < split.length; i++)
				{
					for(var j = 0; j < split[i].length; j++)
					{
						if(i == 0 && j == 0) continue;

						if(i == 0) split[i][j] += split[i][j - 1];
						else if(j == 0) split[i][j] += split[i- 1][j];
						else split[i][j] += Math.min(split[i- 1][j], split[i][j - 1])
					}
				}

				return split[split.length - 1][split[0].length - 1] - split[0][0];
			},
			
			part2 : function ()
			{
				var split = input.split("\n").map(s => s.split('').map(Number));
				var start = [...split];
				var sum = 0;
				var exp = 5;

				var inc = function(grid, t) 
				{
					for(var i = 0; i < t; i++) 
					{
						grid = grid.map(s => 
						{
							return s.map(y =>
							{
								return (y == 9) ? 1 : y + 1;
							})
						})
					}
					return grid;
				}



				//for 4 times
				for(var i = 1; i < exp; i++) 
				{
					var tile = inc(start,i);
					split = split.map((s,ind) => s.concat(tile[ind]));
				}

				var alsoStartingTile = [...split];

				for(var i = 1; i < exp; i++) 
				{
					var tile = inc(alsoStartingTile,i)
					tile.forEach(element => 
						{
						split.push(element)
					});	
				}


				var objectify = function(g) {
					var obj = {};

					for (var y = 0; y < g.length; y++) 
					{
						for (var x = 0; x < g[y].length; x++) 
						{ 
							obj[y+','+x] = {};
							var adj = [];
							
							if(y > 0) adj.push({x: x, y: y-1})
							if(y < g.length - 1) adj.push({x: x, y: y + 1})
							if(x > 0) adj.push({x: x-1, y: y})
							if(x < g[y].length - 1) adj.push({x: x + 1, y: y})

							for(var f = 0; f < adj.length; f++) 
							{
								var a = adj[f]
								var n = g[a.y][a.x]

								obj[y+','+x][adj[f].y+','+ adj[f].x] = n;
							}
						}
					}

					return obj;
				}

				var path = dk.find_path(objectify(split), '0,0',`${split.length-1},${split[0].length-1}`);

				for(var i =- 0; i < path.length; i++)
				{
					var e = path[i].split(",").map(Number);
					sum += split[e[0]][e[1]];
				}
				
				return sum - split[0][0]
			}
		},
		
		{ // 16
			part1 : function ()
			{
				var bin = input
				.split("")
				.map(a => 
					{
						a = parseInt(a, 16)
							.toString(2)
							.padStart(4, "0");
						return a;
					})
				.join()
				.replace(/,/g, "");
				
					
				var versionsum = 0;
				var byte = function(str)
				{
					versionsum += parseInt(str.slice(0, 3), 2);
					var id = parseInt(str.slice(3, 6), 2);
					var p;
					var val = [];

					if (id == 4) 
					{
						var ol = 6;
						var num = "";

						while (str[ol] == '1') 
						{
							num += str.slice(ol + 1, ol + 5);
							ol += 5;
						}

						num += str.slice(ol + 1, ol + 5);

						return [ol + 5, parseInt(num, 2)];
					} 
					else 
					{
						var ot = str[6];

						if (ot == '0') 
						{
							var l = parseInt(str.slice(7,22),2);
							var cnt = 0;

							while (cnt < l) 
							{
								var pkt = byte(str.slice(22 + cnt));
								cnt += pkt[0];
								val.push(pkt[1]);
							}

							p = 22 + l;

						} 
						else 
						{
							var l = parseInt(str.slice(7, 18), 2);
							var cnt = 18;

							for (var i = 0; i < l; i++) 
							{
								var pkt = byte(str.slice(cnt));
								cnt += pkt[0];
								val.push(pkt[1]);
							}

							p = cnt;
						}
					
						switch (id) 
						{
							case 0: return [p, val.reduce((a, b) => a + b)];
							case 1: return [p, val.reduce((a, b) => a * b)];
							case 2: return [p, val.reduce((a, b) => Math.min(a, b))];
							case 3: return [p, val.reduce((a, b) => Math.max(a, b))];
							case 5: return [p, (val[0] > val[1]) ? 1 : 0];
							case 6: return [p, (val[0] < val[1]) ? 1 : 0];
							case 7: return [p, (val[0] == val[1]) ? 1 : 0];
						}
					}
				}
				
				var res = byte(bin);
				return versionsum;
			},
			
			part2 : function ()
			{
				var bin = input
				.split("")
				.map(a => 
					{
						a = parseInt(a, 16)
							.toString(2)
							.padStart(4, "0");
						return a;
					})
				.join()
				.replace(/,/g, "");
				
					
				var versionsum = 0;
				var byte = function(str)
				{
					versionsum += parseInt(str.slice(0, 3), 2);
					var id = parseInt(str.slice(3, 6), 2);
					var p;
					var val = [];

					if (id == 4) 
					{
						var ol = 6;
						var num = "";

						while (str[ol] == '1') 
						{
							num += str.slice(ol + 1, ol + 5);
							ol += 5;
						}

						num += str.slice(ol + 1, ol + 5);

						return [ol + 5, parseInt(num, 2)];
					} 
					else 
					{
						var ot = str[6];

						if (ot == '0') 
						{
							var l = parseInt(str.slice(7,22),2);
							var cnt = 0;

							while (cnt < l) 
							{
								var pkt = byte(str.slice(22 + cnt));
								cnt += pkt[0];
								val.push(pkt[1]);
							}

							p = 22 + l;

						} 
						else 
						{
							var l = parseInt(str.slice(7, 18), 2);
							var cnt = 18;

							for (var i = 0; i < l; i++) 
							{
								var pkt = byte(str.slice(cnt));
								cnt += pkt[0];
								val.push(pkt[1]);
							}

							p = cnt;
						}
					
						switch (id) 
						{
							case 0: return [p, val.reduce((a, b) => a + b)];
							case 1: return [p, val.reduce((a, b) => a * b)];
							case 2: return [p, val.reduce((a, b) => Math.min(a, b))];
							case 3: return [p, val.reduce((a, b) => Math.max(a, b))];
							case 5: return [p, (val[0] > val[1]) ? 1 : 0];
							case 6: return [p, (val[0] < val[1]) ? 1 : 0];
							case 7: return [p, (val[0] == val[1]) ? 1 : 0];
						}
					}
				}
				
				var res = byte(bin);
				return res[1];
			}
		},
		
		{ // 17
			part1 : function ()
			{
				var range = input
					.split(" ")
					.splice(2, 2)
					.map(a =>
					{
						a = a.split("=")[1]
							.replace(/,/g, "")
							.split("..")
							.map(Number)
							.sort((c, d) => d - c)
						return a;
					});

				var fling = function(range)
				{
					var arg = range[1].map(a => { return Math.abs(a) }).sort((a, b) => b - a)[0]
					var pos = { x : 0, y : 0 };
					var int = { x : 0, y : 0 };

					for(var i = 1; i <= range[0][1]; i++)
					{
						for(var j = arg; j >= -arg; --j)
						{
							pos = { x : 0, y : 0 };
							int = { x : parseInt(i.toString(10)), y : parseInt(j.toString(10)) };


							while (!(pos.y < range[1][1])) 
							{
								if (pos.x >= range[0][1] && pos.x <= range[0][0] && pos.y >= range[1][1] && pos.y <= range[1][0])
								{
									return (j * (j + 1)) / 2;
								} 

								pos.x += int.x;
								pos.y += int.y;
								int.x -= sign(int.x);
								int.y -= 1;
							}

							if (pos.x < range[0][1]) break;
						}
					}
					
				}
				
				return fling(range);
			},
			
			part2 : function ()
			{
				var range = input
					.split(" ")
					.splice(2, 2)
					.map(a =>
					{
						a = a.split("=")[1]
							.replace(/,/g, "")
							.split("..")
							.map(Number)
							.sort((c, d) => d - c)
						return a;
					});

				var fling = function(range)
				{
					var arg = range[1].map(a => { return Math.abs(a) }).sort((a, b) => b - a)[0];
					var pos = { x : 0, y : 0 };
					var int = { x : 0, y : 0 };
					var sum = 0;

					for(var i = 1; i <= range[0][0]; ++i)
					{
						for(var j = arg; j >= -arg; --j)
						{
							pos = { x : 0, y : 0 };
							int = { x : parseInt(i.toString(10)), y : parseInt(j.toString(10)) };


							while (!(pos.y < range[1][1])) 
							{
								if (pos.x >= range[0][1] && pos.x <= range[0][0] && pos.y >= range[1][1] && pos.y <= range[1][0])
								{
									++sum;
									break;
								} 

								pos.x += int.x;
								pos.y += int.y;
								int.x -= sign(int.x);
								int.y -= 1;
							}

							if (pos.x < range[0][1]) break;
						}
					}
					
					return sum;
				}
				
				return fling(range);
			}
		},
		
		{ // 18
			part1 : function ()
			{
				var split = input
							.split('\n')
							.map(s => s
									.split(',')
									.join("")
									.trim())
							.map(s => s
									.split("")
									.map(a => isNaN(a) ? a : Number(a)))

				var sum = split[0];
				
				var add = (a, b) =>
				{
					return ["[",...a,...b,"]"];
				}
				
				var explode = (a) =>
				{
					var open = 0;

					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(e == "[")open++;
						if(e == "]")open--;

						if(open == 5)
						{
							var buf = a.splice(i, 4);
							var up = i - 1;
							var down = i;

							while(down--)
							{
								if(!isNaN(a[down]))
								{
									a[down] += buf[1];
									break;
								}
							}

							while(up++ < a.length)
							{
								if(!isNaN(a[up]))
								{
									a[up] += buf[2];
									break;
								}
							}

							a.splice(i, 0, 0);
							explode(a);

							return true;
						}
					}

					return false;
				}
				
				var shard = (a) =>
				{
					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(!isNaN(e) && e > 9)
						{
							var l = Math.floor(e / 2);
							var h = Math.ceil(e / 2);
							var s = ['[',l,h,']'];
							a.splice(i, 1, ...s);
							return true;
						}
					}

					return false;
				}
				
				var magnitude = (a) =>
				{
					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(e == "]")
						{
							var buf = a.splice(i - 3, 4);
							var sum = buf[1] * 3 + buf[2] * 2;

							a.splice(i-3,0,sum);
							i -= 3;
						}
					}
					return a;
				}
				
				for (var i = 0; i < split.length - 1; i++) 
				{
					sum = add(sum, split[i + 1]);

					while(explode(sum) || shard(sum));
				}

				return magnitude(sum)[0];
			},
			
			part2 : function ()
			{
				var split = input
							.split('\n')
							.map(s => s
									.split(',')
									.join("")
									.trim())
							.map(s => s
									.split("")
									.map(a => isNaN(a) ? a : Number(a)))
				
				var sum = split[0];
				
				var add = (a, b) =>
				{
					return ["[",...a,...b,"]"];
				}
				
				var explode = (a) =>
				{
					var open = 0;

					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(e == "[")open++;
						if(e == "]")open--;

						if(open == 5)
						{
							var buf = a.splice(i, 4);
							var up = i - 1;
							var down = i;

							while(down--)
							{
								if(!isNaN(a[down]))
								{
									a[down] += buf[1];
									break;
								}
							}

							while(up++ < a.length)
							{
								if(!isNaN(a[up]))
								{
									a[up] += buf[2];
									break;
								}
							}

							a.splice(i, 0, 0);
							explode(a);

							return true;
						}
					}

					return false;
				}
				
				var shard = (a) =>
				{
					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(!isNaN(e) && e > 9)
						{
							var l = Math.floor(e / 2);
							var h = Math.ceil(e / 2);
							var s = ['[',l,h,']'];
							a.splice(i, 1, ...s);
							return true;
						}
					}

					return false;
				}
				
				var magnitude = (a) =>
				{
					for (var i = 0; i < a.length; i++) 
					{
						var e = a[i];

						if(e == "]")
						{
							var buf = a.splice(i - 3, 4);
							var sum = buf[1] * 3 + buf[2] * 2;

							a.splice(i-3,0,sum);
							i -= 3;
						}
					}
					return a;
				}
				
				var max = 0;

				for (var i = 0; i < split.length - 1; i++) 
				{ 
					for (var j = 0; j < split.length; j++) 
					{
						if(i != j){
							sum = add(split[i],split[j]);

							while(explode(sum) || shard(sum));
							max = Math.max( max, magnitude(sum));
						}
					}
				}

				return max;
			}
		},
		
		{ // 19
			part1 : function ()
			{
				var rots = 
				[
					([x, y, z]) => [x, y, z],
					([x, y, z]) => [y, z, x],
					([x, y, z]) => [z, x, y],
					([x, y, z]) => [-x, z, y],
					([x, y, z]) => [z, y, -x],
					([x, y, z]) => [y, -x, z],
					([x, y, z]) => [x, z, -y],
					([x, y, z]) => [z, -y, x],
					([x, y, z]) => [-y, x, z],
					([x, y, z]) => [x, -z, y],
					([x, y, z]) => [-z, y, x],
					([x, y, z]) => [y, x, -z],
					([x, y, z]) => [-x, -y, z],
					([x, y, z]) => [-y, z, -x],
					([x, y, z]) => [z, -x, -y],
					([x, y, z]) => [-x, y, -z],
					([x, y, z]) => [y, -z, -x],
					([x, y, z]) => [-z, -x, y],
					([x, y, z]) => [x, -y, -z],
					([x, y, z]) => [-y, -z, x],
					([x, y, z]) => [-z, x, -y],
					([x, y, z]) => [-x, -z, -y],
					([x, y, z]) => [-z, -y, -x],
					([x, y, z]) => [-y, -x, -z],
				];

				var transform = (s, r, d) => 
				{
					return s.map((b) => 
					{
						return r(b).map((c, i) => {
						return c + d[i];
						});
					});
				}

				var scanners = input.split('\n\n').map((scanner) => 
				{
					return scanner
					.split('\n')
					.slice(1)
					.map((line) => line.split(',').map(Number));
				});

				// figure out all overlapping detection cubes
				var transforms = scanners.map(() => ({}));
				transforms[0] = 
				{
					0: 
					[
						{
							rot: rots[0],
							dist: [0, 0, 0],
						},
					],
				};

				for (var i = 1; i < scanners.length; i++) 
				{
					var scanner1 = scanners[i];

					scanner2Loop: for (var j = 0; j < scanners.length; j++) {

						if (i === j) 
						{
							continue;
						}

						var scanner2 = scanners[j];
						for (var rot of rots) 
						{
							var distCounts = {};
							for (var beacon1 of scanner1) 
							{
								var [x1, y1, z1] = rot(beacon1);
								for (var beacon2 of scanner2) 
								{
									var [x2, y2, z2] = beacon2;
									var dist = [x2 - x1, y2 - y1, z2 - z1].join();
									distCounts[dist] = (distCounts[dist] ?? 0) + 1;

									if (distCounts[dist] === 12) 
									{
										transforms[i][j] = 
										[
											{
											rot,
											dist: dist.split(',').map(Number),
											},
										];

										continue scanner2Loop;
									}
								}
							}
						}

					}
				}

				while (transforms.some((t) => !t[0])) 
				{
					for (var i = 1; i < transforms.length; i++) 
					{
						if (transforms[i][0]) 
						{
							continue;
						}

						for (var j in transforms[i]) 
						{
							if (!transforms[j][0]) 
							{
								continue;
							}

							transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
							break;
						}
					}
				}

				var beacons = new Set(scanners[0].map((beacon) => beacon.join()));

				for (var i = 1; i < scanners.length; i++) 
				{
						var scanner = scanners[i];

						for (var { rot, dist } of transforms[i][0]) 
						{
							scanner = transform(scanner, rot, dist);
						}

						for (var beacon of scanner) 
						{
							beacons.add(beacon.join());
						}
				}

				return beacons.size;
			},
			
			part2 : function ()
			{
				var rots = 
				[
					([x, y, z]) => [x, y, z],
					([x, y, z]) => [y, z, x],
					([x, y, z]) => [z, x, y],
					([x, y, z]) => [-x, z, y],
					([x, y, z]) => [z, y, -x],
					([x, y, z]) => [y, -x, z],
					([x, y, z]) => [x, z, -y],
					([x, y, z]) => [z, -y, x],
					([x, y, z]) => [-y, x, z],
					([x, y, z]) => [x, -z, y],
					([x, y, z]) => [-z, y, x],
					([x, y, z]) => [y, x, -z],
					([x, y, z]) => [-x, -y, z],
					([x, y, z]) => [-y, z, -x],
					([x, y, z]) => [z, -x, -y],
					([x, y, z]) => [-x, y, -z],
					([x, y, z]) => [y, -z, -x],
					([x, y, z]) => [-z, -x, y],
					([x, y, z]) => [x, -y, -z],
					([x, y, z]) => [-y, -z, x],
					([x, y, z]) => [-z, x, -y],
					([x, y, z]) => [-x, -z, -y],
					([x, y, z]) => [-z, -y, -x],
					([x, y, z]) => [-y, -x, -z],
				];

				var transform = (s, r, d) => 
				{
					return s.map((b) => 
					{
						return r(b).map((c, i) => {
						return c + d[i];
						});
					});
				}

				var scanners = input.split('\n\n').map((scanner) => 
				{
					return scanner
					.split('\n')
					.slice(1)
					.map((line) => line.split(',').map(Number));
				});

				// figure out all overlapping detection cubes
				var transforms = scanners.map(() => ({}));
				transforms[0] = 
				{
					0: 
					[
						{
							rot: rots[0],
							dist: [0, 0, 0],
						},
					],
				};

				for (var i = 1; i < scanners.length; i++) 
				{
					var scanner1 = scanners[i];

					scanner2Loop: for (var j = 0; j < scanners.length; j++) {

						if (i === j) 
						{
							continue;
						}

						var scanner2 = scanners[j];
						for (var rot of rots) 
						{
							var distCounts = {};
							for (var beacon1 of scanner1) 
							{
								var [x1, y1, z1] = rot(beacon1);
								for (var beacon2 of scanner2) 
								{
									var [x2, y2, z2] = beacon2;
									var dist = [x2 - x1, y2 - y1, z2 - z1].join();
									distCounts[dist] = (distCounts[dist] ?? 0) + 1;

									if (distCounts[dist] === 12) 
									{
										transforms[i][j] = 
										[
											{
											rot,
											dist: dist.split(',').map(Number),
											},
										];

										continue scanner2Loop;
									}
								}
							}
						}

					}
				}

				while (transforms.some((t) => !t[0])) 
				{
					for (var i = 1; i < transforms.length; i++) 
					{
						if (transforms[i][0]) 
						{
							continue;
						}

						for (var j in transforms[i]) 
						{
							if (!transforms[j][0]) 
							{
								continue;
							}

							transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
							break;
						}
					}
				}

				// find max distance
				var scannerCoords = [[0, 0, 0]];
				for (var i = 1; i < scanners.length; i++) 
				{
					var scanner = [[0, 0, 0]];

					for (var { rot, dist } of transforms[i][0]) 
					{
						scanner = transform(scanner, rot, dist);
					}

					scannerCoords.push(scanner[0]);
				}

				var maxDist = 0;
				for (var i = 0; i < scannerCoords.length - 1; i++) 
				{
					var [x1, y1, z1] = scannerCoords[i];

					for (var j = 1; j < scannerCoords.length; j++) 
					{
						var [x2, y2, z2] = scannerCoords[j];
						maxDist = Math.max(
							maxDist,
							Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)
						);
					}
				}
					
				return (maxDist);
			}
		},
		
		{ // 20
			part1 : function ()
			{
				var [alg, img] = input.replace(/#/g, "1").replace(/\./g, "0").split("\n\n");
				alg = alg.split("");
				img = img.split("\n").map(a => a.split(""));

				var adj = [
					[-1, -1],
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 0],
					[0, 1],
					[1, -1],
					[1, 0],
					[1, 1]
				];
				
				var enhance = (a, im, t) =>
				{
					var ng = [];

					for (var i = -1; i < im.length + 1; i++) 
					{
						var row = [];

						for (var j = -1; j < im.length + 1; j++) 
						{
							var col = [];
				
							adj.forEach(([io, ro]) => 
							{
								col.push(im[i + io]?.[j + ro] ?? a[0] & t % 2);
							})

							row.push(a[parseInt(col.join(''), 2)]);
						}

						ng.push(row);
					}
					return ng;
				}
				
				
				var solve = (alg, img, times) =>
				{
					for (var t = 0; t < times; t++) 
					{
						img = enhance(alg, img, t);
					}

					return img.flat().filter((e) => e == 1).length;
				}

				return solve(alg, img, 2)
			},
			
			part2 : function ()
			{
				var [alg, img] = input.replace(/#/g, "1").replace(/\./g, "0").split("\n\n");
				alg = alg.split("");
				img = img.split("\n").map(a => a.split(""));

				var adj = [
					[-1, -1],
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 0],
					[0, 1],
					[1, -1],
					[1, 0],
					[1, 1]
				];
				
				var enhance = (a, im, t) =>
				{
					var ng = [];

					for (var i = -1; i < im.length + 1; i++) 
					{
						var row = [];

						for (var j = -1; j < im.length + 1; j++) 
						{
							var col = [];
				
							adj.forEach(([io, ro]) => 
							{
								col.push(im[i + io]?.[j + ro] ?? a[0] & t % 2);
							})

							row.push(a[parseInt(col.join(''), 2)]);
						}

						ng.push(row);
					}
					return ng;
				}
				
				
				var solve = (alg, img, times) =>
				{
					for (var t = 0; t < times; t++) 
					{
						img = enhance(alg, img, t);
					}

					return img.flat().filter((e) => e == 1).length;
				}

				return solve(alg, img, 50)
			}
		},
		
		{ // 21
			part1 : function ()
			{
				var starts = input.split("\n").map(a => { return parseInt(a.split(": ")[1]) })

				var p1 = 
				{
					pos: starts[0],
					score: 0
				}

				var p2 = 
				{
					pos: starts[1],
					score: 0
				}

				var cur = p1;
				var dice = 1;

				while (true) 
				{
					var rol = 3 * dice + 3;
					cur.pos = ((cur.pos - 1 + rol) % 10) + 1;
					cur.score += cur.pos;

					dice += 3;
			
					if(cur.score >= 1000) 
					{
						break;
					}

					cur = cur === p1 ? p2 : p1;
				}
				
				return (Math.min(p1.score, p2.score) * (dice - 1));
			},
			
			part2 : function ()
			{
				var starts = input.split("\n").map(a => { return parseInt(a.split(": ")[1]) })
				var p1 = {
					pos: starts[0],
					score: 0
				}

				var p2 = {
					pos: starts[1],
					score: 0
				}
				
				
				var run = (p1, p2, p1Turn) =>
				{

					if (p1.score >= 21) return 1;
					if (p2.score >= 21) return 0;

					var cur = p1Turn ? p1 : p2;

					var sum = 0;

					for (var out = 3; out <= 9; out++) 
					{
						var op = cur.pos;
						var os = cur.score;

						cur.pos = ((cur.pos - 1 + out) % 10) + 1;
						cur.score += cur.pos;

						sum += dist(out) * run(p1, p2, !p1Turn);

						cur.pos = op;
						cur.score = os;
					}

					return sum;
				}
				
				var dist = (num) =>
				{
					switch (num) {
						case 3: return 1;	 
						case 4: return 3;	 
						case 5: return 6;	
						case 6: return 7;	
						case 7: return 6;	
						case 8: return 3;	
						case 9: return 1;	 
					}
				}

				return (run(p1, p2, true));
			}
		},
		
		{ // 22
			part1 : function ()
			{
				var split = input.replace(/on/g, "1").replace(/off/g, "0").split("\n").map(a => a.split(" "));
				var culm = new Set();

				split.forEach(a => 
				{
					a[0] = parseInt(a[0]);
					a[1] = a[1].split(",").map(b => { return b.split("=")[1].split("..").map(Number); })

					return a;
				})

				for(var i = 0; i < split.length; i++)
				{
					var [mode, range] = split[i];

					if((range[0][0] >= -50 && range[0][1] <= 50) || (range[1][0] >= -50 && range[1][1] <= 50) || (range[2][0] >= -50 && range[2][1] <= 50))
					{
						if(mode)
						{
							for(var x = range[0][0]; x <= range[0][1]; x++)
							{
								for(var y = range[1][0]; y <= range[1][1]; y++)
								{
									for(var z = range[2][0]; z <= range[2][1]; z++)
									{
										if(!culm.has(`${x},${y},${z}`))
										{
											culm.add(`${x},${y},${z}`);
										}
									}
								}
							}
						}
						else
						{
							for(var x = range[0][0]; x <= range[0][1]; x++)
							{
								for(var y = range[1][0]; y <= range[1][1]; y++)
								{
									for(var z = range[2][0]; z <= range[2][1]; z++)
									{
										if(culm.has(`${x},${y},${z}`)) culm.delete(`${x},${y},${z}`)
									}
								}
							}
						}
					}
				}

				return culm.size
			},
			
			part2 : function ()
			{
				var instructions = input.replace(/on/g, "1").replace(/off/g, "0").split('\n').map(a => [a.substr(0, 2), [...a.substr(3).matchAll(/-?\d+/g)].map(b => parseInt(b[0]))]);
				var sum = 0;
				var boxes = [];

				var lov = (mn1, mx1, mn2, mx2) => [Math.max(mn1, mn2), Math.min(mx1, mx2)];
				var vol = (b) => (b.x2 - b.x1 + 1) * (b.y2 - b.y1 + 1) * (b.z2 - b.z1 + 1);

				var nbox = (x1, x2, y1, y2, z1, z2) => ({
					x1: x1,
					x2: x2,
					y1: y1,
					y2: y2,
					z1: z1,
					z2: z2
				});

				var overlap = (box, boxes) =>
				{
					return boxes.map(b => 
					{
						var [omnX, omxX] = lov(box.x1, box.x2, b.x1, b.x2);
						var [omnY, omxY] = lov(box.y1, box.y2, b.y1, b.y2);
						var [omnZ, omxZ] = lov(box.z1, box.z2, b.z1, b.z2);

						if (omxX - omnX >= 0 && omxY - omnY >= 0 && omxZ - omnZ >= 0) 
						{
							var temp_box = nbox(omnX, omxX, omnY, omxY, omnZ, omxZ);
							return vol(temp_box) - overlap(temp_box, boxes.slice(1 + boxes.indexOf(b)));
						} 
						else 
						{
							return 0;
						}
					}).reduce((a, b) => a + b, 0);
				}

				_.each(instructions.reverse(), i => 
				{
					var box = nbox(...i[1]);

					parseInt(i[0]) && (sum += vol(box) - overlap(box, boxes));
					boxes.push(box);
				})

				return sum;
			}
		},
		
		{ // 23
			part1 : function ()
			{
				var raw = input;

				var inpp = (raw) => 
				{
					var letters = {
						A: 0,
						B: 1,
						C: 2,
						D: 3,
					};
					
					var toads = raw
						.split("\n")
						.slice(2, 4)
						.map((s) =>
						s
							.trim()
							.replace(/#/g, "")
							.split("")
							.map((l) => letters[l]),
						);
					
					var hallway = [...Array(11)].map((_, i) =>
						i > 0 && i < 10 && i % 2 === 0 ? null : false, );
					
					var rooms = [];

					for (var i = 0; i < toads[0].length; i++) 
					{
						var room = [];

						for (var j = 0; j < toads.length; j++) 
						{
							room.push(toads[j][i]);
						}

						rooms.push(room);
					}
					
					return { hallway, rooms };
				};
					
				var stateCosts = new Map();
				var minimumCost = Infinity;
					
				var getStateKey = ({ hallway, rooms }) => hallway + "|" + rooms;
					
				var play = (state, init = false) => 
				{
						if (init) 
						{
							stateCosts.clear();
							minimumCost = Infinity;
						}
						
						if (state.cost > minimumCost) return;
						
						var { cost, hallway, rooms } = state;
						var stateKey = getStateKey({ hallway, rooms });
						
						var won = rooms.every((room, i) => room.every((toad) => toad === i));
						if (won) 
						{
							if (cost < minimumCost) 
							{
								minimumCost = cost;
							}

							return;
						}
						
						if ((stateCosts.get(stateKey) ?? Infinity) <= cost) return;

						stateCosts.set(stateKey, cost);
						
						for (var hallSpot = 0; hallSpot < hallway.length; hallSpot += 1) 
						{
							if (hallway[hallSpot] === null || hallway[hallSpot] === false) continue;
						
							var toad = hallway[hallSpot];
						
							if (rooms[toad].every((t) => t === toad || t === false)) 
							{
								var homeSpot = toad * 2 + 2;
							
								var allClear = false;

								if (homeSpot > hallSpot) 
								{
									var ahead = hallway.slice(hallSpot + 1, homeSpot);

									if (ahead.every((spot) => spot === false || spot === null)) 
									{
									allClear = true;
									}
								} 
								else 
								{
									var behind = hallway.slice(homeSpot, hallSpot);
									if (behind.every((spot) => spot === false || spot === null)) 
									{
										allClear = true;
									}
								}
						
							if (allClear) 
							{
								var roomIndex =
								rooms[toad].filter((spot) => spot === false).length - 1;
						
								var newHallway = [...hallway];
								var newRooms = JSON.parse(JSON.stringify(rooms));
						
								newHallway[hallSpot] = false;
								newRooms[toad][roomIndex] = toad;
						
								var newCost =
								(Math.abs(hallSpot - homeSpot) +
									rooms[toad].filter((t) => t === false).length) *
								10 ** toad;
						
								play({
									cost: cost + newCost,
									hallway: newHallway,
									rooms: newRooms,
								});
							}
						}
					}
					
					for (var room = 0; room < rooms.length; room += 1) {
						if (rooms[room].every((t) => t === room || t === false)) continue;
					
						var depth = rooms[room].filter((t) => t === false).length;
						var toadSpot = room * 2 + 2;
					
						if (depth === rooms[0].length)continue;
					
						var tryHallSpot = (hallSpot) => 
						{
							var newHallway = [...hallway];
							var newRooms = JSON.parse(JSON.stringify(rooms));
						
							newHallway[hallSpot] = rooms[room][depth];
							newRooms[room][depth] = false;
						
							var newCost =
								(depth + 1 + Math.abs(toadSpot - hallSpot)) * 10 ** rooms[room][depth];
						
							play({ cost: cost + newCost, hallway: newHallway, rooms: newRooms });
						};
					
						for (var hallSpot = toadSpot - 1; hallSpot >= 0; hallSpot -= 1) 
						{
							if (hallway[hallSpot] === null) continue;
							if (hallway[hallSpot] !== false) break;
					
						tryHallSpot(hallSpot);
						}
					
						for (var hallSpot = toadSpot + 1; hallSpot < hallway.length; hallSpot += 1) {
							if (hallway[hallSpot] === null) continue;
							if (hallway[hallSpot] !== false) break;
					
							tryHallSpot(hallSpot);
						}
					}
				};
				
				 
				var state = { cost: 0, ...inpp(raw) };
				play(state, true);

				return minimumCost;
					
			},
			
			part2 : function ()
			{
				var raw = input;

				var inpp = (raw) => 
				{
					var letters = {
						A: 0,
						B: 1,
						C: 2,
						D: 3,
					};
					
					var toads = raw
						.split("\n")
						.slice(2, 4)
						.map((s) =>
						s
							.trim()
							.replace(/#/g, "")
							.split("")
							.map((l) => letters[l]),
						);
					
					var hallway = [...Array(11)].map((_, i) =>
						i > 0 && i < 10 && i % 2 === 0 ? null : false, );
					
					var rooms = [];

					for (var i = 0; i < toads[0].length; i++) 
					{
						var room = [];

						for (var j = 0; j < toads.length; j++) 
						{
							room.push(toads[j][i]);
						}

						rooms.push(room);
					}
					
					return { hallway, rooms };
				};
					
				var stateCosts = new Map();
				var minimumCost = Infinity;
					
				var getStateKey = ({ hallway, rooms }) => hallway + "|" + rooms;
					
				var play = (state, init = false) => 
				{
						if (init) 
						{
							stateCosts.clear();
							minimumCost = Infinity;
						}
						
						if (state.cost > minimumCost) return;
						
						var { cost, hallway, rooms } = state;
						var stateKey = getStateKey({ hallway, rooms });
						
						var won = rooms.every((room, i) => room.every((toad) => toad === i));
						if (won) 
						{
							if (cost < minimumCost) 
							{
								minimumCost = cost;
							}

							return;
						}
						
						if ((stateCosts.get(stateKey) ?? Infinity) <= cost) return;

						stateCosts.set(stateKey, cost);
						
						for (var hallSpot = 0; hallSpot < hallway.length; hallSpot += 1) 
						{
							if (hallway[hallSpot] === null || hallway[hallSpot] === false) continue;
						
							var toad = hallway[hallSpot];
						
							if (rooms[toad].every((t) => t === toad || t === false)) 
							{
								var homeSpot = toad * 2 + 2;
							
								var allClear = false;

								if (homeSpot > hallSpot) 
								{
									var ahead = hallway.slice(hallSpot + 1, homeSpot);

									if (ahead.every((spot) => spot === false || spot === null)) 
									{
									allClear = true;
									}
								} 
								else 
								{
									var behind = hallway.slice(homeSpot, hallSpot);
									if (behind.every((spot) => spot === false || spot === null)) 
									{
										allClear = true;
									}
								}
						
							if (allClear) 
							{
								var roomIndex =
								rooms[toad].filter((spot) => spot === false).length - 1;
						
								var newHallway = [...hallway];
								var newRooms = JSON.parse(JSON.stringify(rooms));
						
								newHallway[hallSpot] = false;
								newRooms[toad][roomIndex] = toad;
						
								var newCost =
								(Math.abs(hallSpot - homeSpot) +
									rooms[toad].filter((t) => t === false).length) *
								10 ** toad;
						
								play({
									cost: cost + newCost,
									hallway: newHallway,
									rooms: newRooms,
								});
							}
						}
					}
					
					for (var room = 0; room < rooms.length; room += 1) {
						if (rooms[room].every((t) => t === room || t === false)) continue;
					
						var depth = rooms[room].filter((t) => t === false).length;
						var toadSpot = room * 2 + 2;
					
						if (depth === rooms[0].length)continue;
					
						var tryHallSpot = (hallSpot) => 
						{
							var newHallway = [...hallway];
							var newRooms = JSON.parse(JSON.stringify(rooms));
						
							newHallway[hallSpot] = rooms[room][depth];
							newRooms[room][depth] = false;
						
							var newCost =
								(depth + 1 + Math.abs(toadSpot - hallSpot)) * 10 ** rooms[room][depth];
						
							play({ cost: cost + newCost, hallway: newHallway, rooms: newRooms });
						};
					
						for (var hallSpot = toadSpot - 1; hallSpot >= 0; hallSpot -= 1) 
						{
							if (hallway[hallSpot] === null) continue;
							if (hallway[hallSpot] !== false) break;
					
						tryHallSpot(hallSpot);
						}
					
						for (var hallSpot = toadSpot + 1; hallSpot < hallway.length; hallSpot += 1) {
							if (hallway[hallSpot] === null) continue;
							if (hallway[hallSpot] !== false) break;
					
							tryHallSpot(hallSpot);
						}
					}
				};
				

				var state = { cost: 0, ...inpp(raw) };
					
				state.rooms[0] = [state.rooms[0][0], 3, 3, state.rooms[0][1]];
				state.rooms[1] = [state.rooms[1][0], 2, 1, state.rooms[1][1]];
				state.rooms[2] = [state.rooms[2][0], 1, 0, state.rooms[2][1]];
				state.rooms[3] = [state.rooms[3][0], 0, 2, state.rooms[3][1]];
					
				play(state, true);

				return minimumCost
			}
		},
		
		{ // 24
			part1 : function ()
			{
				var split = input.split("\n")
				var terms = [];

				for (var i = 0; i < split.length; i += 18) 
				{
					terms.push([4, 5, 15].map((j) => +split[i + j].split(' ')[2]));
				}

				var prev = [];
				var digi = [];

				for (var [i, [a, b, c]] of Object.entries(terms)) 
				{
					if (a === 1) 
					{
						prev.push([i, c]);
					} 
					else 
					{
						const [prevI, prevC] = prev.pop();
						const complement = prevC + b;
						digi[prevI] = Math.min(9, 9 - complement)
						digi[i] = digi[prevI] + complement;
					}
				}
				
				return digi.join('');
			},
			
			part2 : function ()
			{
				var split = input.split("\n")
				var terms = [];

				for (var i = 0; i < split.length; i += 18) 
				{
					terms.push([4, 5, 15].map((j) => +split[i + j].split(' ')[2]));
				}

				var prev = [];
				var digi = [];

				for (var [i, [a, b, c]] of Object.entries(terms)) 
				{
					if (a === 1) 
					{
						prev.push([i, c]);
					} 
					else 
					{
						const [prevI, prevC] = prev.pop();
						const complement = prevC + b;
						digi[prevI] = Math.max(1, 1 - complement);
						digi[i] = digi[prevI] + complement;
					}
				}

				return digi.join('');
			}
		},
		
		{ // 25
			part1 : function ()
			{
				
				var map = input.split("\n").map(a => a.split(""));
				const height = map.length;
				const width = map[0].length;

				var moved = true;
				var steps = 0;

				// Handle right facing cucumbers
				var newMap = dupArray(map);
					
				while (moved)
				{
					steps++;
					moved = false;
				
					// Handle right facing cucumbers
					var newMap = dupArray(map);

					for(var i = 0; i < height; i++)
					{
						for(var j = 0; j < width; j++)
						{
							if(map[i][j] === '>' && map[i][(j+1) % width] === '.')
							{
								newMap[i][j] = '.';
								newMap[i][(j+1) % width] = '>';
								moved = true;
							}
						}
					}
					
					// Handle down facing cucumbers
					map = dupArray(newMap);

					for(var i = 0; i < height; i++)
					{
						for(var j = 0; j < width; j++)
						{
							if(newMap[i][j] === 'v' && newMap[(i + 1) % height][j] === '.')
							{
								map[i][j] = '.';
								map[(i + 1) % height][j] = 'v';
								moved = true;
							}
						}
					}
					
				}

				return steps;
			},
			
			part2 : function ()
			{
				return "YOU DID IT!"
			}
		}
	]
}

function createArray(length) {
	var arr = new Array(length || 0)
	var i = length;

	if (arguments.length > 1) 
	{
			var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function sign(n)
{
	return (n == 0) ? 0 : ((n > 0) ? 1 : -1);
}

function charCount(str)
{
	var counts = {};
	var ch, index, len, count;

	for (index = 0, len = str.length; index < len; ++index) {
		ch = str.charAt(index); 
		count = counts[ch];
		counts[ch] = count ? count + 1 : 1;
	}

	return counts
}

function dupArray(a)
{
	return JSON.parse(JSON.stringify(a))
}
