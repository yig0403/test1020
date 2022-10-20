package samp14;

import org.springframework.stereotype.Repository;

@Repository("bk2")
public class BookDaoImpl2 implements BookDao{
	public Book getBook(String title) {
		return new Book(title, 50000);
	}
}