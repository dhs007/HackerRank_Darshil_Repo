import java.io.*;
import java.util.*;
import java.lang.Math;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner input = new Scanner(System.in);
        int N = input.nextInt();
        int[] buildings = new int[N];
        int minEnergy = 0;
        
        for(int i = 0; i < N; i++)
        {
            buildings[i] = input.nextInt();
        }
        
      
        for(int i = buildings.length-1; i >= 0; i--)
        {
            int buildingHeight = buildings[i];
            
            if(buildingHeight > minEnergy)
            {
                minEnergy += (int) Math.ceil((buildingHeight - minEnergy) / 2.0);
            }
            else if(buildingHeight < minEnergy) 
            {
                minEnergy = (int) Math.ceil((buildingHeight + minEnergy) / 2.0);
            }
            
        }
        
        System.out.println(minEnergy);
    }
}