<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="commentBox" id="commentDivArea">
	<c:if test="${! empty clist}">
		<c:forEach var="list" items="${clist}">
			<ul>
				<li class="ui-state-default ui-corner-all">
					${list.ID } / ${list.NAME }
					<strong style="color: #888; font-weight: bold;"><span class="ui-icon ui-icon-carat-1-e"></span>${list.REG_ID }</strong> 
					&nbsp;${list.REG_DATE } &nbsp; 
					<a  href="#none" onclick="cdelete(${list.SEQ}); return false;">삭제 &nbsp; <span class="ui-icon ui-icon-circle-close"></span> </a>
				</li>
				<li class="wBox">${list.CONTENTS }</li>
			</ul>
		</c:forEach>
	</c:if>
</div>