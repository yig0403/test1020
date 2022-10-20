package samp13;

import org.springframework.stereotype.Repository;

@Repository("pd2")
public class ProductDaoImpl2 implements ProductDao{

	public Product getProduct(String name) {
		return new Product(name,5000);
	}
}