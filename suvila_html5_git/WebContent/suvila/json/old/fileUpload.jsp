<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.net.*,java.io.*,java.util.*,javax.naming.*" %>
<%@ page import="org.apache.commons.fileupload.DiskFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.*" %>
<%@ page import="java.io.File"%>
<%
String[] strFileName = new String[1];
strFileName[0] = "";
String strPath = "";

System.out.println("Content Type ="+request.getContentType());

 
 
DiskFileUpload fu = new DiskFileUpload();
fu.setRepositoryPath("D:/temp");

fu.setSizeMax(1000000); 
fu.setSizeThreshold(1024*100); 
fu.setHeaderEncoding(request.getCharacterEncoding());

List fileItems;
{
	fileItems = fu.parseRequest(request);
	Iterator itr = fileItems.iterator();
		
	if(itr.hasNext()) 
	{
	  	FileItem fi = (FileItem)itr.next();

	  	if(fi.isFormField()) 
	  	{
	  		if(fi.getFieldName().equals("path")){
	  			strPath = fi.getString("EUC-KR");
                System.out.println("strPath" + strPath);
	  		}
	  	}
	}
}

String strProjectId = "";
try{
	strProjectId = (String)session.getAttribute("projectId");
	if(strProjectId.trim().length() ==0){
		throw new Exception();
	}
}
catch(Exception exSession){
%>
    {
        "success":false,
        "data":{
        },
        "msg":"시간이 초과되었습니다. 다시 로그인 하십시요"
    }
<%
}
if(strPath.indexOf(strProjectId) == -1){
%>
    {
        "success":false,
        "data":{
        },
	    "msg": "접속가능한 프로젝트(<%=strProjectId%>) 경로가 아닙니다.";
    }
<%
}

//System.out.println("-----------------");
String fileName = "";
	// 폴더 생성
	String saveFolder= strPath;
    
	File dir = new File(saveFolder);
	if(!dir.exists())
	{
        // 오류처리
		dir.mkdir();
	}
	
	{
		Iterator itr = fileItems.iterator();
		System.out.println("1");
		
		while(itr.hasNext()) 
		{
			System.out.println("2");
		  	FileItem fi = (FileItem)itr.next();
		  	
		  	if(fi.isFormField()) 
		  	{
		  		System.out.println(fi.getFieldName());
		  		System.out.println(fi.getString("EUC-KR"));
		  		String fileFullName = fi.getName();
		  		System.out.println("파일명:" + fi.getName());
		  	}
			else
		  	{
		  		System.out.println("3");
				String fileFullName = fi.getName();
				//String fileName = "";
				System.out.println("파일명:" + fi.getName());
				
				//파일명과 경로 분리
				//StringTokenizer strToken = new StringTokenizer(fileFullName, "/");
				
												
				if(fileFullName == null || fileFullName.trim().length() == 0 || fileFullName.equals("null"))
				{
					break;
				}
				else
				{				
			    	System.out.println("nNAME: "+fileFullName);
			    	
			    	int S = fileFullName.lastIndexOf("/");
			    	int E = fileFullName.length();
			    	
			    	
			    	fileName = fileFullName.substring(S+1);
	
			    	strFileName[0] = fileName;
			    	System.out.println("SIZE: "+fi.getSize() + ":" + fi.getFieldName());
		
			    	File fileNew = new File(saveFolder, fileName);
			    	fi.write(fileNew);	        
			    	//fileCnt++;			
					System.out.println("파일쓰기 정상");					
				}
		  	}
		}
	}

    // 모두 성공하였다면 
    %>
    {
        "success":true,
        "data":{
            "fileName":"<%=fileName%>"
        },
        "msg":""
    }

