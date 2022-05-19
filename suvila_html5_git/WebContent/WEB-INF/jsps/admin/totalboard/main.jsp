<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
	if("${menuInfo.m01_1}" == '01_1'){
		location.href='/admin/home/notice/list';
	}else if("${menuInfo.m01_2}" == '01_2'){
		location.href='/admin/home/faq/list';
	}else if("${menuInfo.m01_3}" == '01_3'){
		location.href='/admin/home/badata/list';
	}else if("${menuInfo.m01_4}" == '01_4'){
		location.href='/admin/home/debate/list';
	}else if("${menuInfo.m01_5}" == '01_5'){
		location.href='/admin/home/free/list';
	}else if("${menuInfo.m01_6}" == '01_6'){
		location.href='/admin/home/data/list';
	}
</script>
