import java.io.*;
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        
        Scanner input = new Scanner(System.in);
        int n = input.nextInt();
        input.nextLine();
        
        Set<Character> gemstones = stringToSet(input.nextLine());

        for(int i=1; i<n ;i++){
            gemstones.retainAll(stringToSet(input.nextLine()));
        }
        System.out.print(gemstones.size());
    }
    
    
    
    
    public static Set<Character> stringToSet(String s)
    {
        Set<Character> set = new HashSet<Character>(26);
        for (char c : s.toCharArray())
            set.add(Character.valueOf(c));
        return set;
    }
}