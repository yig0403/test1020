package list;

import java.util.List;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = new GenericXmlApplicationContext("/list/list.xml");
		ListBean lb = ac.getBean(ListBean.class);
		List<String> addrs = lb.getAddr();
		for (String addr : addrs) {
			System.out.println(addr);
		}
		ac.close();
	}
}
