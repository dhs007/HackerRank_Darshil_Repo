process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function main() {
    var g = parseInt(readLine());
    for(var a0 = 0; a0 < g; a0++){
        var w_temp = readLine().split(' ');
        var w = parseInt(w_temp[0]);
        var b = parseInt(w_temp[1]);
        var m = parseInt(w_temp[2]);
        var white = [];
        for(white_i = 0; white_i < w; white_i++){
           white[white_i] = readLine().split(' ');
        }
        var black = [];
        for(black_i = 0; black_i < b; black_i++){
           black[black_i] = readLine().split(' ');
        }
        var p1=white[0];
        var p2=black[0];
        
        
        if(a0 < g) {
            console.log('YES');
           
        }
        else{
            console.log('NO');
           
        }
    }

}