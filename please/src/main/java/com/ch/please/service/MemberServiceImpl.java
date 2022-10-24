package com.ch.please.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ch.please.dao.MemberDao;
import com.ch.please.model.Member;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberDao mbd;

	public Member select(String id) {
		return mbd.select(id);
	}

	public int insert(Member member) {
		return mbd.insert(member);
	}

	public int delete(String id) {
		return mbd.delete(id);
	}

	public int update(Member member) {
		return mbd.update(member);
	}

	
	
	
}
