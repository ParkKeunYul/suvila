<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>


<%
// 애플리케이션명
request.setCharacterEncoding("utf-8");
String path = request.getParameter("path");
System.out.println(path);
try{
	FileReader f = new FileReader(path);
	out.println("{\"success\":true}");
}
catch(Exception ex){
	out.println("{\"success\":false}");
}
%>
