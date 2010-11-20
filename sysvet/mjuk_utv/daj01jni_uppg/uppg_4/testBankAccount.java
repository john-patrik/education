import java.io.*;

class TestBankAccount {
    
    public static void main(String[] args)
    {
        String id = "meow_01";
        BankAccount account = new BankAccount(id);
        String category;


        // Test initial balance.
        category = "Initial balance";

        if (account.getBalance() == 0)
        {
            System.out.println(category + " is correct!");
        }


        // Test id.
        category = "id";

        if (account.getId().equals(id))
        {
            System.out.println(category + " is correct!");
        }


        // Test deposit.
        category = "Deposit function";

        if (account.deposit(100))
        {
            if (account.getBalance() == 100)
            {
                System.out.println(category + " is correct!");
            }
        }


        // Test legal withdraw.
        category = "Legal withdraw function";

        if (account.withdraw(account.getBalance()))
        {
            if (account.getBalance() == 0)
            {
                System.out.println(category + " is correct!");
            }
        }


        // Test illegal withdraw.
        category = "Illegal withdraw function";

        if (account.withdraw(account.getBalance()+1) == false)
        {
            System.out.println(category + " is correct!");
        }
    }
}
