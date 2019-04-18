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

// Complete the formingMagicSquare function below.
function formingMagicSquare(a) {

    let sum = [0,0,0,0,0,0,0,0], diff_row = [0,0,0], diff_col = [0,0,0], diff_dia = [0,0], max_sum = 0, i, j, cost = 0;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            sum[i] += a[i][j];
        }
    }

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            sum[i + 3] += a[j][i];
        }
    }

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (i == j) {
                sum[6] += a[i][j];
            }

            if (i + j == 2) {
                sum[7] += a[i][j];
            }
        }
    }
    for (i = 0; i < sum.length; i++) {
        if (sum[i] > max_sum)
            max_sum = sum[i];
    }
    for (i = 0; i < 3; i++) {
        diff_row[i] = max_sum - sum[i];
        diff_col[i] = max_sum - sum[i + 3];
    }
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (diff_row[i] == diff_col[j]) {
                cost += Math.abs(diff_row[i]);
                diff_col[j] = -1000;
                diff_row[i] = -2000;
                break;
            }
        }
    }

    return cost;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
