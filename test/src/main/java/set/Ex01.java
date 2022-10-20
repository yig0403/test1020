package set;

import java.util.Set;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac=new GenericXmlApplicationContext("/set/set.xml");
		SetBean sb = ac.getBean(SetBean.class);
		Set<String> addrs = sb.getAddrs();
		for(String addr:addrs) {
			System.out.println(addr);
		}
		ac.close();
	}
}