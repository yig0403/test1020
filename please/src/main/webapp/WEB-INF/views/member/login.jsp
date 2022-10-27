<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>
<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Insert title here</title></head><body>
    <c:if test="${result > 0}">
	<script type="text/javascript">
		alert("환영합니다.");
		location.href="myPage.do";
	</script>
    </c:if>
    <c:if test="${result == 0}">
	<script type="text/javascript">
		alert("암호가 다릅니다. 다시 시도해주세요.");
		history.back();
	</script>
    </c:if>
    <c:if test="${result == -1}">
	<script type="text/javascript">
		alert("등록되지 않은 정보입니다.");
		history.back();
	</script>
    </c:if>
</body>
</html>