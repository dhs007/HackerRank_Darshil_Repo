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
function add(str1, str2) {

    let sum = "";  // our result will be stored in a string.

    // we'll need these in the program many times.
    let str1Length = str1.length;
    let str2Length = str2.length;

    // if s2 is longer than s1, swap them.
    if (str2Length > str1Length) {
        let temp = str2;
        str2 = str1;
        str1 = temp;
    }

    let carry = 0;  // number that is carried to next decimal place, initially zero.
    let a;
    let b;
    let temp;
    let digitSum;
    for (let i = 0; i < str1.length; i++) {
        a = parseInt(str1.charAt(str1.length - 1 - i));      
        b = parseInt(str2.charAt(str2.length - 1 - i));      
        b = (b) ? b : 0;                                    
        temp = (carry + a + b).toString();                  
        digitSum = temp.charAt(temp.length - 1);            
        carry = parseInt(temp.substr(0, temp.length - 1));  
        carry = (carry) ? carry : 0;                        

        sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;

    }

    return sum;     

}

function extraLongFactorials(n) {
    let fact = 1;

    for (let i = 2; i <= n; i++) {

        if (Number.isSafeInteger(fact * i)) {
            fact = fact * i;
        }
        else {
            let factxi = "0";  
            for (let j = 0; j < i; j++) {
                factxi = add(factxi, fact.toString());
            }
            fact = factxi; 
        }
    }

    console.log(fact);
}

function main() {
    const n = parseInt(readLine(), 10);

    extraLongFactorials(n);
}
