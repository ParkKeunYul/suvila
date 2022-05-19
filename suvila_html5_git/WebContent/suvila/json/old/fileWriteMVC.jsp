<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>

<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
String strPathView = request.getParameter("pathView");
String strContentView = request.getParameter("contentView");
String strPathController =request.getParameter("pathController");
String strContentController = request.getParameter("contentController");
String strPathModel = request.getParameter("pathModel");
String strContentModel = request.getParameter("contentModel");

String strMsg ="";
String strResult = "";
String strSuccess = "false";
String strReturn = "";

try{
	try {
		File file = new File(strPathView);
		// 경로확인시작
		int tempIndex = strPathView.lastIndexOf("/");
		String strFolderPath = strPathView.substring(0, tempIndex);
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
		// 경로확인종료

		if(file.createNewFile() == false){
			// 파일이 있음
		}
		System.out.println("View파일을 만듬" + strPathView);
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strPathView), "UTF-8"));   

		bw.write(strContentView);
		bw.close();
		System.out.println("View 쓰기종료");
	}
	catch(Exception exFile){
		System.out.println("View:" + exFile.toString());
		throw exFile;
	}

	try {
		System.out.println("strContentController" + strContentController);
		if(strContentController.trim().length() > 0){
			File file = new File(strPathController);
			if(file.createNewFile() == false){
				// 파일이 있음
			}
			System.out.println("View파일을 만듬");
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strPathController), "UTF-8"));   
		
			bw.write(strContentController);
			bw.close();
			System.out.println("View 쓰기종료");
		}
	}
	catch(Exception exFile){
		System.out.println("View:" + exFile.toString());
		throw exFile;
	}

	try{
		if(strContentModel.trim().length() > 0){
			File file = new File(strPathModel);
			if(file.createNewFile() == false){
				// 파일이 있음
			}
			System.out.println("View파일을 만듬");
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strPathModel), "UTF-8"));   
		
			bw.write(strContentModel);
			bw.close();
			System.out.println("View 쓰기종료");
		}
	}
	catch(Exception exFile){
		System.out.println("View:" + exFile.toString());
		throw exFile;
	}
}
catch(Exception ex){
	System.out.println("View:" + ex.toString());
	//throw exFile;
	strSuccess = "false";
	if(strMsg == ""){
		strMsg = ex.toString();
	}
}

strSuccess = "true";
strMsg = "등록하였습니다.";


strReturn = "{'success':" + strSuccess + ", 'data':'" + strResult + "', 'msg': '" + strMsg + "'}";
out.println(strReturn.replace('\'','\"').trim());
%>


