'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the diagonalDifference function below.
function diagonalDifference(arr) {

    let primary_diagonal_sum = 0, secondary_diagonal_sum = 0, i = 0, j = 0, abs_diff;

    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr.length; j++) {
            if (i == j) {
                primary_diagonal_sum += arr[i][j];
            }

            if (i + j == arr.length - 1) {
                secondary_diagonal_sum += arr[i][j];
            }
        }
    }

    abs_diff = primary_diagonal_sum - secondary_diagonal_sum;
    abs_diff = Math.abs(abs_diff);

    return abs_diff;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
