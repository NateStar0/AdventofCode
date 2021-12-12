var fs = require("fs");
var day = 13;
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

function sign(n)
{
	return (n == 0) ? 0 : ((n > 0) ? 1 : -1);
}

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}
