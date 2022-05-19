<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta charset="utf-8">
<title></title>
	<link type="text/css" rel='stylesheet' href="/_admin/_css/reset.css" />
	<link type="text/css" rel='stylesheet' href="/_admin/_css/style.css" />
	<link type="text/css" rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/ui-lightness/jquery-ui.css" />
	<link type="text/css" rel='stylesheet' href="/_admin/_js/_jquery/_fancybox2.0/jquery.fancybox.css?v=2.1.4"  media="screen"/>
	<link rel="stylesheet" type="text/css" href="/_admin/_js/_jquery/_fancybox2.0/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
	<link rel="stylesheet" type="text/css" href="/_admin/_js/_jquery/_fancybox2.0/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
	
	<script type="text/javascript" src="/_admin/_js/_jquery/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="/_admin/_js/_jquery/jquery-ui-1.10.2.custom/js/jquery-ui-1.10.2.custom.min.js"></script>
	<script type="text/javascript" src="/_admin/_js/_jquery/jquery.cookie.min.js"></script>
	<script type="text/javascript" src="/_admin/_js/_jquery/_fancybox2.0/jquery.mousewheel-3.0.6.pack.js"></script>
	<script type="text/javascript" src="/_admin/_js/_jquery/_fancybox2.0/jquery.fancybox.js?v=2.1.4"></script>
	<script type="text/javascript" src="/_admin/_js/common.js"></script>
	<script type="text/javascript" src="/_admin/_js/setting.js"></script>
	<script type="text/javascript" src="/_admin/_js/validation.js"></script>
<script type="text/javascript">
function addr(){
	if( !valCheck('dong', '주소를  입력하세요')){
		return;
	}
	
	$("#frm").submit();
}

function doroAddr(){
	if( !valCheck('doro', '도로명을  입력하세요')){
		return;
	}
	
	$("#frm2").submit();
}


function setting(zip,addr,gubun){
	var z1 = zip.substring(0,3);
	var z2;
	if(gubun=='doro'){
		z2 = zip.substring(4,8);
	}else z2 = zip.substring(4,7);
	$("#zipcode1",opener.document).val(z1);
	$("#zipcode2",opener.document).val(z2);
	$("#addr1",opener.document).val(addr);
	$("#addr2",opener.document).focus();
	
	
	self.close();
}



$(function() {
	var chkGubun = '${gubun}';
	var $tabs = $("#myTabs").tabs();
	$('.btn').button();
	if(chkGubun == 'doro'){
		$tabs.tabs("option", "active", 1);
		$('#dongBoxList').html('');
	} else {
		
		$tabs.tabs("option", "active", 0);
		$('#doroBoxList').html('');	
	};
});

</script>
<style type="text/css">
<!--
	body	{ }
	select {font-family:돋움; font-size: 10pt;color:#666666;}
	h1		{ display:block; height:30px; margin-bottom:20px; padding-left:10px; border-left:6px solid #F1D827; font-size:16pt; color:#FFF; }
	input[type=text]	{ padding:6px 10px 3px;height:14px;line-height:8px;font-family:돋움; font-size: 10pt;}
	#a, #b		{ height:270px; padding:10px 10px 20px; text-align:center;  }
	fieldset	{ padding:10px; margin:0 auto; border:0; background:transparent;  }
	legend		{ visibility:hidden; height:0; padding:0; margin:0 auto; border:0; font-size:0;}
	#dongBoxList , #doroBoxList{height: 290px;background-color: #fff;text-align:left;line-height:160%; border: 1px solid #ddd;overflow-y:scroll;padding: 5px;}
	#dongBoxList li{font-family:돋움; font-size: 10pt;}
	#doroBoxList li{font-family:돋움; font-size: 10pt;}
	
	#dongBoxList li:hover{ background-color:#EFEFEF;cursor: pointer;}
	#doroBoxList li:hover{ background-color:#EFEFEF;cursor: pointer;}
	#doroBoxList li a:link{color:#787878;}
	#dongBoxList li a:link{color:#787878;}
	#dongBoxList li a:hover{text-decoration:none;color:#3b3b3b; }
	#doroBoxList li a:hover{text-decoration:none;color:#3b3b3b; }


-->
</style>
</head>
<body>
	<div style="height:50px;background-image: url('/common/home/images/main/bg_main.gif');">
		<img alt="타이틀" src="/common/home/images/main/post_title.png">
	</div>
	<div id="myTabs" style="height:410px;">
		<ul >
			 <li><a href="#a">번지로 찾기 (구주소)</a></li>
			  <li><a href="#b">도로명 찾기</a></li>
		</ul>
	 	<div id="a">
	 		<form action="/zipcode/bunziCode" method="get" name="frm" id="frm">
	 			<fieldset>
					<legend>동이름으로 우편번호 및 주소검색</legend>
					<input type="text" name="dong" id="dong" value="${param.dong}" style="font-family:돋움; font-size: 10pt;color:#666666;">
					<input type="button" value="검색" class="btn" style="height:26px;font-family:돋움" onclick="addr();"/><br>
				</fieldset>
				<div><span style="height: 50px;font-size:10pt;font-family: 돋움;">- 읍/면/동 이름을 입력하세요. (예: 철원읍, 토성면, 신사동, 망원1동) -</span></div>
				<div id="dongBoxList">
				<c:if test="${not empty zipList }">
					<ul>
					<c:forEach var="list" items="${zipList }">
						
						<li><a href="javascript:setting('${list.ZIPCODE}','${list.SIDO} ${list.GUGUN} ${list.DONG}')"><span style="font-weight: bold;">[${list.ZIPCODE }]</span><span style="margin-left:3px;">${list.SIDO} ${list.GUGUN} ${list.DONG} ${list.BUNJI}</span></a></li>
						
					</c:forEach>
						
					</ul>
				</c:if>
					
				</div>
				<input type="hidden" name="gubun" value="bunji">
				<input type="hidden" name="gubun2" value="user">
				<input type="hidden" name="type" id="type" value="${bean.type }">
			</form>
		</div>
	 	<div id="b">
	 		<form action="/zipcode/doroCode" method="get" name="frm2" id="frm2" >
				<fieldset>
					<legend>도로명으로 우편번호 및 주소검색</legend>
					<select name="tables" id="table">
						<option value="DORO_SEOUL"    <c:if test="${param.tables eq 'DORO_SEOUL'}">selected="selected"</c:if>>서울특별시</option>
						<option value="DORO_KANGWON" <c:if test="${param.tables eq 'DORO_KANGWON'}">selected="selected"</c:if>  >강원도</option>
						<option value="DORO_GYUNGGI"  <c:if test="${param.tables eq 'DORO_GYUNGGI'}">selected="selected"</c:if>>경기도</option>
						<option value="DORO_KYUNGNAM"   <c:if test="${param.tables eq 'DORO_KYUNGNAM'}">selected="selected"</c:if>>경상남도</option>
						<option value="DORO_KYUNGBUK"   <c:if test="${param.tables eq 'DORO_KYUNGBUK'}">selected="selected"</c:if>>경상북도</option>
						<option value="DORO_JUNNAM"   <c:if test="${param.tables eq 'DORO_JUNNAM'}">selected="selected"</c:if>>전라남도</option>
						<option value="DORO_JUNBUK"   <c:if test="${param.tables eq 'DORO_JUNBUK'}">selected="selected"</c:if>>전라북도</option>
						<option value="DORO_CHUNGNAM" <c:if test="${param.tables eq 'DORO_CHUNGNAM'}">selected="selected"</c:if>>충청남도</option>
						<option value="DORO_CHUNGBUK" <c:if test="${param.tables eq 'DORO_CHUNGBUK'}">selected="selected"</c:if>>충청북도</option>
						<option value="DORO_KWANGJU"  <c:if test="${param.tables eq 'DORO_KWANGJU'}">selected="selected"</c:if>>광주광역시</option>
						<option value="DORO_DAEGU"    <c:if test="${param.tables eq 'DORO_DAEGU'}">selected="selected"</c:if>>대구광역시</option>
						<option value="DORO_DAEJUN"   <c:if test="${param.tables eq 'DORO_DAEJUN'}">selected="selected"</c:if>>대전광역시</option>
						<option value="DORO_BUSAN"    <c:if test="${param.tables eq 'DORO_BUSAN'}">selected="selected"</c:if>>부산광역시</option>
						<option value="DORO_ULSAN"    <c:if test="${param.tables eq 'DORO_ULSAN'}">selected="selected"</c:if>>울산광역시</option>
						<option value="DORO_INCHON"   <c:if test="${param.tables eq 'DORO_INCHON'}">selected="selected"</c:if>>인천광역시</option>
						<option value="DORO_SEJONG"   <c:if test="${param.tables eq 'DORO_SEJONG'}">selected="selected"</c:if>>세종특별자치시</option>
						<option value="DORO_JEJU"     <c:if test="${param.tables eq 'DORO_JEJU'}">selected="selected"</c:if>>제주특별자치도</option>
					</select>
					<input type="text" name="doro" id="doro" value="${param.doro}">
					<input type="button" value="검색" class="btn" style="height:26px;font-family:돋움" onclick="doroAddr();">
					<input type="hidden" name="gubun" value="doro">
					<input type="hidden" name="gubun2" value="user">
					<input type="hidden" name="type"  id="type" value="${bean.type }">
				</fieldset>
				<div style="height: 50px;font-size:10pt;font-family: 돋움;"><span>- 지역선택 후 도로명, 건물 이름을 입력하세요 -<br/>
				 (입력예시: 세종로17, 중앙로3길 10)</span></div>
				<div id="doroBoxList" >
				<c:if test="${not empty doroList }">
					<ul>
					<c:forEach var="list" items="${doroList }">
						<li>
						<a href="#none" onclick="setting('${list.ZIP_CODE }','${list.ADDR2}','doro' );" >
						<span style="font-weight: bold;">[${list.ZIP_CODE }]</span><span style="margin-left:3px;">${list.ADDR}</span>
						</a>
						</li>
					</c:forEach>	
					</ul>
				</c:if>
				</div>
			</form>
		</div>
	</div>

</body>
</html>