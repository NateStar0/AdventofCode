var data = 
`##.#....
...#...#
.#.#.##.
..#.#...
.###....
.##.#...
#.##..##
#.####..`

function arrayClone( arr ) {

    var i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }

}

function main_3D(input, n){
	var current = [];
	input.split('\n').forEach((r, y)=>
	{
		r.split('').forEach((c, x)=>
		{
			if(c == '#') current.push([x, y, 0])
		})
	})
	
	console.log(current, current.length)
	
	var limits = [[0, input.split('\n')[0].length], [0, input.split('\n').length], [0, 0]];
	
	var turn = 0; 
	
	while(turn < n)
	{
		var prev = arrayClone(current)
		console.log(prev.length, current.length)

		prev.forEach(val=>
		{
			if(val[0] - 1 < limits[0][0]) limits[0][0] = val[0] - 1;
			if(val[0] + 1 > limits[0][1]) limits[0][1] = val[0] + 1;
			if(val[1] - 1 < limits[1][0]) limits[1][0] = val[1] - 1;
			if(val[1] + 1 > limits[1][1]) limits[1][1] = val[1] + 1;
			if(val[2] - 1 < limits[2][0]) limits[2][0] = val[2] - 1;
			if(val[2] + 1 > limits[2][1]) limits[2][1] = val[2] + 1;
		})
		
		for(var x = limits[0][0];x <= limits[0][1]; x++)
		{
			for(var y = limits[1][0];y <= limits[1][1]; y++)
			{
				for(var z = limits[2][0];z <= limits[2][1]; z++)
				{
					var neigh = 0;
				  
					for(var j = -1; j < 2; j++)
					{
						for(var k = -1; k < 2; k++)
						{
							for(var l = -1; l < 2; l++)
							{
								var has = false;
								for(var find = 0; find < prev.length; find++)
								{
									var arr = prev[find];
									if(arr[0] == x + j && arr[1] == y + k && arr[2] == z + l)
									{
										has = true;
									}
								}
								
								//console.log(has, x, y, z, "|" +  j, k, l)
								if((j + k + l != 0) && has)
								{
									neigh += 1;
								}
							}
						}
					}
					
					//console.log(neigh)
					
					var has = false;
					for(var find = 0; find < prev.length; find++)
					{
						var arr = prev[find];
						if(arr[0] == x && arr[1] == y && arr[2] == z)
						{
							has = true;
						}
					}

					if(has)
					{
						if(!(neigh == 2 || neigh == 3))
						{
							  var index = 0;
							  for(var ind_find = 0; ind_find < current.length; ind_find++)
							  {
								  var a = current[ind_find];
								  if(a[0] == x && a[1] == y && a[2] == z)
								  {
									  index = ind_find;
								  }
							  }
							  
							  current.splice(index, 1);
							  //console.log(current.length)
						}
					}
					else 
					{
						if(neigh == 3)
						{
							current.push([x, y, z])
							//console.log(current.length)
						}
					}
				}
			}
		}
		turn++
		console.log(current.length)
	}

	return current.length
}


function main_4D(input, n){
	var current = [];
	input.split('\n').forEach((r, y)=>
	{
		r.split('').forEach((c, x)=>
		{
			if(c == '#') current.push([x, y, 0, 0])
		})
	})
	
	console.log(current, current.length)
	
	var limits = [[0, input.split('\n')[0].length], [0, input.split('\n').length], [0, 0], [0, 0]];
	
	var turn = 0; 
	
	while(turn < n)
	{
		var prev = arrayClone(current)
		console.log(prev.length, current.length)

		prev.forEach(val=>
		{
			if(val[0] - 1 < limits[0][0]) limits[0][0] = val[0] - 1;
			if(val[0] + 1 > limits[0][1]) limits[0][1] = val[0] + 1;
			if(val[1] - 1 < limits[1][0]) limits[1][0] = val[1] - 1;
			if(val[1] + 1 > limits[1][1]) limits[1][1] = val[1] + 1;
			if(val[2] - 1 < limits[2][0]) limits[2][0] = val[2] - 1;
			if(val[2] + 1 > limits[2][1]) limits[2][1] = val[2] + 1;
			if(val[3] - 1 < limits[3][0]) limits[3][0] = val[3] - 1;
			if(val[3] + 1 > limits[3][1]) limits[3][1] = val[3] + 1;
		})
		
		for(var x = limits[0][0];x <= limits[0][1]; x++)
		{
			for(var y = limits[1][0];y <= limits[1][1]; y++)
			{
				for(var z = limits[2][0];z <= limits[2][1]; z++)
				{
					for(var w = limits[3][0];w <= limits[3][1]; w++)
					{
						var neigh = 0;
					  
						for(var j = -1; j < 2; j++)
						{
							for(var k = -1; k < 2; k++)
							{
								for(var l = -1; l < 2; l++)
								{
									for(var o = -1; o < 2; o++)
									{
										var has = false;
										for(var find = 0; find < prev.length; find++)
										{
											var arr = prev[find];
											if(arr[0] == x + j && arr[1] == y + k && arr[2] == z + l && arr[3] == w + o)
											{
												has = true;
											}
										}
										
										//console.log(has, x, y, z, "|" +  j, k, l)
										if((j + k + l + o != 0) && has)
										{
											neigh += 1;
										}
									}
								}
							}
						}
						
						//console.log(neigh)
						
						var has = false;
						for(var find = 0; find < prev.length; find++)
						{
							var arr = prev[find];
							if(arr[0] == x && arr[1] == y && arr[2] == z && arr[3] == w)
							{
								has = true;
							}
						}

						if(has)
						{
							if(!(neigh == 2 || neigh == 3))
							{
								  var index = 0;
								  for(var ind_find = 0; ind_find < current.length; ind_find++)
								  {
									  var a = current[ind_find];
									  if(a[0] == x && a[1] == y && a[2] == z && a[3] == w)
									  {
										  index = ind_find;
									  }
								  }
								  
								  current.splice(index, 1);
								  //console.log(current.length)
							}
						}
						else 
						{
							if(neigh == 3)
							{
								current.push([x, y, z, w])
								//console.log(current.length)
							}
						}
					}
				}
			}
		}
		turn++
		console.log(current.length)
	}
}

console.log(main_3D(data, 6), main_4D(data, 6));
