package samp14;

import org.springframework.stereotype.Repository;

@Repository("bk1")
public class BookDaoImpl implements BookDao{
	public Book getBook(String title) {
		return new Book(title, 20000);
	}
}