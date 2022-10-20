package samp05;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
			new FileSystemXmlApplicationContext("beans02.xml");
		MessageBean mb = ac.getBean(MessageBean.class);
		mb.sayHello();
		ac.close();
	}
}
