package samp04;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
				new FileSystemXmlApplicationContext("beans02.xml");
//		Vehicle vh = ac.getBean("vh", Vehicle.class);
//		Vehicle vh = (Vehicle)ac.getBean("vh");
//		Vehicle vh = ac.getBean(Vehicle.class);
		Vehicle vh = (Vehicle)ac.getBean("a");
//		vh.ride("철수");
		vh.ride("영희");
		ac.close();
	}
}