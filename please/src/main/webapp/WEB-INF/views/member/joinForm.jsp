<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file = "../header.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 <div class ="container" align="center">
    <h2 class ="text-primary">회원가입</h2>
       <form action = "join.do" method="post" name="frm" onsubmit="return Chk()">
           <table class="table table-bordered">
              <tr><td>아이디</td><td><input type="text" name="id" required="required" 
                 autofocus = "autofocus"></td></tr> 
              <tr><td>아이디</td><td><input type="text" name="id" required="required"
              maxlength="20" ></td></tr>   
                
           
           </table>       
       </form>
 </div>


</body>
</html>