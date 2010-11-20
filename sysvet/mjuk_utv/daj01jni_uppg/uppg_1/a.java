import java.io.*;
import java.util.ArrayList;

class A {
    public static void main(String[] args) 
    {
        ArrayList<String> input_strings = new ArrayList<String>();
        InputStreamReader input = new InputStreamReader(System.in);
        BufferedReader reader = new BufferedReader(input);
        int nbr_of_words = 2;
        String string = "";

        while (input_strings.size() < nbr_of_words)
        {
            System.out.print("Type a word: ");

            string = "";
            try
            {
                string = reader.readLine();
            }
            catch(Exception e) {}
    
            if (string != "")
            {
                // System.out.println("You typed: " + string);
                input_strings.add(string);
            }
        }

        string = "";
        System.out.print("The concatenated string is: ");
        for (String s : input_strings)
        {
            // System.out.print(s + " ");
            string += s + " ";
        }
        string = string.trim();
        System.out.print(string);
        System.out.println(".");
        System.out.println(string.length());
    }
}
