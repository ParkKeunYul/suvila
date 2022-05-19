<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>

<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.lang.Exception" %>

<%
String strPath = request.getParameter("path");
String strContent = request.getParameter("content");

System.out.println("strPath>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:" + strPath);
String strMsg ="";
String strResult = ""; 
String strSuccess = "false";
String strReturn = "";


try {
    File file = new File(strPath);
    int tempIndex = strPath.lastIndexOf("/");
    String strFolderPath = strPath.substring(0, tempIndex);
    System.out.println("strFolderPath:" + strFolderPath);
    try{
        File f = new File(strFolderPath);
        if(!f.exists()){
            throw new Exception();
        }
    }
    catch(Exception exExist){
        strMsg = "Create Folder First [" + exExist.toString() + "]";
        throw new Exception();
    }
    if(file.createNewFile() == false){
        // 파일이 있음
    }
    System.out.println("View파일을 만듬");
    BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strPath), "UTF-8"));   
    bw.write(strContent);
    bw.close();
    System.out.println("View 쓰기종료");
    strSuccess = "true";
    strMsg = "File write.";
}
catch(Exception exFile){
    strSuccess = "false";
    System.out.println("View:" + exFile.toString());
    //throw exFile;
    if(strMsg.trim().length() == 0){
        strMsg = exFile.toString().replace("'", "");
    }

}




strReturn = "{'success':" + strSuccess + ", 'data':'" + strResult + "', 'msg': '" + strMsg + "'}";
out.println(strReturn.replace('\'','\"').trim());
%>


