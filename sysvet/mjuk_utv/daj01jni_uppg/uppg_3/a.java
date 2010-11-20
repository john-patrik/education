import java.io.*;
import java.util.Scanner;
import java.util.ArrayList;

class A {

    public static void main(String[] args)
    {
        ArrayList<Integer> list = new ArrayList<Integer>(5);
        Scanner in = new Scanner(System.in);
        int largest = 0;
        double mean = 0;
        int sum = 0;
        int current; // We don't want to access the list more than we need.

        System.out.println("Type in 5 numbers, each followed by <enter>:");

        for (int i = 0; i < 5; i++)
        {
            try
            {
                list.add(in.nextInt());
            }
            catch (Exception e) {}
        }

        for (int i = 0; i < list.size(); i++)
        {
            current = list.get(i);
            // System.out.println(current);

            // Find largest nbr:
            if (largest < current)
            {
                largest = current;
            }

            // Calculate sum:
            sum += current;
        }

        // Calculate mean:
        mean = (double) sum / (double) list.size();

        System.out.println("Largest number: " + largest);
        System.out.println("Sum: " + sum);
        System.out.println("Mean value: " + mean);
    }
}
