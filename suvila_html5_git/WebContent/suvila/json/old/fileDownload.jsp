<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="java.io.*"%>
<%@ page import="java.text.*" %>
<%@ page import="java.lang.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%
request.setCharacterEncoding("UTF-8");
String path = request.getParameter("path");
String fileName = request.getParameter("fileName");
InputStream in = null;
OutputStream os = null;
File file = null;
boolean skip = false;
String client = "";
try{

    try{
        file = new File(path, fileName);
        in = new FileInputStream(file);
    }catch(FileNotFoundException fe){
        skip = true;
    }

    client = request.getHeader("User-Agent");

    // 파일 다운로드 헤더 지정
    response.reset() ;
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Description", "JSP Generated Data");
    if(!skip){
        System.out.println("여기");
        // IE
        if(client.indexOf("MSIE") != -1){
            response.setHeader ("Content-Disposition", "attachment; fileName="+new String(fileName.getBytes("KSC5601"),"ISO8859_1"));
        }else{
            System.out.println("여기1");
            // 한글 파일명 처리
            fileName = new String(fileName.getBytes("utf-8"),"iso-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
        } 
        response.setHeader ("Content-Length", ""+file.length() );
        os = response.getOutputStream();
        System.out.println("여기2");
        byte b[] = new byte[(int)file.length()];
        int leng = 0;
        while( (leng = in.read(b)) > 0 ){
        System.out.println("여기3");
            os.write(b,0,leng);
        }
    }else{
        response.setContentType("text/html;charset=UTF-8");
    %>
    {
        "success":false,
        "msg":"파일을 찾을 수 없습니다."
    }
    <%
    }
    in.close();
    os.close();
}catch(Exception e){
%>
    {
        "success":false,
        "msg":"파일 다운로드 오류 <%=e.toString()%>"
    }
<%
}
%>