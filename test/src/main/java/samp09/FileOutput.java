package samp09;
import java.io.FileWriter;
import java.io.IOException;
public class FileOutput implements Output {
	private String fileName;	
	public void setFileName(String fileName) {  // 설정파일에서 파일명 받아서 사용
		this.fileName = fileName;
	}
	public void output(String msg) {
		try {
			FileWriter fw = new FileWriter(fileName);
			fw.write(msg); // 파일로 메세지 출력
			fw.close();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}		
	}
}