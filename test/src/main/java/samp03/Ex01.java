package samp03;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
			new FileSystemXmlApplicationContext("bean01.xml");
		MessageBean mb = ac.getBean("mb", MessageBean.class);
		mb.sayHello("바이든");
		ac.close();
	}
}