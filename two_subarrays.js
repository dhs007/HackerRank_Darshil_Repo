'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    var n = parseInt(readLine(), 10);
    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));
    var bestF = -1000, shortest = -1, count = 0, mx = -1000;
	while(n > 0 && a[n - 1] <= 0) {
		n--;
		if(a[n] > mx) mx = a[n];
	}
	if(n == 0) {
		bestF = mx;
		count = 1;
	}
	for (var b = 0; b < n; b++) {
		var sum = 0;
		var m = new Array(41).fill(0);
		var max = 0;
		if(b > 0 && a[b] == a[b - 1]) continue;
		if(bestF > 200 && a[b - 1] > 0) continue;
		for (var e = b; e < n; e++) {
			var ae = a[e];
			sum += ae;
			if(sum <= 0) {
				if(e == b) {
					var f = a[b] < 0 ? a[b] : 0;
					if(f > bestF) {
						bestF = f;
						shortest = 1;
						count = 1;
					} else if(f == bestF) {
						count++;
					}
				}
				break;
			}
			if(ae > 0) {
				if(ae > m[ae]) {
					m[ae] = ae;
				}
				for (var i = 1; i < ae; i++) {
					if(m[i] + ae > m[ae]) {
						m[ae] = m[i] + ae;
					}
				}
				if(m[ae] > max) max = m[ae];
			}
			var f = sum - max;
			var sh = e - b + 1;
			if(f > bestF) {
				bestF = f;
				shortest = sh;
				count = 1;
			} else if(f == bestF) {
				if(sh < shortest) {
					shortest = sh;
					count = 1;
				} else if(sh == shortest) {
					count++;
				}
			}
		}
	}		
	console.log(bestF + " " + count);
}