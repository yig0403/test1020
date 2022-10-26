<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../header.jsp" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
// 필터 변경
function filterChangsse() {
	var filter = document.getElementById("filter");
	var value = filter.options[filter.selectedIndex].value;
	$('.carList').css("display", "none");
	$('#carist' + value).css("display", "block");
}
</script>
</head>
<body>
	<div class="container" align="center">
		<h2 class="primary">차 목록</h2>
		<!-- 필터, 글쓰기 버튼 -->
		<div class="container" align="left">
			<div class="filter">
				<select id="filter" onchange="filterChange()">
					<option value="1">차 이름</option>
					<option value="2">차종</option>
					<option value="3">인승</option>
					<option value="4">연식</option>
				</select>
			</div>
		</div>
	<!-- 차량 리스트 보여주기 -->	
	   <div class = "carList" id= "carList1">
	       <ul>
	          <c:forEach var="car" items="${list }">
	              <li><a href="carView.do?carNo=${car.carNo }">
	                 <div class = "bd_text_area">
	                    <div>차량이름 :</div>
	                    <div>차종 : </div>
	                    <div>인승 : </div>
	                    <div>연식 : </div>
	                 </div>
	             </a> 
	          </c:forEach>
	       </ul>
	   
	   </div>


	
		
		

<div align="center">
	<ul class="pagination">
		<!-- 시작페이지가 pagePerBlock(10)보다 크면 앞에 보여줄 것이 있다 -->
		<c:if test="${pb.startPage > pb.pagePerBlock}">
			<li><a href="/car/carList.do?pageNum=1">
				<span class="glyphicon glyphicon-fast-backward"></span></a></li>
			<li><a href="/car/carList.do?pageNum=${pb.startPage-1 }">
				<span class="glyphicon glyphicon-triangle-left"></span></a></li>
		</c:if>
		<c:forEach var="i" begin="${pb.startPage }" end="${pb.endPage }">
			<c:if test="${pb.currentPage == i }">
				<li class="active"><a href="/car/carList.do?pageNum=${i }">${i }</a></li>
			</c:if>
			<c:if test="${pb.currentPage != i }">
				<li><a href="/car/carList.do?pageNum=${i }">${i }</a></li>
			</c:if>		
		</c:forEach>
		
		<!-- endPage보다 totalPage가 크면 보여줄 것이 뒤에 남아 있다 -->
		<c:if test="${pb.endPage < pb.totalPage}">
			<li><a href="/car/carList.do?pageNum=${pb.endPage+1 }">
				<span class="glyphicon glyphicon-triangle-right"></span></a></li>
			<li><a href="/car/carList.do?pageNum=${pb.totalPage }">
				<span class="glyphicon glyphicon-fast-forward"></span></a></li>
		</c:if>		
	</ul>
</div>
<form action="/car/carList.do">
	<select name="search">
	<option value="carName">차 이름</option>
    <option value="carKind">차종</option>
    <option value="carType">연료타입</option>
    <option value="carYear">연식</option>
		<c:forTokens var="sh" items="carName,carKind,carType,carYear,subcon" delims="," varStatus="i">
			<c:if test="${sh==car.search }">
				<option value="${sh }" selected="selected">${carName}</option>
			</c:if>
			<c:if test="${sh!=car.search }">
				<option value="${sh }">${carName}</option>
			</c:if>			
		</c:forTokens>
	</select>
	<input type="text" name="keyword" value="${car.keyword }">
	<input type="submit" value="확인">
</form>
<a href="/car/carList.do?pageNum=1" class="btn btn-success">메인</a>
</div>
</body>
</html>		
		

