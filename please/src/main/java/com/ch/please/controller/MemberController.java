package com.ch.please.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ch.please.service.MemberService;


@Controller
public class MemberController {
	@Autowired
	private MemberService mbs;
}