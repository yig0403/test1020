<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>
<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Insert title here</title></head><body>
<c:if test="${result > 0}">
	<script type="text/javascript">
		alert("회원가입되었습니다. 환영합니다.");
		location.href="loginForm.do";
	</script>
</c:if>
<c:if test="${result == 0}">
	<script type="text/javascript">
		alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
		history.go(-1);
	</script>
</c:if>
<c:if test="${result == -1}">
	<script type="text/javascript">
		alert("사용가능하지 않은 아이디입니다. 다시 시도해주세요.");
		history.go(-1);
	</script>
</c:if>
</body>
</html>