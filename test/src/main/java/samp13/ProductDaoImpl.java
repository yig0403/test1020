package samp13;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
// ProductDaoImpl을 객체(component)를 만들어라
// @Component
@Repository("pd1")
public class ProductDaoImpl implements ProductDao {

	public Product getProduct(String name) {
		return new Product(name,2000);
	}
}