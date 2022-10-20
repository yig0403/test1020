package samp16;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDao md;
	public int insert(Member member) { // member 입력 받은 데이터
		int result = 0;
		Member member2 = md.select(member.getId()); // 중복확인 위해서 읽은 데이터
		if (member2 == null) result = md.insert(member); // 중복된 데이터가 없다
		else System.out.println("이미 있는 데이터 입니다");
		return result;
	}
	public int update(Member member) {
		int result = 0;
		Member member2 = md.select(member.getId()); // 중복확인 위해서 읽은 데이터
		if (member2 != null) result = md.update(member); // 중복된 데이터가 없다
		else System.out.println("없는 데이터는 수정 못합니다");
		return result;
	} 
	public int delete(String id) {
		int result = 0;
		Member member2 = md.select(id); // 중복확인 위해서 읽은 데이터
		if (member2 != null) result = md.delete(id); // 중복된 데이터가 없다
		else System.out.println("없는 데이터는 삭제 못합니다");
		return result;
	}
	public void select(String id) {
		Member member = md.select(id);
		if (member == null) System.out.println("없는 데이터 입니다");
		else prn(member);
	}
	private void prn(Member member) {
		System.out.println("==== 회원정보 ====");
		System.out.println("아이디 : "+member.getId());
		System.out.println("이름 : "+member.getName());
		System.out.println("이메일 : "+member.getEmail());
		System.out.println("등록일 : "+member.getReg_date());
	}
	public void list() {
		Collection<Member> list = md.list();
		if (list == null || list.size() == 0) System.out.println("데이터 없습니다");
		else for(Member member: list) {
			prn(member);
		}
	}	
}