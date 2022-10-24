<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../header.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	function chk() { //비밀번호 일치여부
		if (frm.password.value != frm.password2.value) {
			alert("암호와 암호 확인이 다릅니다");
			frm.password.focus();
			frm.password.value = "";
			frm.password2.value = "";
			return false;
		}
	}
	function idChk() { //아이디 중복체크
		if (!frm.id.value) {
			alert("아이디를 입력한 후에 체크하시오");
			frm.id.focus();
			return false;
		}
		$.post('idChk.do', "id=" + frm.id.value, function(data) {
			$('#idChk1').html(data);
		});
	}

	$(function() {
		var uploadfiles = []; // 파일 배열(여러개 파일도 사용)
		var $drop = $('#drop');
		$drop.on("dragenter", function() { // 드래그 요소가 들어 왔을 때
			$('#thumbnails').text("");
			$(this).addClass('drag-over');
		}).on("dragleave", function() { // 드래그 요소가 나갔을 때
			$('#thumbnails').text("그림을 올려 놓으세요");
			$(this).removeClass('drag-over');
		}).on("dragover", function(e) { // 드래그 한 그림을 떨어뜨리기 위해 위에 올려 놨을 때
			e.stopPropagation(); // 이벤트를 전달하지 마라
			e.preventDefault(); // 원래 자체 기느을 하지 마라
		}).on("drop", function(e) { // 드래그 한 그림을 떨어 뜨렸을 떄
			e.preventDefault();
			$(this).removeClass('drag-over');
			var files = e.originalEvent.dataTransfer.files; // 드래그한 그림들
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var size = uploadfiles.push(file); // 업로드 파일 목록에 추가
				preview(file); // 미리 보기
			}
		});
		$('#thumbnails').on('click', function(e) {
			var $target = $(e.target);
			var idx = $target.attr('data-idx');
			$target.parent().remove(); // x를 클릭한 그림 삭제
		});
	});
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
	//미성년자 여부와 생년월일 유효성 판단
 	$(function () {
			 $("#err_regNum1").hide();
	   		 $("#err_regNum2").hide();
			 $("#err_regNum3").hide();
			  		 
		$("#CheckRegNum"). keyup(function(){
			var today = new Date(); // 시스템 날짜 객체 생성
			var year = parseInt(today.getFullYear()); // 생성된 객체에서 연도 데이터만 가져와 숫자로 변환
			var regNum = $("#regNum").val();
			var gender = $("#gender").val(); 
			var age = 0; // 임시 나이 변수;
		
			var  birthYear  = (gender == 1 || gender == 2) ? 19 : 20;
		  	   birthYear  += regNum.substr(0,2);  
			var  birthMonth =  regNum.substr(2,2)-1;
			var	 birthDate  =  regNum.substr(4,2);
			var	 birth = new Date(birthYear, birthMonth, birthDate);
			
		if(regNum.length == 6 ) {   // regNum의 6자리가 채워진 후에 날짜 유효성 체크
			if (birth.getYear() % 100 != regNum.substr(0,2) ||  birth.getMonth()  != birthMonth ||
				       birth.getDate()  != birthDate) {
				$("#err_regNum1").hide();
				$("#err_regNum2").toggle();
				$("#err_regNum3").hide();
			 	$("#regNum").val('');  
				$("#gender").val('');  
				$("#regNum").focus(); 
				/* $("#submit").attr('disabled', true); */ 
		      } else { 
		    	 if (gender == 1 || gender == 2) { // 주민등록번호 뒷자리 첫번째 값이 1과 2인 경우
					age = year - (1900 + parseInt(regNum.substring(0,2)));  // 유효한 정보
						$("#err_regNum1").hide();
						$("#err_regNum2").hide();
						$("#err_regNum3").toggle();
					/* $("#submit").attr('disabled', false); */
			     } else {
			    	if  (gender == 3 || gender == 4) { // 3과 4인 경우
						age = year - (2000 + parseInt(regNum.substring(0,2)));
						if (age < 20  && age > 0) {          // age의 값이 20 미만인 경우 회원가입을 할 수 없게 함
							$("#err_regNum1").toggle();
							$("#err_regNum2").hide();
							$("#err_regNum3").hide();
						 	$("#regNum").val('');  
						 	$("#gender").val('');
							$("#regNum").focus();
						  /*   $("#submit").attr('disabled', true); */
				       } else if (age < 0) {
				    	    $("#err_regNum1").hide();
							$("#err_regNum2").toggle();
							$("#err_regNum3").hide();
							$("#regNum").val('');  
							$("#gender").val('');
							$("#regNum").focus(); 
							/*  $("#submit").attr('disabled', true); */
				      }
			        } 	
		          } 
			  }
		    }  
	  });	     
	});	  


	//이메일 유효성 검사 및 중복 체크
	function emailChk() {
		// 이메일 유효성 검사
		var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (!frm.email.value) { // 이메일 입력창에 아무것도 작성안하고 체크 눌럿을 때
			alert("이메일을 입력하세요")
			frm.email.focus();
			frm.email.value = "";
			return false;
		} else { // 작성한 후 체크 줄렀을때
			if (!reg_email.test(frm.email.value)) { // 올바른 이메일 형식이 아닐때
				alert("올바른 이메일 형식이 아닙니다.");
				frm.email.focus();
				return false;
			} else {
				alert("사용가능한 이메일 입니다.");
				return false;
			}
		}
	}
</script>

</head>
<body>

	<div class="container" align="center">
		<h2 class="text-primary">회원가입</h2>
		  <form action="join.do" method="post" enctype="multipart/form-data" name="frm" onsubmit="return chk()">
			<table class="table table-bordered">
				<tr>
					<th>아이디</th>
					<td><input type="text" name="id" required="required" autofocus="autofocus" class="form-control">
					 <input type="button" class="btn btn-warning btn-sm" onclick="idChk()" value="중복체크">
					 <div id="idChk1" class="err"></div></td>
				</tr>
				<tr>
					<th>암호</th>
					<td><input type="password" name="password" required="required" class="form-control"></td>
				</tr>
				<tr>
					<th>암호확인</th>
					<td><input type="password" name="password2" required="required" class="form-control"></td>
				</tr>
				<tr>
					<th>이름</th>
					<td><input type="text" name="name" required="required" class="form-control"></td>
				</tr>
				<tr>
				<th>주소</th>
					<td><input type="text" name="address" required="required" class="form-control"></td>
				</tr>
				<tr>
				<th>전화번호</th>
					<td><input type="tel" name="tel" required="required" class="form-control" pattern="010-\d{3,4}-\d{4}" title="010-xxxx-xxxx"></td>
				</tr>
				<tr>
					<th>이메일</th>
					<td><input type="email" name="email" required="required"
						class="form-control"></td>
				</tr>
				<tr>
				<th>주민등록번호</th>
					<td><input type="text" name="birth" id="regNum" required="required" maxlength="6" placeholder="6자리" style="width: 20%;"> 
						<span>―</span>&nbsp&nbsp <!-- 1, 3일 경우 남자 / 2, 4일 경우 여자 -->
						<input type="text" name="birth1" id="regNum1" placeholder="1" required="required" maxlength="1" style="width: 15px;">
					    <span>******</span> 
						<div class="alert alert-danger"  id="err_regNum1">"미성년자는 가입할 수 없습니다"</div>
						<div  class="alert alert-danger" id="err_regNum2">"생년월일을 확인하세요"</div>
						<div class="alert alert-success"  id="err_regNum3">"유효한 정보입니다"</div> 
					 </td>
				</tr>
				<tr>
					<th>성별</th>
					<td><input class="magic-radio" type="radio" name="gender" id="male" value="M" checked="checked">
				<label for="male" class="radio-left">남자</label>
				<input class="magic-radio" type="radio" name="gender" id="female" value="F">
				<label for="female">여자</label>
				</td>
				</tr>
				
				<tr>
					<th>면허증사진</th>
					<td><input type="file" name="file" required="required"></td>
				<tr>
					<td colspan="2" align="center"><input type="submit"
						value="회원가입" class="btn btn-success" class="form-control"></td>
				</tr>
			</table>
		</form>
		<a href="loginForm.do" class="btn btn-info">로그인</a>
	</div>
</body>
</html>