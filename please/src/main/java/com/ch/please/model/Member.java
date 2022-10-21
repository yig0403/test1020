package com.ch.please.model;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Member {
  private String id;              //아이디
  private String password;        //비밀번호
  private String name;            //이름
  private String address;         //주소
  private String tel;             //전화번호
  private String email;           //이메일
  private String birth;           //생년월일(19**-**-** / 20**-**-**)
  private String gender;          //성별
  private String del;             //삭제여부
  private Date regdate;           //가입일
  private String mfilename;       //면허증 사진
  
  //paging용
  private int startRow;
  private int endRow;
  // 검색용
  private String search;
  private String keyword;
  // 업로드
  private MultipartFile file;

}
