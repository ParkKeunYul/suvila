<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>

<%@ page import="java.util.Iterator" %>
<%
// 애플리케이션명
String path = request.getParameter("path");
request.setCharacterEncoding("utf-8");
String serverPath = request.getParameter("serverPath");
if(serverPath != null && serverPath.trim().length() != 0){
	path = serverPath;
}
String fileName = request.getParameter("fileName");
path = path + fileName;
BufferedReader reader = new BufferedReader(new FileReader(path));
StringBuilder sb = new StringBuilder();
String line;
while((line = reader.readLine())!= null){
    sb.append(line+"\n");
}
out.println("{'success':true, 'data':'" + sb.toString() + '}');
%>
