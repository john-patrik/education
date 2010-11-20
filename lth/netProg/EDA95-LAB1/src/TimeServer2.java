import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;


public class TimeServer2 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String s = new String();

		int ch = -1;

		do {
			try {
				ch = System.in.read();
				if (ch!='\n') {
					s = s+(char)ch;
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} while(ch!='\n');
		
		Date d = new Date();
		if(s.equalsIgnoreCase("time")) {
			DateFormat df = DateFormat.getTimeInstance(DateFormat.LONG, Locale.FRANCE);
			System.out.println("Time is: "+df.format(d));
		}else if (s.equalsIgnoreCase("date")) {
			DateFormat df = DateFormat.getDateInstance(DateFormat.LONG, Locale.FRANCE);
			System.out.println("Date is: "+df.format(d));
		}else{
			System.out.println("B Usage: TimeServer1 <date/time>");
		}
	}

}
