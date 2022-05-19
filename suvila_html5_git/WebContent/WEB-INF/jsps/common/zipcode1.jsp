<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link type="text/css" rel="stylesheet" href="/assets/css/common.css" />
	<script type="text/javascript" src="/assets/js/publish.js"></script>
	<script type="text/javascript">
		$(function(){
			$("[name='query']").keydown(function(){
				var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
				if (keyCode == 13)
					zipCode();
			});
			$("[name='building']").keydown(function(){
				var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
				if (keyCode == 13)
					newZipCode();
			});
		});
		function jibun(){
			$("#jibun").show();
			$("#road").hide();
		}
		function road(){
			$("#road").show();
			$("#jibun").hide();
		}
		function buildingNum(){
			//alert($("[name='searchSe']").val());
			if($("[name='searchSe']").val() == "road"){
				$("#bdNumber").text("건물번호");
			}else{
				$("#bdNumber").text("번지");
			}
		}
		function closePop(){
			window.close();
		}
		function zipCode(){
			if($("[name='query']").val() == ''){
				alert("검색어를 입력해 주세요.");
				$("[name='query']");
				return;
			}
			
			$(".layer_post_con > ul#jibunAddr").html("");
			$(".layer_post_con > ul#roadAddr").html("");
			
			if($.formValidator.validate($("#frm"))) {
				ajaxSubmit("/IGateJWeb/common/zipCode.do", getZipCodeList, document.frm);				
			}
		}
		function getZipCodeList(data){
			var html = "";
			var list = data.zipCodeList;
			
			if(data.zipCodeList[0].errorCd === undefined){
				for(var i=0; i<list.length; i++){
					html += "<li><a href='#none' onclick='getZipCode(\""+list[i].postCd+"\",\""+list[i].address+"\");'>"+list[i].postCd.substr(0,3)+"-"+list[i].postCd.substr(3,3)+" : "+list[i].address+"</a></li>";
				}
			}else{
				html+="<li><a href='#none'>검색 결과가 없습니다.</a></li>";
			}
			
			$(".layer_post_con > ul#jibunAddr").html(html);
			
		}
		function newZipCode(){
			if($("[name='roadName']").val() == ''){
				if($("[name='searchSe']").val() == "road"){
					alert("도로명을 입력해 주세요.");
				}else{
					alert("동(읍/면)명을 입력해 주세요.");
				}
				$("[name='roadName']").focus();
				return;
			}
			if($("[name='building']").val() == ''){
				if($("[name='searchSe']").val() == "road"){
					alert("건물번호를 입력해 주세요.");
				}else{
					alert("번지를 입력해 주세요.");
				}
				$("[name='building']").focus();
				return;
			}
			
			$(".layer_post_con > ul#jibunAddr").html("");
			$(".layer_post_con > ul#roadAddr").html("");
			
			if($.formValidator.validate($("#frm2"))) {
				ajaxSubmit("/IGateJWeb/common/newZipCode.do", getNewZipCodeList, document.frm2);				
			}
		}
		function getNewZipCodeList(data){
			var html = "";
			var list = data.zipCodeList;
			//alert(data.zipCodeList[0].error);
			if(data.zipCodeList[0].error === undefined){
				for(var i=0; i<list.length; i++){
					html += "<li><a href='#none' onclick='getNewZipCode(\""+list[i].zip+"\",\""+list[i].road+"\");'>"+list[i].zip.substr(0,3)+"-"+list[i].zip.substr(4,3)+" : "+list[i].road+"</a></li>";
				}
			}else{
				html+="<li><a href='#none'>"+data.zipCodeList[0].error+"</a></li>";
			}
			
			$(".layer_post_con > ul#roadAddr").html(html);
			
		}
		function getZipCode(post,addr){
			var opener = window.dialogArguments;
			var address = addrTrim(addr);
			opener.document.submitForm.zip1.value = post.substr(0,3);
			opener.document.submitForm.zip2.value = post.substr(3,3);
			opener.document.submitForm.addr1.value= address;
			opener.document.submitForm.addr2.focus();
			window.close();
		}
		function getNewZipCode(post,addr){
			var opener = window.dialogArguments;
			opener.document.submitForm.zip1.value = post.substr(0,3);
			opener.document.submitForm.zip2.value = post.substr(4,3);
			opener.document.submitForm.addr1.value= addr;
			opener.document.submitForm.addr2.focus();
			window.close();
		}
		function addrTrim(addr){
			var str = addr;
			var pattern = /(\d{0,4}-?\(?[가-힣]?\d{0,4}[a-z]*[가-힣]*~\d{0,4}[a-z]*[가-힣]*\)?)/gi;
			
			str = str.replace(pattern,"");
			return str;
		}
	</script>
</head>
<body>
	<!-- contents -->
		<!-- layerPop -->
		<!-- 지번주소 -->
		<div class="layerPop_wrap post_layer" id="jibun">
			<div class="layerPop_header">
				<h2><img src="/_admin/_images/layer_pop/tit_laypop_post.png" alt="우편번호 찾기"/></h2>
			</div>
			<div class="layerPop_body center">
				<div class="layer_tab_area">
					<ul class="layer_tab">
						<li><a href="#none" onclick="jibun();"><img src="/_admin/_images/layer_pop/tab_post01_over.png" alt="지번주소"/></a></li>
						<li><a href="#none" onclick="road();"><img src="/_admin/_images/layer_pop/tab_post02.png" alt="도로/건물명"/></a></li>
					</ul>
				</div>
				<ul class="post_top_txt">
					<li>읍/면/동 이름을 입력하세요. (예:철원읍, 토성면, 신사동)</li>
				</ul>
				<form action="" method="post" id="frm" name="frm">
				<div class="layer_input_area">
					<input type="text" class="text" size="50" name="query"/>
					<input type="text" style="display:none;"/> 
					<span class="join_btn id01">
						<a href="#none" onclick="zipCode();"><img src="/_admin/_images/layer_pop/btn_post01.png" alt="우편번호찾기"/></a>
					</span>
				</div>
				</form>
				<div class="layer_post_con">
					<ul id="jibunAddr">
						<!-- <li><a href="#none">660-050 : 경남 진주시 상봉동</a></li> -->
					</ul>
				
				</div>
			</div>
			<span class="layerPop_close"><a href="#none"><img src="/_admin/_images/layer_pop/img_laypop_close.png" alt="닫기"/></a></span>
		</div>
		<!-- //layerPop -->
		
		<!-- layerPop -->
		<!-- 도로명주소 -->
		<div class="layerPop_wrap post_layer" id="road" style="display:none;">
			<div class="layerPop_header">
				<h2><img src="/_admin/_images/layer_pop/tit_laypop_post.png" alt="우편번호 찾기"/></h2>
			</div>
			<div class="layerPop_body center">
				<div class="layer_tab_area">
					<ul class="layer_tab">
						<li><a href="#none" onclick="jibun();"><img src="/_admin/_images/layer_pop/tab_post01.png" alt="지번주소"/></a></li>
						<li><a href="#none" onclick="road();"><img src="/_admin/_images/layer_pop/tab_post02_over.png" alt="도로/건물명"/></a></li>
					</ul>
				</div>
				<ul class="post_top_txt">
					<li>도로, 건물 이름을 입력하세요. </li>
					<li>(예: 찾고자 하는 주소 => 서울특별시 종로구 세종로 17 세종문화회관<br/> 입력 예시 : 도로명 건물번호 => 세종로 17)</li>
				</ul>
				<form action="" method="post" id="frm2" name="frm2">
				<div class="layer_input_area">
					<select name="searchSe" onchange="buildingNum();">
						<option value="road">도로명</option>
						<option value="dong">동명</option>
					</select>
					<input type="text" class="text" size="20" name="roadName"/>
					<label for="building"><span id="bdNumber">건물번호</span> : </label>
					<input type="text" class="text" size="10" id="building" name="building"/>
					<span class="join_btn id01" style="vertical-align:middle;">
						<a href="#none" onclick="newZipCode();"><img src="/_admin/_images/layer_pop/btn_post02.png" alt="조회"/></a>
					</span>
				</div>
				</form>
				<div class="layer_post_con">
					<ul id="roadAddr">
						<!-- <li><a href="#none">660-050 : 경남 진주시 상봉동</a></li> -->
					</ul>
				
				</div>
			</div>
			<span class="layerPop_close"><a href="#none" onclick="closePop();"><img src="/_admin/_images/layer_pop/img_laypop_close.png" alt="닫기"/></a></span>
		</div>
		<!-- //layerPop -->
	<!-- //contents -->
</body>
</html>