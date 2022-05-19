<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<script type="text/javascript" src="../../../js/cheditor/cheditor.js"></script>
<article id="main_section">
	<div id="searchHead">
		<div class="fL">
			<h3>${menu.menuname}</h3>
		</div>
		<div class="fR">
			<strong>조회수 : </strong>${view.HIT}
		</div>
	</div>
	<table class="tbl" border="0" cellpadding="0" cellspacing="0">
		<colgroup>
			<col width="*" />
			<col width="81" />
			<col width="100" />
			<col width="81" />
			<col width="100" />
		</colgroup>
		<thead>
			<tr>
				<td>&nbsp;</td>
				<th>수정일자</th>
				<td>
					<fmt:formatDate value="${view.MOD_DATE}" pattern="yyyy-MM-dd" var="modYmd"/>
					${modYmd}
				</td>
				<th>작성일자</th>
				<td>
					<fmt:formatDate value="${view.REG_DATE}" pattern="yyyy-MM-dd" var="regYmd"/>
					${regYmd}
				</td>
			</tr>
		</thead>
	</table>
		
	<div id="content_R">
		<div id="content">	
			<section class="main_content">
			<form name="frm" id="frm" method="post" action="modifyPro" >
				<input type="hidden" name="upt_id" id="upt_id" value="${adminInfo.ID}">
				<input type="hidden" name="seq" id="seq" value="${bean.seq}">
				<input type="hidden" name="page" id="page" value="${bean.page}" >
				<input type="hidden" name="pagelistno" id="pagelistno" value="${bean.pagelistno}">
				<input type="hidden" name="search_value" id="search_value" value="${bean.search_value}" >
				<input type="hidden" name="search_title" id="search_title" value="${bean.search_title}">
				<input type="hidden" name="board_name" id="board_name" value="${bean.board_name}">
				<input type="hidden" id="delfileseq" name="delfileseq" value=""><!-- 삭제파일 seq -->
				<fieldset>
					<legend>게시판등록</legend>
					<div class="T_basic">
						<table summary="공지사항 글입력하기">
							<caption>공지사항 등록</caption>
							<colgroup>
								<col width="100" />
								<col width="*" />
								<col width="100" />
								<col width="237" />
							</colgroup>
							<tr>
								<th><label for="TITLE">제목</label></th>
								<td colspan="3">
									<input type="text" name="title" id="title" value="${view.TITLE }" style="width:574px;" />
								</td>
							</tr>
							<c:if test="${view.REF_STEP eq 0}">
							<tr>
								<th><label for="TITLE">메인공지</label></th>
								<td colspan="2">
									공지 <input type="checkbox" alt="공지" name="notice_yn" value="Y" style="margin-left:2px;" <c:if test="${view.NOTICE_YN eq 'Y'}">checked="checked"</c:if>/> 
						
								</td>
							</tr>
							</c:if>
							<tr>
								<th><label for="contents">내용</label></th>
								<td colspan="3">
									<input type="hidden" name="type" id="type" value="${bean.board_name}"><!-- 게시판 아이디 -->
									<jsp:include page="/WEB-INF/jsps/common/editor_modify.jsp"></jsp:include>
								</td>
							</tr>
						</table>
						<p>	
							<a href="#none" id="modifyBtn" class="button">확인</a>
							<a href="list?board_name=${bean.board_name}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${!empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>" class="button">목록</a>
						</p>
					</div>
				</fieldset>
			</form>
			</section>
		</div>
	</div>
</article>

<script type="text/javascript">
$(document).ready(function() {
	$("#modifyBtn").click(function() {
		if(confirm('수정하시겠습니까?')){
			if( !valCheck('title', '제목을입력하세요') ) return;
			Editor.save();	
		}
	});
	
});	
</script>