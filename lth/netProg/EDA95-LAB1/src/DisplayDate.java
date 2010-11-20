import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
public class DisplayDate {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Date d = new Date();
		DateFormat df = DateFormat.getDateInstance(DateFormat.LONG, Locale.FRANCE);
		System.out.println(df.format(d));
	}

}
