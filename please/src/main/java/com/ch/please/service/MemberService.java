package com.ch.please.service;

import com.ch.please.model.Member;

public interface MemberService {

	Member select(String id);

	int insert(Member member);

	int delete(String id);

	int update(Member member);

}
