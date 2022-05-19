<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script>
alert('${msg}');
<c:if test="${url!='' && ! empty url}">
	location.href="${url}";
</c:if>
<c:if test="${url=='' || empty url}">
	history.back();
</c:if>
</script>
${msg}<br/>
돌아 가실려면 <a href="${url}">여기</a>를 클릭하세요.