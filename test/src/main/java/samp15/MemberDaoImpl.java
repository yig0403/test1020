package samp15;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
public class MemberDaoImpl implements MemberDao{
	private Map<String, Member> map = new HashMap<String, Member>();
	public Member select(String id) {
		// map에는 키를 가지고 get
		return map.get(id);
	}
	public int insert(Member member) {
		map.put(member.getId(), member);
		return 1;
	}
	public int update(Member member) {
		map.put(member.getId(), member);
		return 1;
	}
	public int delete(String id) {
		map.remove(id);
		return 1;
	}
	public Collection<Member> list() {
		return map.values();
	}
}