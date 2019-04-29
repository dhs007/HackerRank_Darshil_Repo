import java.io.*;
import java.util.*;

public class Solution {
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    String[] line = br.readLine().split(" ");
    final short N = Short.parseShort(line[0]);

    final int[][] distances = new int[N+1][N+1];
    for(short x = 0; x < N; ++x){
      for(short y = 0; y < N; distances[x][y++] = -1){}
    }

    for(int M = Integer.parseInt(line[1]); M > 0; --M){
      line = br.readLine().split(" ");
      final short X = (short)(Short.parseShort(line[0]) - 1);
      final short Y = (short)(Short.parseShort(line[1]) - 1);
      final short R = Short.parseShort(line[2]);
      if(distances[X][Y] < 0){
        ++distances[X][N];
      }
      distances[X][Y] = R;
    }

    final Edge[][] edges = new Edge[N][];
    for(short x = 0; x < N; ++x){
      final short n = (short)distances[x][N];
      edges[x] = new Edge[n];
      for(short y = 0, i = 0; i < n; ++y){
        if(distances[x][y] != -1){
          edges[x][i++] = new Edge(y, distances[x][y]);
        }
      }
    }

    StringBuffer sb = new StringBuffer();
    final boolean[] isCalculated = new boolean[N];
    for(int Q = Integer.parseInt(br.readLine()); Q > 0; --Q){

      line = br.readLine().split(" ");
      final short A = (short)(Short.parseShort(line[0]) - 1);
      final short B = (short)(Short.parseShort(line[1]) - 1);

      if(!isCalculated[A]){
        distances[A] = getMinDistances(edges, A, N);
        isCalculated[A] = true;
      }

      sb.append(distances[A][B] + "\n");
    }
    System.out.print(sb);
  }

  private static int[] getMinDistances(final Edge[][] edges, final short origin, final short N){

    final int[] distances = new int[N];
    for(short i = 0; i < N; distances[i++] = -1){}
    distances[origin] = 0;

    final Queue<Edge> q = new PriorityQueue<Edge>(N, new Comparator<Edge>(){
      @Override
      public int compare(final Edge a, final Edge b){
        return Integer.compare(a.weight, b.weight);
      }
    });
    
    q.add(new Edge(origin, 0));
    do{
      
      short nodeId = q.poll().nodeId;
      final int distance = distances[nodeId];
      
      for(Edge edge : edges[nodeId]){
        
        nodeId = edge.nodeId;
        final int curMinDistance = distances[nodeId];
        final int newMinDistance = distance + edge.weight;
        if(curMinDistance < 0 || curMinDistance > newMinDistance){
          distances[nodeId] = newMinDistance;
          q.add(new Edge(nodeId, newMinDistance));
        }
      }
    } while (!q.isEmpty());
    
    return distances;
  }

  private static class Edge{
    public final short nodeId;
    public final int weight;
    public Edge(final short nodeId, final int weight){
      this.nodeId = nodeId;
      this.weight = weight;
    }
  }
}