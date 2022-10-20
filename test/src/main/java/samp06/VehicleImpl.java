package samp06;

public class VehicleImpl implements Vehicle {
	private String name;
	private String rider;
	public VehicleImpl(String name, String rider) {
		this.name = name; this.rider = rider;
	}
	public void ride() {
		System.out.println(name+"이(가) "+rider+"을(를) 탄다");
		
	}
}
