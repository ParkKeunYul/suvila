<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>

<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
String strPath = request.getParameter("path");
String strNewPath = request.getParameter("newPath");
System.out.println("strPath:" + strPath);
String strMsg ="";
String strResult = "";
String strSuccess = "false";
String strReturn = "";

System.out.println("strPath:" + strPath);
System.out.println("strNewPath:" + strNewPath);

try{ 

    File theDir = new File(strPath);
    


    if (theDir.exists()) {
        try{
            System.out.println("변경전" + System.getProperty("os.name")); 
            /*
            String osName = System.getProperty("os.name");
            if(osName.indexOf("Windows") != -1){
                strNewPath = strNewPath.replace("/", "\\\\");
            }
            */
            File theNewDir = new File(strNewPath);
            boolean result = theDir.renameTo(theNewDir);
            System.out.println("변경후===>" + result + ":" + theNewDir); 
            strSuccess = "true";
            strMsg = "";
            if(result == false){
                strMsg = "I Can not change file or folder name.";
                throw new Exception();
            }
        } 
        catch(SecurityException se){

            strSuccess = "false";
            strMsg = "Security error " + se.toString();
            throw new Exception();
        }  
        catch(Exception ex){
            strSuccess = "false";
            if(strMsg.trim().length() == 0)
                strMsg = "Error - " + ex.toString();
            throw new Exception();
        }   
    }
    else {
        strSuccess = "false";
        strMsg = "No file or folder exist.";
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


