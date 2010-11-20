import java.io.*;
import java.util.Scanner;

class A {

    public static void main(String[] args)
    {
        // Get user input.
        int a = 0;
        int b = 0;


        Scanner in = new Scanner(System.in);

        while (true)
        {
            System.out.print("Ange det första nummret: ");
            try
            {
                a = in.nextInt();
            }
            catch (Exception e) {}

            if (a == 0)
            {
                break;
            }

            System.out.print("Ange det andra nummret: ");
            try
            {
                b = in.nextInt();
            }
            catch (Exception e) {}

            // Compare values.
            if (a > b)
            {
                System.out.println(a +" är större än "+ b);
            }
            else if (b > a)
            {
                System.out.println(b +" är större än "+ a);
            }
            else if (a == b)
            {
                System.out.println("Talen är lika stora.");
            }
        }

        System.out.println("Tackar.");
        in.close();
    }
}
