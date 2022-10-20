package samp07;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
//				new ClassPathXmlApplicationContext("classpath:beans07.xml");
				new GenericXmlApplicationContext("classpath:beans07.xml");
		MessageBean mb = ac.getBean(MessageBean.class);
		mb.sayHello();
		ac.close();
	}
}
