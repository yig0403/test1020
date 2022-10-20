package samp10;
import java.io.FileWriter;
import java.io.IOException;
public class FileOutput implements Output {
	private String fileName;	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public void output(String msg) {
		try {
			FileWriter fw = new FileWriter(fileName);
			fw.write(msg);
			fw.close();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}		
	}
}