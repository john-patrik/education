import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;


public class TimeServerUDP {

	private DatagramSocket ds;
	public TimeServerUDP(int portnr) {
		try {
			ds = new DatagramSocket(portnr);
		} catch (SocketException e) {
			e.printStackTrace();
		}
	}
	public void WaitForPacket() {
		byte[] indata = new byte[100];
		DatagramPacket pkt = new DatagramPacket(indata, 100);
		while (true) {
			try {
				ds.receive(pkt);
				String txt = new String(pkt.getData());
				System.out.println("Data: " + txt);
				System.out.println("Length: " + pkt.getLength());
				System.out.println("Address: " + pkt.getAddress());
				System.out.println("Port: " + pkt.getPort());
				SendPacket(pkt);

			} catch (IOException e) {
				e.printStackTrace();
			}
			
		}
	}
	
	public void SendPacket(DatagramPacket pkt) {
		byte[] result = new byte[100];
		result = "klockan är".getBytes();
		DatagramPacket sendpkt = new DatagramPacket(result, result.length, pkt.getAddress(), pkt.getPort());
		try {
			ds.send(sendpkt);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int portnr = 25000;
		if (args.length != 1) {
			System.out.println("Usage TimeServerUDP <portnr>");
			System.exit(1);
		}
		else {
			portnr = Integer.parseInt(args[0]);
			TimeServerUDP server = new TimeServerUDP(portnr);
			server.WaitForPacket();
		}
	}

}
