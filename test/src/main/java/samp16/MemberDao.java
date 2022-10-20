package samp16;

import java.util.Collection;

public interface MemberDao {
	Member select(String id);
	int insert(Member member);
	int update(Member member);
	int delete(String id);
	Collection<Member> list();

}