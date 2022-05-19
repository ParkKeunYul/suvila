<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<title>관리자</title>
	<link type="text/css" rel='stylesheet' href="/assets/admin/css/reset.css" />
	<link type="text/css" rel='stylesheet' href="/assets/admin/css/login.css" />
	<script type="text/javascript" src="/assets/admin/js/jquery/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="/assets/admin/js/setting.js"></script>
	<script type="text/javascript" src="/assets/admin/js/validation.js"></script>
	<script type="text/javascript">
	function login(){
		
		if(!valCheck('id','아이디를 입력하세요')){ return;}
		if(!valCheck('pwd','비밀번호를 입력하세요')){ return;}
			
		$.ajax({
		    url: '/admin/loginPro.suvila?id='+$('#id').val()+'&pwd='+$('#pwd').val(),
		    type : "POST",
		    error: function(){
		    	alert('에러가 발생했습니다. 관리자에 문의하세요.');
		    },
		    success: function(r){
		    	if(r == 1){
		    		alert('아이디가 존재하지 않습니다.');
		    		$('#pwd').focus();
		    	}	
		    	else if(r== 2){
		    		alert('비밀번호가 일치하지 않습니다.');
		    		$('#pwd').focus();
		    	}
		    	else if(r == 100){
		    		location.href='/admin/main.suvila';
		    	}
		    	else{
		    		alert('다시 시도해주세요');
		    	}
		    }
		});
	}
</script>
</head>
<body>
<div id="Warp">
	<div class="Lbox" >
		 <form action="/loginPro.suvila" id="loginForm" name="loginForm" >
			<fieldset>
				<legend>달라이라마 관리자 로그인</legend>
				<ul>
<!-- 					<li></li> -->
					<li class="login_box" style="margin-left:140px;margin-top: 50px;">
						<table>
							<tr>
								<th><label for="id">I&nbsp;&nbsp; D </label></th>
								<td>
									&nbsp;	<input type="text" name="id" id="id" value="matrix" tabindex="1" >
								</td>
								<td rowspan="2"><a href="#none" onclick="login();" tabindex="3" ><img src="/assets/admin/images/login_btn.png" alt="로그인"  /></a></td>
							</tr>
							<tr>
								<th><label for="pwd">P W </label></th>
								<td style="padding-top:4px;">
									&nbsp;	<input type="password" name="pwd" id="pwd" value="gksmf2!!" tabindex="2" onkeydown="javascript: if (event.keyCode == 13) {login();}">
								</td>
							</tr>
						</table>
					</li>
				</ul>
			</fieldset>
		</form>
	</div>
</div>
</body>
</html>

