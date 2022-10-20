package samp05;

public class MessageBeanImpl implements MessageBean {
	private String name;
	private String greet;
//	생성자를 통하여 이름과 인사말을 받자
	public MessageBeanImpl(String name, String greet) {
		this.name = name;
		this.greet = greet;
	}
	public void sayHello() {
		System.out.println(name+", "+greet);		
	}
}