package com.ch.please.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ch.please.dao.MemberDao;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberDao mbd;
	
	
}
