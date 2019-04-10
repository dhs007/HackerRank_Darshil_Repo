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
    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);
    
    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    var temp, i, len = a.length, left_rot = d, j;
    left_rot %= n;
    while (left_rot--) {
        var temp = a[0], i;
        for (i = 0; i < n - 1; i++)
            a[i] = a[i + 1];

        a[i] = temp;
    }
    var str = "";
    for (i = 0; i < a.length; i++) {
        str += a[i] + " ";
    }
    console.log(str);
}
