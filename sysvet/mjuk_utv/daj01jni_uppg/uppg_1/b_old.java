import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;

class B {
    public static void main(String[] args) 
    {
        // We need this for the input-mechanic.
        InputStreamReader input = new InputStreamReader(System.in);
        BufferedReader reader = new BufferedReader(input);

        // This is the needed user input.
        String name = "";
        double salary = 0;
        int h = 0;
        // Temporary variable;
        String tmp_string;


        // While we do not have all the info we need,
        // continue to ask for it.
        while (name == "" && salary == 0 && h == 0)
        {
            if (name == "")
            {
                System.out.println("Ange ditt namn: ");
                try
                {
                    name = reader.readLine();
                }
                catch (Exception e) {}
            }

            if (salary == 0)
            {
                System.out.println("Ange din timlön: ");
                try
                {
                    tmp_string = reader.readLine();
                    salary = Double.parseDouble(tmp_string);
                }
                catch (Exception e) {}
            }

            if (h == 0)
            {
                System.out.println("Ange dina arbetade timmar: ");
                try
                {
                    //input = reader.readLine();
                    Scanner in = new Scanner(System.in);
                    h = in.nextInt();
                    in.close();
                }
                catch (Exception e) {}
            }
        }

        System.out.println(name + " du tjänade " + salary*h + 
            " kr förra veckan.");
    }
}
