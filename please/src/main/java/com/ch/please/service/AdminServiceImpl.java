package com.ch.please.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ch.please.dao.AdminDao;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDao ad;
}
