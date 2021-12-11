var fs = require("fs");
var day = 26;
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
                var arr = input.split("\n").map(Number)
				var results = []
                var uhhuh = [];

                for(var i = 0; i < 200; i++)
                {
                    results[i] = 2020 - arr[i];
                }

                for(var j = 0; j < 200; j++)
                {
                    if(arr.includes(results[j]))
                    {
                        uhhuh.push(arr[j]);
                    }
                }

                return uhhuh[0] * uhhuh[1]
			},
			
			part2 : function ()
			{
                var arr = input.split("\n").map(Number)

				for(var i = 0; i < 200; i++)
                {
                    for(var j = 0; j < 200; j++)
                    {
                        for(var v = 0; v < 200; v++)
                        {
                            if(2020 == arr[j] + arr[v] + arr[i])
                            {  
                                return (arr[i] * arr[j] * arr[v])
                            }
                        }
                    }
                }
			}
		},

        { // 2
			part1 : function ()
			{
				var count = (main_str, sub_str) =>
                {
                    main_str += '';
                    sub_str += '';

                    if (sub_str.length <= 0) 
                    {
                        return main_str.length + 1;
                    }

                    subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
                }

                var arr = input.split("\n")
                var w = []; //uhh, i don't remember
                var r = []; //Range
                var validnumb = 0;

                for(var i = 0; i < arr.length; i++)
                {
                    //Get the 
                    w[i] = arr[i].split(":");
                    
                    var values = w[i];
                    r[i] = values[0].split("-");
                    var x = w[i];
                    
                    var check_index = r[i];
                    var check_nest = String(check_index[1]);
                    var check_pre = check_nest.split(" ")
                    var check_final = check_pre[1];
                    //console.log(check_final);
                    
                    //See if a password is valid
                    var numb = count(x[1], check_final);
                    var range = r[i]
                    var str = String(range[1]);
                    var maxrange = str.slice(0, -2);	
                    if(numb >= range[0] && numb <= maxrange) validnumb ++;
                }


                return validnumb
			},
			
			part2 : function ()
			{
                var arr = input.split("\n")
                var w = []; //uhh, i don't remember
                var r = []; //Range
                var validnumb = 0;

                for(var i = 1; i < arr.length; i++)
                {
                    //Get the 
                    w[i] = arr[i].split(":");
                    
                    var values = w[i];
                    r[i] = values[0].split("-");
                    
                    var check_index = r[i];
                    var check_nest = String(check_index[1]);
                    var check_pre = check_nest.split(" ")
                    var check_final = check_pre[1];
                    
                    var range = r[i]
                    var str = String(range[1]);
                    var maxrange = str.slice(0, -2);
                    var g = values[1];
                    
                    var pos_one = (g.charAt(range[0])) == check_final;
                    var pos_two = (g.charAt(maxrange)) == check_final;

                    if((pos_one || pos_two ) && !(pos_one && pos_two)) validnumb ++;
                }

                return validnumb
			}
		},

        { // 3
			part1 : function ()
			{
                var outputall = true;
                //var input = input.replace(/\n/gm, "")
                var width = input.split("\n")[0].length + 1;
                var youch_owwie_IhithefuckingtreepleasehelpIaminpain = 0;
                var access_x = 0;
                var access = 0;

                //Do the Jazz
                for(var i = 0; i < (input.length / width) - 1; i++)
                {
                    //Where i is height
                    var access_y = i;
                    var temp_x = access_x % (width - 1);
                    //console.log(temp_x)
                    
                    var access_index = width * access_y + (temp_x) + 1;
                    
                    if(input.charAt(access_index) == "#") 
                    {
                        input = input.replaceAt(access_index, "X")
                        youch_owwie_IhithefuckingtreepleasehelpIaminpain ++;
                    }
                    else
                    {
                        if(input.charAt(access_index) != "\n")
                        {
                            input = input.replaceAt(access_index, "O")
                        }
                        else
                        {
                            input = input.replaceAt(access_index, "O")
                        }
                    }
                    
                    access_x += 3;
                }
                return youch_owwie_IhithefuckingtreepleasehelpIaminpain 
			},
			
			part2 : function ()
			{
                var width = 32;
                var youch_owwie_IhithefuckingtreepleasehelpIaminpain = 0;
                var access_x = 0;

                //Do the Jazz
                for(var i = 0; i < (input.length / width) - 1; i += 2)
                {
                    //Where i is height
                    var access_y = i;
                    var temp_x = access_x % (width - 1);                 
                    var access_index = width * access_y + (temp_x) + 1;
                    
                    if(input.charAt(access_index) == "#") 
                    {
                        input = input.replaceAt(access_index, "X")
                        youch_owwie_IhithefuckingtreepleasehelpIaminpain ++;
                    }
                    else
                    {
                        if(input.charAt(access_index) != "\n")
                        {
                            input = input.replaceAt(access_index, "O")
                        }
                        else
                        {
                            input = input.replaceAt(access_index, "O")
                        }
                    }
                    
                    access_x += 1;
                }


                //Output the final data
                return 87 * 169 * 99 * 98 * 53
			}
		},

        { // 4
			part1 : function ()
			{
				var valid = 0;
                var pass = input.split("\n\n");
                pass.forEach(validate)

                function count(main_str, sub_str) 
                {
                    main_str += '';
                    sub_str += '';

                    if (sub_str.length <= 0) 
                    {
                        return main_str.length + 1;
                    }

                    subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
                }

                function validate(item)
                {
                    console.log(item + "\n");
                    
                    var has_byr = count(item, "byr") > 0;
                    var has_iyr = count(item, "iyr") > 0;
                    var has_eyr = count(item, "eyr") > 0;
                    var has_hgt = count(item, "hgt") > 0;
                    var has_hcl = count(item, "hcl") > 0;
                    var has_ecl = count(item, "ecl") > 0;
                    var has_pid = count(item, "pid") > 0;
                    
                    if(has_byr && has_iyr && has_eyr && has_hgt && has_hcl && has_ecl && has_pid)
                    {
                        valid++;
                    }
                }

                return valid
			},
			
			part2 : function ()
			{
				var valid = 0;
                var pass = input.split("\n\n");
                var logall = false;
                pass.forEach(validate);

                function count(main_str, sub_str) 
                {
                    main_str += '';
                    sub_str += '';

                    if (sub_str.length <= 0) 
                    {
                        return main_str.length + 1;
                    }

                    subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
                }

                function validate(item)
                {
                    if(logall) console.log(item + "\n");
                    
                    var has_byr = count(item, "byr") > 0;
                    var has_iyr = count(item, "iyr") > 0;
                    var has_eyr = count(item, "eyr") > 0;
                    var has_hgt = count(item, "hgt") > 0;
                    var has_hcl = count(item, "hcl") > 0;
                    var has_ecl = count(item, "ecl") > 0;
                    var has_pid = count(item, "pid") > 0;
                    
                    if(has_byr && has_iyr && has_eyr && has_hgt && has_hcl && has_ecl && has_pid)
                    {	
                        var vhas_byr = birth_valid(item);
                        var vhas_iyr = issue_valid(item);
                        var vhas_eyr = expire_valid(item);
                        var vhas_hgt = height_valid(item);
                        var vhas_hcl = hair_valid(item);
                        var vhas_ecl = eye_valid(item);
                        var vhas_pid = pass_valid(item);
                        
                        console.log(vhas_byr && vhas_iyr && vhas_eyr && vhas_hgt && vhas_hcl && vhas_ecl && vhas_pid);
                        
                        if(vhas_byr && vhas_iyr && vhas_eyr && vhas_hgt && vhas_hcl && vhas_ecl && vhas_pid)
                        {
                            valid++;
                        }
                    }
                }

                function birth_valid(item)
                {
                    //byr (Birth Year) - four digits; at least 1920 and at most 2002.
                    var work = item.split("byr:")
                    var access = work[1];
                    var numb = access.substring(0, 4);
                    if(numb < 2003 && numb > 1919)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                function issue_valid(item)
                {
                    //iyr (Issue Year) - four digits; at least 2010 and at most 2020.
                    var work = item.split("iyr:")
                    var access = work[1];
                    var numb = access.substring(0, 4);
                    if(numb < 2021 && numb > 2009)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    
                }

                function expire_valid(item)
                {
                    //eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
                    var work = item.split("eyr:")
                    var access = work[1];
                    var numb = access.substring(0, 4);
                    var val = (numb < 2031 && numb > 2019);
                    
                    if(val)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                function height_valid(item)
                {
                    //hgt (Height) - a number followed by either cm or in:
                    //If cm, the number must be at least 150 and at most 193.
                    //If in, the number must be at least 59 and at most 76.
                    var work = item.split("hgt:")
                    var t = work[1];
                    var access = t.substring(0, 6)
                    var good = false;
                    var h = "";
                    
                    var type =  -1;
                    
                    if(access.charAt(3) == "c")
                    {
                        type = 0;
                        h = access.substring(0, 3);
                        
                        if(h > 149 && h < 194) good = true;
                    }
                    
                    if(access.charAt(3) == "n")
                    {
                        type = 1;
                        h = access.substring(0, 2);
                        
                        if(h > 59 && h < 76) good = true;
                    }
                    
                    return good;
                }

                function hair_valid(item)
                {
                    //hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                    var work = item.split("hcl:")
                    var access = work[1];
                    
                    var hash = access.charAt(0) == "#";
                    var numb = access.substring(1, 7);
                    
                    var valhex = true;
                    
                    for(var j = 0; j < 6;j++)
                    {
                        var g = numb.charAt(j)
                        var brute = (g > -1 && g <= 9) || (g == "a") || (g == "b")|| (g == "c") || (g == "d") || (g == "e") || (g == "f")
                        if(!brute)
                        {
                            valhex = false;
                        }
                    }
                    
                    if(valhex)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                function eye_valid(item)
                {
                    //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                    var work = item.split("ecl:")
                    var access = work[1];
                    var col = access.substring(0, 3);
                    
                    var is_amb = (col == "amb")
                    var is_blu = (col == "blu")
                    var is_brn = (col == "brn")
                    var is_gry = (col == "gry")
                    var is_grn = (col == "grn")
                    var is_hzl = (col == "hzl")
                    var is_oth = (col == "oth")
                    
                    var val = (is_amb || is_blu || is_brn || is_gry || is_grn || is_hzl || is_oth)
                    
                    if(val)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                    
                }

                function pass_valid(item)
                {
                    //pid (Passport ID) - a nine-digit number, including leading zeroes.
                    var work = item.split("pid:")
                    var access = work[1];
                    var numb = access.substring(0, 9);
                    numb = numb.replace(" ", "")
                    
                    console.log(!isNaN(numb), numb.length == 9, numb, access)
                    if(!isNaN(numb) && numb.length == 9)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                return valid
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
				return "C"
			}
		},

		{ // 25
			part1 : function ()
			{
				return "Nope"
			},
			
			part2 : function ()
			{
				return "Not 2020"
			}
		}
    ]
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
