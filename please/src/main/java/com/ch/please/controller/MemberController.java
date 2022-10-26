package com.ch.please.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ch.please.model.Member;
import com.ch.please.service.MemberService;


@Controller
public class MemberController {
	@Autowired
	private MemberService mbs;
	
	@Autowired
	private JavaMailSender jMailSender;
	
	@Autowired
	private BCryptPasswordEncoder bpe; // 비밀번호를 암호화
    
	@RequestMapping("joinForm")
	public String joinForm() {
		return "/member/joinForm";
	}
	
	@RequestMapping("join")
	public String join(Member member, Model model, HttpSession session) throws IOException {
		int result = 0;
		// member는 화면 입력한 데이터, member2 Db에 있는 데이터 중복여부 체크
		Member member2 = mbs.select(member.getId());
		if (member2 == null) {
			String mfilename = member.getFile().getOriginalFilename();
			// 파일명을 변경하고 싶으면 UUID 또는 long으로 날자 데이터
			member.setMfilename(mfilename);
			String real = session.getServletContext().getRealPath("/resources/upload");
			FileOutputStream fos = new FileOutputStream(new File(real+"/"+mfilename));
			fos.write(member.getFile().getBytes());
			fos.close();
			String encPass = bpe.encode(member.getPassword()); // 비밀번호 암호화
			member.setPassword(encPass);
			result = mbs.insert(member);
		} else result = -1;  // 이미 있으니 입력하지마
		model.addAttribute("result", result);
		return "/member/join";
	}
	
	@RequestMapping("loginForm")
	public String loginForm() {
		return "/member/loginForm";
	}
	
	@RequestMapping("login")
	public String login(Member member, Model model, HttpSession session) {
		int result = 0;
		Member member2 = mbs.select(member.getId());
		if (member2 == null || member2.getDel().equals("y")) result = -1; // 없는 id
    //		bpe.matches 두개다 암호화 한 상태로 같은 데이터인가 
		else if (bpe.matches(member.getPassword(), member2.getPassword())) {
			result = 1; // 성공 id와 password가 일치
			session.setAttribute("id", member.getId());
		}
		model.addAttribute("result", result);
		return "/member/login";
	}
	
	@RequestMapping("delete")
	public String delete(Model model, HttpSession session) {
		String id = (String)session.getAttribute("id");
		int result = mbs.delete(id);
		if (result > 0) session.invalidate();
		model.addAttribute("result", result);
		return "/member/delete";
	}
	@RequestMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "/member/logout";
	}
	
	@RequestMapping(value = "idChk", produces = "text/html;charset=utf-8")
	@ResponseBody   // jsp로 가지말고 바로 본문을 전달
	public String idChk(String id, Model model) {
		String msg = "";
		Member member = mbs.select(id);
		if (member == null) msg = "사용가능한 아이디입니다.";
		else msg = "이미 사용중이니 다른 아이디를 사용하세요";
		return msg;
	}
	
	@RequestMapping("view")
	public String view(Model model, HttpSession session) {
		String id = (String)session.getAttribute("id");		
		Member member = mbs.select(id);
		model.addAttribute("member", member);
		return "/member/view";
	}
	
	@RequestMapping("updateForm")
	public String updateForm(Model model, HttpSession session) {
		String id = (String)session.getAttribute("id");		
		Member member = mbs.select(id);
		model.addAttribute("member", member);
		return "/member/updateForm";
	}
	
	@RequestMapping("update")
	public String update(Member member, Model model, HttpSession session) throws IOException {
		int result = 0;
		// 사진을 수정할 수도 안할 수도 있다(안하면 fileName이 null 또는 공란)
		String mfilename = member.getFile().getOriginalFilename();
		if (mfilename != null && !mfilename.equals("")) {
			member.setMfilename(mfilename);
			String real = session.getServletContext().getRealPath("/resources/upload");
			FileOutputStream fos = new FileOutputStream(new File(real+"/"+mfilename));
			fos.write(member.getFile().getBytes());
			fos.close();
		}
		String encPass = bpe.encode(member.getPassword()); // 비밀번호 암호화
		member.setPassword(encPass);
		result = mbs.update(member);
		model.addAttribute("result", result);
		return "/member/update";
	}
	
	
	@RequestMapping("myPage")
	public String main(Model model, HttpSession session) {
		String id = (String)session.getAttribute("id");		
		if (id != null && !id.equals("")) {
			Member member = mbs.select(id);
			model.addAttribute("member", member);
		}
		return "/member/myPage";
	}
	
	}

