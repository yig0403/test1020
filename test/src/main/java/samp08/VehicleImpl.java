package samp08;

public class VehicleImpl implements Vehicle {
	private String name;
	private String rider;
	
	public void setName(String name) {
		this.name = name;
	}
	public void setRider(String rider) {
		this.rider = rider;
	}
	public void ride() {
		System.out.println(name+"이(가)"+rider+"를(을) 탄다");		
	}
}