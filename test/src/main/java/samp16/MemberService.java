package samp16;
public interface MemberService {
	int insert(Member member);
	int update(Member member);
	int delete(String id);
	void select(String id);
	void list();

}