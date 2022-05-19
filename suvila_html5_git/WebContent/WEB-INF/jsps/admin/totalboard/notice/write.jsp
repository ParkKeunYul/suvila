<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<article id="main_section">
	<div id="searchHead">
		<div class="fL">
			<h3>${menu.menuname}</h3>
		</div>
		<div class="fR">
			
		</div>
	</div>
	
	<div id="content_R">
		<div id="content">	
			<section class="main_content">
				<%-- <c:if test="${!empty  view }">
					<div class="cBox" >
						<h3>${view.TITLE}</h3>
						<div class="contentsBox2 wBox">${view.CONTENT}</div>
					</div>
				</c:if> --%>
			
				<form name="frm" id="frm" method="post" action="insert"  method="post" accept-charset="utf-8">
					<input type="hidden" name="board_name" id="board_name" value="${bean.board_name}">
					<input type="hidden" name="reg_id" id="reg_id" value="${adminInfo.ID}" >
					<input type="hidden" name="reg_nikname" id="reg_nikname" value="${adminInfo.NAME}">
					<input type="hidden" name="user_idx" id="user_idx" value="${adminInfo.ADMIN_IDX}" >
					<fieldset>
						<legend>게시판등록</legend>
						<div class="T_basic">
							<table summary="공지사항 글입력하기">
								<caption>${menu.submenu} 등록</caption>
								<colgroup>
									<col width="100" />
									<col width="*" />
									<col width="110" />
								</colgroup>
							
								<tr>
									<th><label for="TITLE">제목</label></th>
									<td colspan="2">
										<input type="text" name="title" id="title" value="<c:if test="${!empty  view }">RE : ${view.TITLE}</c:if>" style="width:574px;" />
									</td>
								</tr>
								<c:if test="${empty  view }">
								<tr>
									<th><label for="TITLE">메인공지</label></th>
									<td colspan="2">
										공지 <input type="checkbox" alt="공지" name="notice_yn" value="Y" style="margin-left:2px;"/> 
									</td>
								</tr>
								</c:if>
								<tr>
									<th><label for="contents">내용</label></th>
									<td colspan="2">
										<input type="hidden" name="type" id="type" value="${bean.board_name}"><!-- 게시판 아이디 -->
										<jsp:include page="/WEB-INF/jsps/common/editor.jsp"></jsp:include>
									</td>
								</tr>
								
							</table>
							<p style="padding-right:48px;">
								<a href="#" id="insertBtn" class="button">확인</a>
								<a href="list?board_name=${bean.board_name}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>" class="button">목록</a>
							</p>
							
							<input type="hidden" name="img_file" class="text_box" id="img_file" value="" >
							<input type="hidden" name="replaceDir" id="replaceDir" value="" class="text_box">
							<input type="hidden" name="today_temp" id="today_temp" value="" class="text_box">
						</div>
					</fieldset>
					<!-- 답글관련 -->
					<input type="hidden" id="page" name="page" value="${bean.page}">
					<input type="hidden" id="pagelistno" name="pagelistno" value="${bean.pagelistno }">
					<input type="hidden" id="seq" name="seq" value="${bean.seq }">
					<input type="hidden" id="search_title" name="search_title" value="${bean.search_title }">
					<input type="hidden" id="search_value" name="search_value" value="${bean.search_value }">
					<input type="hidden" name="ref" id="ref"  value="${bean.ref }">
					<input type="hidden" name="ref_step" id="ref_step"  value="${bean.ref_step }">
					<input type="hidden" name="ref_level" id="ref_level"  value="${bean.ref_level }">
				</form>
			</section>
		</div>
	</div>
</article>
<script type="text/javascript">
$(document).ready(function() {
	$("#insertBtn").click(function() {
		if( !valCheck('title', '제목을입력하세요') ) return;
		if(confirm('등록하시겠습니까?')){
			Editor.save(); 	
		}

	});

});	
</script>		
	