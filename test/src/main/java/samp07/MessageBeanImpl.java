package samp07;
public class MessageBeanImpl implements MessageBean {
	private String name;
	private String greet;	
	public void setName(String name) {
		this.name = name;
	}
	public void setGreet(String greet) {
		this.greet = greet;
	}
	public void sayHello() {
		System.out.println(name+", "+greet+" !!!");
		
	}
}