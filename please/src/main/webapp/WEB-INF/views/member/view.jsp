<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>
<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Insert title here</title></head><body>
<div class="container" align="center">
	<h2 class="text-primary">회원정보 상세</h2>
        <table class="table table-striped">
	       <tr><th>아이디</th><td>${member.id }</td></tr>
	       <tr><th>이름</th><td>${member.name}</td></tr>
	       <tr><th>주소</th><td>${member.address}</td></tr>
	       <tr><th>전화번호</th><td>${member.tel}</td></tr>
	       <tr><th>이메일</th><td>${member.email}</td></tr>
	       <tr><th>생년월일</th><td>${member.birth}</td></tr>
	       <tr><th>성별</th><td>${member.gender}</td></tr>
	       <tr><th>등록일</th><td>${member.regdate}</td></tr>
	       <tr><th>면허증사진</th><td>
		<img alt="" src="resources/upload/${member.mfilename}" width="200"></td></tr>
        </table>
   <a href="myPage.do" class="btn btn-default">마이페이지</a>
   <a href="main.do" class="btn btn-default">메인</a>
</div>
</body>
</html>