package samp16;
import java.util.Date;
public class Member {
	private String id;
	private String pass;
	private String name;
	private String email;
	private Date reg_date;
	public Member(String id, String pass, String name, String email,Date reg_date) {
		this.id=id; this.pass=pass; this.name=name; 
		this.email=email; this.reg_date=reg_date;
	}
	@Override
	public String toString() {
		return "아이디:"+id+",암호:"+pass+",이름:"+name+",이메일:"+email+",등록일:"+reg_date;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	
}