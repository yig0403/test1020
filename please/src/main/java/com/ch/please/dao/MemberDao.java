package com.ch.please.dao;

import com.ch.please.model.Member;

public interface MemberDao {

	Member select(String id);

	int insert(Member member);

	int delete(String id);

	int update(Member member);

	
}
