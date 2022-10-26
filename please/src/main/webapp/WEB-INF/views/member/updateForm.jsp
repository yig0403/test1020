<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
   <script type="text/javascript">
	function chk() {
		if (frm.password.value != frm.password2.value) {
			alert("암호와 암호 확인이 다릅니다"); frm.password.focus();
			frm.password.value=""; frm.password2.value="";
			return false;
		}
	}
	// 그림 보여주기
	function preview(file) {
		var reader = new FileReader();
		reader.onload = (function(f) {
			return function(e) {
				var div = '<div class="thumb"><div class="close">X</div><img src="'+
					e.target.result+'"/></div>';
				$('#thumbnails').append(div);
			};
		})(file);
		reader.readAsDataURL(file);
		// readAsDataURL: 컨텐츠의 특정 Blob이나 File에서 읽어노는 역할 수행
	}
	</script>
</head>
<body>

<div class="container" align="center">
	<h2 class="text-primary">회원정보 수정</h2>
<form action="update.do" method="post" enctype="multipart/form-data" name="frm" onsubmit="return chk()">
	<input type="hidden" name="id" value="${member.id }">
<table class="table table-bordered">
	<tr><th>아이디</th><td>${member.id }</td></tr>
	<tr><th>암호</th><td><input type="password" name="password" required="required" class="form-control" autofocus="autofocus"></td></tr>
	<tr><th>암호확인</th><td><input type="password" name="password2" required="required" class="form-control"></td></tr>
	<tr><th>이름</th><td><input type="text" name="name" required="required" class="form-control" value="${member.name }"></td></tr>
	<tr><th>주소</th><td><input type="text" name="address" required="required" class="form-control" value="${member.address }"></td></tr>
	<tr><th>전화번호</th><td><input type="tel" name="tel" required="required" class="form-control" value="${member.tel }"></td></tr>
	<tr><th>이메일</th><td><input type="email" name="email" required="required" class="form-control" value="${member.email }"></td></tr>		
	<tr><th>생년월일</th><td>${member.birth }</td></tr>		
	<tr><th>성별</th><td>${member.gender }</td></tr>		
	<tr><th>면허증사진 <span class="glyphicon glyphicon-picture"></span></th>
		<td><input type="file" name="file">${member.mfilename }</td></tr>
</table>		
</form>
<a href="myPage.do" class="btn btn-info">메인</a>
</div>
</body>
</html>