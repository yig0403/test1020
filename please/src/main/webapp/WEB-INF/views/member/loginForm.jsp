<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>
<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Insert title here</title></head><body>
<div class="container" align="center">
	<h2 class="text-primary">로그인</h2>
        <form action="login.do">
             <table class="table table-hover">
	             <tr><th>아이디 <span class="glyphicon glyphicon-user"></span></th>
		               <td><input type="text" name="id" required="required" autofocus="autofocus" class="form-control"></td></tr>
	             <tr><th>암호 <span class="glyphicon glyphicon-lock"></span></th>
		               <td><input type="password" name="password" required="required" class="form-control"></td></tr>
	             <tr><td colspan="2" align="center"><input type="submit" class="btn btn-danger" value="로그인"></td></tr>
</table>
</form>
<a href="joinForm.do" class="btn btn-success">회원 가입</a>
</div>
</body>
</html>