class BankAccount {

private String id;
private int balance;

    public BankAccount(String id)
    {
        this.id = id;
        this.balance = 0;
    }

    public BankAccount(String id, int balance)
    {
        this.id = id;
        this.balance = balance;
    }

    public String getId()
    {
        return id;
    }

    public int getBalance()
    {
        return balance;
    }

    // I know this should return void, but boolean is more useful.
    public boolean deposit(int amount)
    {
        balance += amount;
        return true;
    }

    public boolean withdraw(int amount)
    {
        if (balance >= amount)
        {
            balance -= amount;
            return true;
        }
        else
        {
            // Insufficient funds.
            return false;
        }
    }
}
