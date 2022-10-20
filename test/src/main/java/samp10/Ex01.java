package samp10;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
			new GenericXmlApplicationContext("/samp10/beans10.xml");
		Vehicle vh = ac.getBean(Vehicle.class);
		vh.ride();
		ac.close();
	}
}
