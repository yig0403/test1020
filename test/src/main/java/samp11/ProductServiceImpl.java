package samp11;

public class ProductServiceImpl implements ProductService {
	private ProductDao pd;
	
	public void setPd(ProductDao pd) {
		this.pd = pd;
	}

	public Product getProduct() {
		return pd.getProduct("라면");
	}

}
