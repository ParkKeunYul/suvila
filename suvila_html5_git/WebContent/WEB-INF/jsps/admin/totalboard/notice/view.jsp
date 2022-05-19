<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	pageContext.setAttribute("crlf", "\n");
%>
<script type="text/javascript">
function cinsert() {
	 var contents = $('#contents').val();
	if (contents == '' || contents == null) {
		alert('내용을 입력하세요.');
		$('#contents').focus();
		return;;
	}
	
	if(confirm('등록하시겠습니까?')){
		$('#c_form').submit();	
	}
	return;
	
	/* if (contents.length > 30) {
		alert('글자수는 30자 이내로 작성해주세요.');
		$('#contents').val(contents.substring(0, 30));
		return false;
	} */
}



function download(o, c, t){
	location.href='/download?filename='+encodeURI(o)+'&refilename='+c+'&path='+t;
}

function del(url){
	if(confirm('삭제하시겠습니까?')){
		location.href = url;	
	}
}

function cdelete(seq,q){
	if(confirm('삭제하시겠습니까?')){
		$.ajax({
		    url: 'cdeletePro',
		    type: 'POST',
		    data: 'seq='  + seq,
		    error: function(){
		    	alert('실행 중 오류가 발생 하였습니다.\n관리자에게 문의 바랍니다.');
		    },
		    success: function(data){
		    	if(data != '1'){
		    		alert('다시시도해주세요');
		    		return;
		    	}else{
		    		alert('삭제되었습니다.');
		    		var del_seq = q.split(',');
		    		for(var i = 0; i< del_seq.length; i++){
		    			$('#ul_li_'+del_seq[i]).remove();	
		    		}
		    	}
		    }
		}); 	
	}
}

function getCommentAjax(board_seq){
	//alert(board_seq);
	$.ajax({
	    url: 'getCommentList',
	    type: 'POST',
	    data: 'seq=' +board_seq,
	    error: function(){
	    	alert('실행 중 오류가 발생 하였습니다.\n관리자에게 문의 바랍니다.');
	    },
	    success: function(data){
	    	$('#commentDivArea').remove();  // 아이디 commentDivArea div영역 모두 삭제(태그포함)
	    	$('#mt_40div').after(data); // 아이디 mt_40div  뒤에 삽입 
	    }
	}); 	
}


function cmodify(q,seq){
	
	var content =$('#ul_li_content'+q).html();
	      content =  content.replace(/<br>/gi, '\n'); 
	var html  = '<ul id="comment_update_ul"><li  class="" style="text-align: left;">';
		  html+= '<textarea rows="5" id="modifyContents" style="width:574px;" >'+content;
		  html+= '</textarea>';
		  html+= '<input type="hidden" id="modi_seq" value="'+seq+'">';
		  html+= '<label for="contents">';
		  html+= '			<a href="#none" onclick="cmodifyPro('+q+'); return false;"   class="button ">[확인]</a>';
		  html+= '			<a href="#none" onclick="ccancel(); return false;"   class="button ">[취소]</a>';
		  html+= '</label>';
	      html+= '</li></ul>';
	$('#comment_update_ul').remove();
	$('#ul_li_'+q).after(html);
}

function ccancel(){
	$('#comment_update_ul').remove();
}


function cmodifyPro(q){
	
	var contents =$('#modifyContents').val();
	if(confirm('수정하시겠습니까?')){
		$.ajax({
		    url: 'cmodifPro',
		    type: 'POST',
		    data: 'seq=' +$('#modi_seq').val()
		    	+'&contents='+contents,
		    error: function(){
		    	alert('실행 중 오류가 발생 하였습니다.\n관리자에게 문의 바랍니다.');
		    },
		    success: function(data){
		    	if(data == '1'){
		    		alert('수정되었습니다.');
		    		$('#ul_li_content'+q).html(contents.replace(/\n/gi, '<br>'));
		    		$('#comment_update_ul').remove();
		    	} else{
		    		alert('다시 시도해주세요');
		    		$('#modifyContents').focus();
		    	}
		    	return;
		    }
		});	
	}
}

function all_del(){
	var cksubarr = $('input[name="check_del"]');
	
	var check =0;
	var q;
	var seq;
	
	 $(cksubarr).each(function(i){		
		 if($(this).is(":checked")){
			 var indi = cksubarr[i].value.split('/');
			 if(check == 0){
				 seq = indi[0];
				 q  = indi[1];
			 }else{
				 seq+= ','+indi[0];
				 q   += ','+indi[1];
			 }
			 check ++;	 
		 }
	 });
	 cdelete(seq,q);
}

$(document).ready(function(){
	
	/* 본문 이미지 화면 오버시 사이즈 재조절 */
	if($('.contentsBox img').length > 0){
		$('.contentsBox img').bind("click",function(e){
			clickCHk = false;
			var url = $(this).attr('src');
			$.fancybox({'href'			: 	url});
			return false;
		});
		$('.contentsBox img').attr("class", "cursor: hand");
	}
	
	$('#all_del').click(function () {//체크시 지정 감춤
		var cksubarr = $('input[name="check_del"]'); 
		if($(this).is(":checked")){
			 $(cksubarr).each(function(i){                     
			      cksubarr[i].checked = true;                     
			   });
		} else {
			$(cksubarr).each(function(i){                     
			      cksubarr[i].checked = false;                     
			   });
		}
	});
	
	
});

</script>

<article id="main_section">
	
	<div id="searchHead">
		<div class="fL" >
			<h3>${menu.menuname}</h3>
		</div>
		<div class="fR">
			<strong>조회수 : </strong>${view.HIT}
		</div>
	</div>
	<table class="tbl" border="0" cellpadding="0" cellspacing="0">
		<colgroup>
			<col width="81" />
			<col width="*" />
			<col width="81" />
			<col width="100" />
			<col width="81" />
			<col width="100" />
		</colgroup>
		<thead>
			<tr>
				<th>제목</th>
				<td><strong>${view.TITLE}</strong></td>
				<th>수정일자</th>
				<td>
					<fmt:formatDate value="${view.UPT_DATE}" pattern="yyyy/MM/dd"/>
				</td>
				<th>작성일자</th>
				<td>
					<fmt:formatDate value="${view.REG_DATE}" pattern="yyyy/MM/dd" />
				</td>
			</tr>
		</thead>
	</table>
		
	<div id="content_R">
		<div id="content">	
			<section class="main_content" >
				<div class="cBox" >
					<h3>내용</h3>
					<div class="contentsBox wBox">${view.CONTENT}</div>
					<dl class="fileDownloadBox">
						<dt>첨부파일</dt>
						<dd> 
						<c:if test="${!empty flist }">
							<c:forEach var="list" items="${flist}">
							<a href="javascript:download('${list.FILENAME}','${list.REFILENAME}','${list.PATH}');">&bull; ${list.FILENAME}</a><br/>
							</c:forEach>
						</c:if>
						<c:if test="${empty flist }">첨부파일이 없습니다.</c:if>
						</dd>
					</dl>
					<div class="boardControl">
						<a href="list?board_name=${bean.board_name}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>" class="button">목록으로</a>
						<a href="modify?board_name=${bean.board_name}&seq=${bean.seq}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>" class="button">수정하기</a>
						<a href="delete?board_name=${bean.board_name}&seq=${bean.seq}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>"  onclick="del(this.href); return false;" class="button">삭제하기</a>
						<a href="write?ref=${view.REF}&ref_level=${view.REF_LEVEL+1}&ref_step=${view.REF_STEP+1}&board_name=${bean.board_name}&seq=${bean.seq}&page=${bean.page}&pagelistno=${bean.pagelistno}<c:if test="${! empty bean.search_value }">&search_title=${bean.search_title}&search_value=${bean.search_value}</c:if>" class="button">
							답글쓰기
						</a>
					</div>
					<div class="mt_40 " id="mt_40div" style="text-align: center;">
					<!-- <form name="c_form" id="c_form" method="post" action="cinsertPro" onsubmit="return cinsert();"> -->
						<form name="c_form" id="c_form" method="post" action="cinsertPro">
								<input type="hidden" name="board_seq" id="board_seq" value="${bean.seq}">
								<input type="hidden" name="board_name" id="board_name" value="${bean.board_name}">
								<input type="hidden" name="id" id="id" value="o2i" width="100%">
								<input type="hidden" name="name" id="name" value="나나나나" width="100%">
								<input type="hidden" name="member_seq" id="member_seq" value="1" width="100%">
								<input type="hidden" name="page"           id="page" value="${bean.page }" width="100%">
								<input type="hidden" name="pagelistno"     id="pagelistno" value="${bean.pagelistno}" width="100%">
								<input type="hidden" name="seq"              id="seq" value="" width="100%">
								<input type="hidden" name="cpage"           id="cpage" value="1"> 
								<input type="hidden" name="cpagelistno"    id="cpagelistno" value="1"> 
								<%-- <input type="hidden" name="search_title"   id="csearch_title" value="${bean.search_title }"> 
								<input type="hidden" name="search_value" id="csearch_value" value="${bean.search_value }"> --%>
								<!-- 코멘트 순번 -->
								<input type="hidden" name="seq" id="seq" value="">
							
								<fieldset>
									<legend class="dpn">댓글남기기</legend>
									<textarea  name="contents"  id="contents" style="width:600px;" ></textarea> 
									<label for="contents">
										<a href="javascript:cinsert();"   class="button icon-search">등록</a>
									</label>
								</fieldset>
						</form> 
					</div>
					
					<div class="commentBox" id="commentDivArea">
						<c:if test="${! empty clist}">
							<ul >
								<li class="ui-state-default ui-corner-all">
									전체선택: <input type="checkbox" name="all_del" id="all_del" >
									<a href="#none" onclick="all_del(); return false;">[삭제] </a>
								</li>
							</ul>
							<c:forEach var="list" items="${clist}">
								<c:set var="q" value="${q+1}"></c:set>
								<ul id="ul_li_${q}">
									<li class="ui-state-default ui-corner-all">
										${list.ID } / ${list.NAME }
										<strong style="color: #888; font-weight: bold;">${list.REG_ID }</strong> 
										&nbsp;
										<fmt:formatDate value="${list.REG_DATE}" pattern="yyyy/MM/dd" /> 
										&nbsp;
										<a  href="#none" onclick="cmodify(${q},${list.SEQ}); return false;">[ 수정 ]</a>
										<input type="checkbox" name="check_del" id="check_del" value="${list.SEQ}/${q}">
									</li>
									<li class="wBox" id="ul_li_content${q}">${fn:replace(list.CONTENTS, crlf, '<br>')}</li>
								</ul>
							</c:forEach>
						</c:if>
					</div>
				</div>
			</section>
		</div>
	</div>

</article>