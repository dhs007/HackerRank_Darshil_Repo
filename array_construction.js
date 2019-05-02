function make_array(n,s,k) {
    if (k < 0) {
        return false;
    }
    if (s < 0) {
        return false;
    }
    if (n == 1) {
        if (k == 0) {
            return [s];
        } else {
            return false;
        }
    }

    let a = 0;
    if (s > k) {
        a = Math.ceil( (s-k)/n );
    }
    while ( ((a*n) <= s) && ((a*n*(n-1)) <= ( (s*(n-1)) - k )) ) {
        let s1 = s - (n*a);
        let k1 = k - s1;
        let sub = make_array(n-1,s1,k1);
        if (sub) {
            return [a].concat( sub.map( x=> x+a) );
        }
        a++;
    }
    return false;
}

function processData(input) {
    var lines = input.split('\n');
    var q = Number(lines.shift());
    for (var i=0; i<q; i++) {
        var [n,s,k] = lines.shift().split(' ').map(Number);
        var arr = make_array(n,s,k);
        if (arr) {
            console.log(arr.join(' '));
        } else {
            console.log('-1');
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});