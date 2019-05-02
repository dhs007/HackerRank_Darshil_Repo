process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function(data) {
    input_stdin += data;
});

process.stdin.on('end', function() {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

var graph, n, visited = [], max = [];
var start = new Date().getTime();

function main() {
    var nm = readLine().split(' ');
    n = parseInt(nm[0]);
    var m = parseInt(nm[1]);

    graph = [];

    for (var mi = 0; mi < m; mi++) {
        var uv = readLine().split(' ');

        var u = parseInt(uv[0]);
        var v = parseInt(uv[1]);

        graph[u] || (graph[u] = []);
        graph[u].push(v);
        graph[v] || (graph[v] = []);
        graph[v].push(u);
        visited[u]=false;
    }

    //console.log(graph);
    hamCycle();
}

function hamCycle() {
    for(var i=1; i<=n; i++){
       path = [i];
        for(var j=0; j<=n; j++){
            visited[j] = false;
        }
        visited[i] = true;
        if(hamCycleUtil()){
            printSolution(path);
            break;
        } 
    }

}

function hamCycleUtil() {

    if (path.length == n) {
        max = path;
        return true;
    }
    var cur = graph[path[path.length-1]];
    for (var i = 0; i < cur.length; i++) {

        if (!visited[cur[i]]) {
            path.push(cur[i]);
            visited[cur[i]] = true;
            if (hamCycleUtil() == true)
                return true;

            visited[path.pop()] = false;
            
            if(path.length>max.length){
                max = path;
            }
            
            if(new Date().getTime()-start>9000){
                return true;
            }
        }
    }

    return false;
}

function printSolution(){
    console.log(max.length);
    console.log(max.join(' '));
}