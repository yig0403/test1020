package samp12;

public class BookDaoImpl implements BookDao {

	public Book getBook(String title) {
		return new Book(title, 20000);
	}

}
