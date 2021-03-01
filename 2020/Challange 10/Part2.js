
var input = 
`97
62
23
32
51
19
98
26
90
134
73
151
116
76
6
94
113
127
119
44
115
50
143
150
86
91
36
104
131
101
38
66
46
96
54
70
8
30
1
108
69
139
24
29
77
124
107
14
137
16
140
80
68
25
31
59
45
126
148
67
13
125
53
57
41
47
35
145
120
12
37
5
110
138
130
2
63
83
22
79
52
7
95
58
149
123
89
109
15
144
114
9
78`

var work = input.split("\n");
work = work.sort(function(a, b){return a - b});

function possibilities(arr) {
	arr = arr.reduce((solved, i) => 
	{
		solved[i] = bundle_or(solved, -3, 0, i); // -3 because of the range (1 - 3)
		return solved;
	}, [1]) //Can't do 0, that returns 0 :/
	
	return arr[arr.length - 1];
}

function bundle_or(arr, n, oror, base)
{
	var b = 0
	
	for(var i = 1; i < abs(n) + 1; i++)
	{
		b += (arr[base * 1 + i * sign(n)] || oror)
	}
	
	return b;
}

function abs(n)
{
	if(n < 0) return n * -1;
	return n;
}

function sign(n)
{
	if(n < 0) return -1;
	if(n > 0) return 1;
	return 0;
}

var answer = possibilities(work);
console.log(answer);