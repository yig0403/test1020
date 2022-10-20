package samp09;
public class MessageBeanImpl implements MessageBean {
	private String name;
	private String greet;
	private Output out;	
	public void setName(String name) {
		this.name = name;
	}
	public void setGreet(String greet) {
		this.greet = greet;
	}
	public void setOut(Output out) {
		this.out = out;
	}
	public void sayHello() {
		String msg = name+", "+greet+" !!";
		System.out.println(msg);  // 콘솔로 출력
		out.output(msg);          // output으로 출력
	}
}