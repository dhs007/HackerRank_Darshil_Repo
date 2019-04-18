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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}
function numberDes(a, b) {
    return b - a;
}
// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {

    let i, start, end, new_score = [], rank = 0, result = [], j;
    for (j = 0; j < alice.length; j++) {
        rank = 1;
        for (i = 0; i < scores.length; i++) {
            new_score[i] = scores[i];
        }
        new_score[scores.length] = alice[j];
        new_score.sort(numberDes);
        for (i = 0; i < new_score.length; i++) {
            process.stdout.write(new_score[i] + " ");
        }
        process.stdout.write("\n");
        for (i = 0; i < new_score.length - 1; i++) {
            if (new_score[i + 1] < new_score[i]) {
                if (new_score[i+1] != alice[j] && new_score[i] != alice[j])
                    rank++;
                else {
                    if (i != 0)
                        rank++;
                    console.log(rank);
                    result[j] = rank;
                    break;
                }
                
            }
        }  
    }
    return result;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
