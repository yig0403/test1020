drop table member cascade constraint;

create table member(
id VARCHAR2(20) constraint member_id_PK PRIMARY KEY NOT NULL,   --아이디 
password VARCHAR2(100) NOT NULL,                                 --비밀번호
name VARCHAR2(10) NOT NULL,                                     --이름
address VARCHAR2(40) NOT NULL,                                  --주소
tel VARCHAR2(20) NOT NULL,                                      --전화번호
email VARCHAR2(30) NOT NULL,                                    --이메일
birth VARCHAR2(3) NOT NULL,                                     --생년월일
gender CHAR(1) NOT NULL,                                        --성별
del CHAR(1) default 'n' NOT NULL,                               --삭제여부
regdate DATE NOT NULL,                                          --가입일
mfileName VARCHAR2(50) NOT NULL                                  --면허증 사진
);


drop table member3 cascade constraint;  
select * from member;

