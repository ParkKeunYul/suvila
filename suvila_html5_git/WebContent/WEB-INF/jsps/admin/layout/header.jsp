<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<h1><a href="/admin/main"><span style="line-height:70px;color:#fff;">테스트</span></a></h1>

<script type="text/javascript">
function logout(){
	if(confirm('로그아웃하시겠습니까?')){
		location.href='/admin/logout';
	}
}
</script>

<div id="head_gnb">
	<ul>
		<li id="head_gnb1"<c:if test="${sessionScope.menu_num == 1 }"> class="tabOn"</c:if> ><div class="gnbR"><h2><a href="/admin/totalboard/notice/list?menu_num=1&sub_num=1" target="_self">게시판관리</a></h2></div></li>
	</ul>
</div>
<div>
	<div id="head_sub">
	<div class="head_subR">
		<div id="userInfo">
			<strong class="teal">
				<c:if test="${! empty  adminInfo.NAME}">${adminInfo.NAME}님 반갑습니다.</c:if>
			</strong>
			<c:if test="${! empty adminInfo}">
				<a href="#none" onclick="logout();return false;"><img src="/assets/admin/images/btn_logout.gif" alt="로그아웃" /></a>
			</c:if>
		</div>
		<div id="head_snb">
			<div class="SnbBox">
				
				<!-- 게시판관리  -->
				<c:if test="${sessionScope.menu_num == 1 }">
					<ul id="subTab1">
						<li <c:if test="${sessionScope.sub_num == 1 }">class="subMenuOn"</c:if> ><a href="/admin/totalboard/notice/list?menu_num=1&sub_num=1" id="cell2_1" target="_self">공지사항</a></li>
					</ul>
				</c:if>
			
			</div>
		</div>
	</div>
	</div>
</div>
<script>
	function ready(){
		alert('준비중입니다.');
	}
</script>
