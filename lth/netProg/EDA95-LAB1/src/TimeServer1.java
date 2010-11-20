import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;


public class TimeServer1 {
	public static void main(String[] args) {
		Date d = new Date();
		System.out.println(args.length);
		if (args.length < 1){
			System.out.println("A Usage: TimeServer1 <date/time>");
			System.exit(1);
		}else if(args[0].equalsIgnoreCase("time")) {
			DateFormat df = DateFormat.getTimeInstance(DateFormat.LONG, Locale.FRANCE);
			System.out.println("Time is: "+df.format(d));
		}else if (args[0].equalsIgnoreCase("date")) {
			DateFormat df = DateFormat.getDateInstance(DateFormat.LONG, Locale.FRANCE);
			System.out.println("Date is: "+df.format(d));
		}else{
			System.out.println("B Usage: TimeServer1 <date/time>");
		}
	}
}
