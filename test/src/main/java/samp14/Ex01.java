package samp14;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
public class Ex01 {
	public static void main(String[] args) {
		AbstractApplicationContext ac = 
				new GenericXmlApplicationContext("/samp14/beans14.xml");
		BookService bs = ac.getBean(BookService.class);
		Book book = bs.getBook();
		System.out.println(book);
		ac.close();
	}
}