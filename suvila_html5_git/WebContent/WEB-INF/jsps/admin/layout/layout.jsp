<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"
%><%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"
%><%@taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<!DOCTYPE HTML>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

	<title>${menu.title}</title>
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/assets/admin/js/jquery/datepicker.js"></script>
	<script type="text/javascript" src="/assets/admin/js/jquery/jquery.ui.datepicker-ko.js"></script>
	<script type="text/javascript" src="/assets/admin/js/jquery/jquery-ui-1.10.2.custom/js/jquery-ui-1.10.2.custom.min.js"></script>
	<script type="text/javascript" src="/assets/admin/js/jquery/jquery.cookie.min.js"></script>
	
	<script type="text/javascript" src="/assets/admin/js/setting.js"></script>
	<script type="text/javascript" src="/assets/admin/js/validation.js"></script>
	
</head>
<body>
<div id="Wrap"> 
    <header id="headerWrap">
		<t:insertAttribute name="header" />
	</header>
		<t:insertAttribute name="body" />
	<footer id="footerWrap">
		<t:insertAttribute name="footer" />
	</footer>
		
</div>
</body>
</html>