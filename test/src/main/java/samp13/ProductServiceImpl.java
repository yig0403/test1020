package samp13;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
// @Component
@Service
public class ProductServiceImpl implements ProductService {
	@Autowired // setter method를 안 만들어도 된다. // 생성된 ProductDao객체와 연결 
	@Qualifier("pd2")
	private ProductDao pd;
	public Product getProduct() {
		return pd.getProduct("볼펜");
	}

}