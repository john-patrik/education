import java.io.*;
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


        // While we do not have all the info we need,
        // continue to ask for it.
        while (name == "")
        {
            System.out.println("Ange ditt namn: ");
            try
            {
                name = reader.readLine();
                name = name.toUpperCase();
            }
            catch (Exception e) {}
        }

        Scanner in_scanner = new Scanner(System.in);

        while (salary == 0)
        {
            System.out.println("Ange din timlön: ");
            try
            {
                //tmp_string = reader.readLine();
                //salary = Double.parseDouble(tmp_string);
                salary = in_scanner.nextDouble();
            }
            catch (Exception e) {}
        }

        while (h == 0)
        {
            System.out.println("Ange dina arbetade timmar: ");
            try
            {
                h = in_scanner.nextInt();
            }
            catch (Exception e) {}
        }

        in_scanner.close();

        // Formatting crap.
        String out_string = name + " du tjänade " + salary*h + 
            " kr förra veckan";
        out_string = out_string.replace(".", ",") + ".";

        System.out.println(out_string);
    }
}
