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


function chocolateGame(arr) {
    let result=0,delta,odd,even,temp,original
    for(let i=0;i<arr.length-1;i++){
        even=0
        odd=arr[i]
        for(let j=i+1;j<arr.length;j=j+2){
            even=even^(arr[j]-arr[j-1])
            if(even>0) result++
        }
        for(let j=i+2;j<arr.length;j=j+2){
            odd=odd^(arr[j]-arr[j-1])
            if(odd>0) result++
        }
    }
    return result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = chocolateGame(arr);

    ws.write(result + "\n");

    ws.end();
}