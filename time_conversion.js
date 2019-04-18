'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}
function timeConversion(s) {
    /*
     * Write your code here.
     */
    let hh = s[0] + s[1];
    let mm = s[3] + s[4];
    let ss = s[6] + s[7];
    let am_pm = s[8];

    hh = parseInt(hh);
    mm = parseInt(mm);
    ss = parseInt(ss);
    mm = minTwoDigits(mm);
    ss = minTwoDigits(ss);
    if (am_pm == 'A' && hh == 12) {
        hh = 0;
        hh = minTwoDigits(hh);
        return (hh + ":" + mm + ":" + ss);
        console.log(hh + ":" + mm + ":" + ss);
    }
    else {
        if (am_pm == 'A') {
            hh = minTwoDigits(hh);
            return (hh + ":" + mm + ":" + ss);
        }
        else if (am_pm == 'P' && hh != 12) {
            hh += 12;
            return (hh + ":" + mm + ":" + ss);
        }
        else if (am_pm == 'P' && hh == 12) {
            return (hh + ":" + mm + ":" + ss);
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
