<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script type="text/javascript">
	<!--
	
	function search() {
		$('#searchForm').submit();
		/* var link = 'list?board_type=${bean.board_type}&menu_type=list';
		if (search_value != '' && search_value != null) {
			link += '&search_title=' + search_title + '&search_value='+ encodeURI(search_value);
		} */
	}
	
	function goView(url){
		location.href=url;
	}
	//-->
</script>

	<article id="main_section">
		<div id="searchHead">
			<div class="fL">
				<h3>${menu.menuname}</h3>
			</div>
			<div class="fR">
			
				<form name="searchForm" id="searchForm" method="get">
					<input type="hidden" name="board_name" id="board_name" value="${bean.board_name}"/>
					<input type="hidden" name="page" id="page" value="${bean.page}"/>
					<input type="hidden" name="pagelistno" id="pagelistno" value="${bean.pagelistno}"/>
					<fieldset  class="fL">
						<legend>검색</legend>	    			
						<select name="search_title" id="search_title" style="width:100px;">
							<option value="title" <c:if test="${bean.search_title=='title'}"         >selected="selected"</c:if>>제목</option>
							<option value="content" <c:if test="${bean.search_title=='content'}"       >selected="selected"</c:if>>내용</option>
						</select>
						<input type="text" name="search_value" id="search_value" value="${bean.search_value}"/>
						<a href="javascript:search();" class="button" id='btnSearch'  >검색</a>
					</fieldset>
					<a href="write?board_type=${bean.board_type}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${!empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.encodeSV}</c:if>" class="button">작성</a>
				</form>
			</div>
		</div> 

		<table class="tbl" border="0" cellpadding="0" cellspacing="0">
			<colgroup>
				<col width="81" />
				<col width="125" />
				<col width="*" />
				<col width="120" />
				<col width="120" />
				<col width="103" />
			</colgroup>
			<thead>
				<tr>
					<th>No.</th>
					<th>이미지</th>
					<th>제목</th>
					<th>작성자</th>
					<th>조회수</th>
					<th id="dateTit">등록일</th>
				</tr>
			</thead>
		</table>
	
	
		<div id="content_R">
			<div id="content">	
				<section class="main_content">
					<table class="tbl" border="0" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="80" />
							<col width="125" />
							<col width="*" />
							<col width="120" />
							<col width="120" />
							<col width="103" />
						</colgroup>
						<tbody>
							<c:if test="${empty list}">
								<tr>
									<td colspan="6">등록된 글이 없습니다.</td>
								</tr>
							</c:if>
							<c:if test="${!empty list}">
								<c:forEach var="list" items="${list}">
									<c:set var="q" value="${q+1}"></c:set>
									<tr id="${q}" >
										<th>${pageCount -q +1}</th>
										<td><img src="/upload/${fn:split(list.THUM_IMG,'/')[0]}/${fn:split(list.THUM_IMG,'/')[1]}/thum/${fn:split(list.THUM_IMG,'/')[2]}" width="105" alt="썸네일" border="0"/></td>
										<td class="L" align="left" onclick="goView('view?board_name=${bean.board_name}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.encodeSV}</c:if>&seq=${list.SEQ}');">
											<c:if test="${list.RE_LEVEL > 0 }">
												<c:forEach begin="0" end="${list.REF_LEVEL*5}">&nbsp;</c:forEach>[RE]
											</c:if>
												<c:if test="${list.REF_STEP != 0 && !empty list.REF_STEP}">
													<c:forEach begin="0" end="${list.REF_STEP*10}">&nbsp;</c:forEach>
													<img src="/assets/admin/images/icon_re.gif" alt="답변" />
												</c:if>
											<a  href="view?board_name=${bean.board_name}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.encodeSV}</c:if>&seq=${list.SEQ}">
												${list.TITLE}
												<c:if test="${list.CCNT!=0 && !empty list.CCNT}">
													<span>( ${list.CCNT } )</span>
												</c:if>
											</a>
										</td>
										<td>${list.NAME}</td>
										<td>${list.HIT}</td>
										<td>
											<fmt:formatDate value="${list.REG_DATE}" pattern="yyyy-MM-dd" />
										</td>
									</tr>
								</c:forEach>
							</c:if>
						
						</tbody>
					</table>

				<!--  pageNate  -->
				${navi }
				<!--//pageNate  -->



				</section>
			</div>
		</div>
	</article>