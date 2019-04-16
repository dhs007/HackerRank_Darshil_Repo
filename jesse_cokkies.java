import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    sweetness(sc);
}

public static void sweetness(Scanner sc){
    int count = 0;
    int N = sc.nextInt();
    int K = sc.nextInt();
    PriorityQueue<Integer> q = new PriorityQueue<Integer>();
    for(int i = 0; i < N; i++){
        q.add(sc.nextInt());
    }
    while(q.peek() < K && q.size() >= 2){
        q.add(q.remove() + 2 * q.remove());   
        count++;
    }

    if(q.size() == 1 && q.peek() < K){
        count = -1;
    }
    System.out.println(count);        
}
}