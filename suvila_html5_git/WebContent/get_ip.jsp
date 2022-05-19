<%@page import="org.json.simple.JSONObject"%>
<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.net.InetAddress" %>
<%
/*
******************************************************* 
* <전문생성일시><서버 IP값>
*******************************************************
*/
	InetAddress inet = InetAddress.getLocalHost();	


	JSONObject jObject = new JSONObject();
	jObject.put("UserIP" , request.getRemoteAddr());
	jObject.put("MallIP"  , inet.getHostAddress());
	
	System.out.println("========== getIp==============");
	System.out.println(jObject.toJSONString());
	 
	out.println(jObject.toJSONString());
%>