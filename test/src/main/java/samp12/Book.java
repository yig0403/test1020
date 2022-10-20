package samp12;

public class Book {
	private String title;
	private int price;
	public Book(String title, int price) {
		this.title = title; this.price = price;
	}
	@Override
	public String toString() {
		return "책[제목:"+title+", 가격:"+price+"]";
	}
}
