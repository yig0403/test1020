package com.ch.please.model;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;


@Data
public class Car {
 private String carNo;     //차량번호
 private String id;        //관리자 아이디만 접근
 private String carName;   //차 이름
 private String carKind;   //차종
 private String carType;   //연료 타입
 private String carYear;   //연식
 private int fee;          //기본요금
 private Date startDay;    //예약 시작일
 private Date endDay;      //반납일
 private String region;    //지역
 private String del;
 private String cfileName; //차 사진 

 //paging용
 private int startRow;
 private int endRow;
 // 검색용
 private String search;
 private String keyword;
 // 업로드
 private MultipartFile file;

}
