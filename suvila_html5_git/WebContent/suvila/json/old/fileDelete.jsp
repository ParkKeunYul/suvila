<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="org.apache.commons.io.FileUtils"%>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
String strPath = request.getParameter("path");
String strContent = request.getParameter("content");

System.out.println("strPath:" + strPath);
String strMsg ="";
String strResult = "";
String strSuccess = "false";
String strReturn = "";


try {

    File file = new File(strPath);
    if(!file.exists()){
        // 파일이 없음
        strSuccess = "false";
        strMsg ="File is not exist.";
        throw new Exception();
    }
    if(file.isDirectory()) {
        FileUtils.deleteDirectory(file);
    }
    else {
        if(file.delete()){
        }
        else {
            strMsg = "Can not delete file.(file is used by other)";
            throw new Exception();
        }
    }
    strSuccess = "true";
    strMsg = "File is deleted";
    
}
catch(Exception exFile){
    strSuccess = "false";
    System.out.println("View:" + exFile.toString());
    if(strMsg.trim().length() == 0)
        strMsg = exFile.toString();
}

strReturn = "{'success':" + strSuccess + ", 'data':'" + strResult + "', 'msg': '" + strMsg + "'}";
out.println(strReturn.replace('\'','\"').trim());
%>


