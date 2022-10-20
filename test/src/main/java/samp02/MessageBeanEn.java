package samp02;
// interface를 구현한다는 interface를 메서드를 overriding해야 한다
public class MessageBeanEn implements MessageBean {
	public void sayHello(String name) {
		System.out.println("Hello "+name+"!!");
		
	}
}