import java.io.*;
import java.util.*;

public class Solution {

    static Random rnd;
    static boolean[] directions = {false,false,false,false};
    static String line;
    static Scanner s = new Scanner(System.in);
    static int currentDirectionn = 0;

    public static void main(String[] args) throws IOException {

        rnd = new Random();
        s.nextLine(); 

        while(true) {
            readInput();
            currentDirectionn = getRandomValidDirection();
            moveToCurrentDirection();
            currentDirectionn = 0;
            resetArray();
        }

    }

    public static void moveToCurrentDirection() {
        if(currentDirectionn == 0)
            System.out.println("UP");
        else if(currentDirectionn == 1)
            System.out.println("LEFT");
        else if(currentDirectionn == 2)
            System.out.println("RIGHT");
        else
            System.out.println("DOWN");
    }

    public static void resetArray() {
        directions[0] = false;
        directions[1] = false;
        directions[2] = false;
        directions[3] = false;
    }

    public static int getRandomValidDirection() {
        if(directions[currentDirectionn] == true)
            return currentDirectionn;
        while(true) {
            int r = rnd.nextInt(4);
            if(directions[r] == true)
                return r;
        }

    }

    public static void readInput() {
        while(s.hasNextLine() == false) { } 
        line = s.nextLine();
        if(line.charAt(1) == 35)
            directions[0] = false;
        else
            directions[0] = true;
        isDoor(line);



        line = s.nextLine();
        if(line.charAt(0) == 35)
            directions[1] = false;
        else
            directions[1] = true;

        if(line.charAt(2) == 35)
            directions[2] = false;
        else
            directions[2] = true;
        isDoor(line);



        line = s.nextLine();
        if(line.charAt(1) == 35)
            directions[3] = false;
        else
            directions[3] = true;
        isDoor(line);
    }

    public static void isDoor(String line) {
        if(line.indexOf(101) != -1) {
            System.out.println("Door at " + line.indexOf(101));
        }
    }

}