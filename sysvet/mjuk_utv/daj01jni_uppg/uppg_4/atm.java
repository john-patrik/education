import java.io.*;
import java.util.Scanner;

class Atm {
    
    public static void main(String[] args)
    {
        BankAccount account = new BankAccount("meow_02");
        Scanner in = new Scanner(System.in);
        boolean again = true;
        boolean deposit, withdraw;
        int amount;

        while (again)
        {
            deposit = false;
            withdraw = false;

            System.out.print("Press 0 to deposit or 1 to withdraw: ");
            try 
            {
                int tmp = in.nextInt();
                if (tmp == 0) // This means deposit.
                {
                    deposit = true;
                    withdraw = false;
                }
                else if (tmp == 1) // This means withdraw.
                {
                    deposit = false;
                    withdraw = true;
                }
                else // This means the user is dumb.
                {
                    deposit = false;
                    withdraw = false;
                }
            }
            catch (Exception e) {}

            if (!deposit && !withdraw) // The user doesn't want anything.
            {
                // continue;

                System.out.println("Bye!");
                //again = false;
                break;
            }

            System.out.print("Amount: ");
            try
            {
                amount = in.nextInt();
                if (deposit)
                {
                    account.deposit(amount);
                }
                else if (withdraw)
                {
                    account.withdraw(amount);
                }
            }
            catch (Exception e) {}

            System.out.println("Current balance: " + account.getBalance());
            System.out.print("Do you want to play again? (y/n): ");
            try
            {
                String ans = in.next();
                if (ans.equals("n"))
                {
                    again = false;
                }
            }
            catch (Exception e) {}
        }
    }
}
