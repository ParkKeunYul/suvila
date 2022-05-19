<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%
request.setCharacterEncoding("utf-8");
String path = request.getParameter("path");

FileInputStream fis = new FileInputStream(new File(path)); 

InputStreamReader isr = new InputStreamReader(fis,"UTF-8"); 
BufferedReader reader = new BufferedReader(isr);	

//BufferedReader reader = new BufferedReader(new FileReader(path));
StringBuilder sb = new StringBuilder();
String line;
while((line = reader.readLine())!= null){
    sb.append(line+"\n");
}
out.println(sb.toString());
%>
