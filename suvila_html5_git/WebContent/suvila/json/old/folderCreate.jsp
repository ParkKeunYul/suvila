<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>

<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
String strPath = request.getParameter("path");
System.out.println("strPath:" + strPath);
String strMsg ="";
String strResult = "";
String strSuccess = "false";
String strReturn = "";

try{

    File theDir = new File(strPath);

    if (!theDir.exists()) {
        try{
            theDir.mkdir();
            strSuccess = "true";
            strMsg = "";
        } 
        catch(SecurityException se){
            strSuccess = "false";
            strMsg = "보안오류" + se.toString();
            throw new Exception();
        }  
        catch(Exception ex){
            strSuccess = "false";
            strMsg = "오류" + ex.toString();
            throw new Exception();
        }   
    }
    else {
        strSuccess = "false";
        strMsg = "동일한 이름의 폴더가 존재합니다.";
        throw new Exception();
    }

}
catch(Exception ex){
    strSuccess = "false";
    if(strMsg.trim().length() == 0){
        strMsg = ex.toString();
    }
}
strReturn = "{'success':" + strSuccess + ", 'data':'" + strResult + "', 'msg': '" + strMsg + "'}";
out.println(strReturn.replace('\'','\"').trim());
%>


