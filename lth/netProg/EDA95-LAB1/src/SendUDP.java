import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.util.Locale;


public class SendUDP {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String command, machine;
		int port;
		if (args.length != 3){
			System.out.println("A Usage: SendUDP <machine> <port> <command>");
			System.exit(1);
		}else{
			machine = args[0];
			port = Integer.parseInt(args[1]);
			command = args[2];
			byte[] data = command.getBytes();
			
			InetAddress dest = null;
			try {
			    dest = InetAddress.getByName(machine);
			} catch (UnknownHostException e) {
			    System.out.println("Unknown host: "+machine);
			    System.exit(1);
			}
			
			DatagramPacket dp = new DatagramPacket(data,data.length,dest,port);
			
			DatagramSocket socket = null;
			try {
			    socket = new DatagramSocket();
			} catch(SocketException e) {
			    System.out.println("Could not create socket!");
			    System.exit(1);
			}
			
			try {
			    socket.send(dp);
			} catch(IOException e) {
			    System.out.println("An IOException occured: "+e);
			    System.exit(1);
			}
			socket.close();
			
		}
	}

}
