'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the balancedSums function below.
function balancedSums(arr) {

    let sum_right = 0, sum_left = 0, i, j, flag = 0, k;
    for (i = arr.length - 1; i >= 0; i--) {
        sum_left = 0;
        sum_right = 0;
        for (k = i + 1; k < arr.length; k++) {
            sum_right += arr[k];
        }
        for (j = 0; j < i; j++) {
            sum_left += arr[j];
        }
        if (sum_left == sum_right) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        return "YES";
    }
    else
        return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
