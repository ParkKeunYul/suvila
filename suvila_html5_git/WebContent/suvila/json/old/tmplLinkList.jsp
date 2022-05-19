<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
// 애플리케이션명
String path = request.getParameter("path");

Vector l_Files = new Vector(), l_Folders = new Vector();
StringBuffer sb = new StringBuffer();
try{
	GetDirectory(path, l_Files, l_Folders);
}
catch(Exception ex){
	sb.append("{\n");
	sb.append("    success:false, ");
	sb.append("    msg:'목록을 조회할 수 없습니다.', ");
	sb.append("    children:[\n");
	sb.append("    ]\n");
	sb.append("}");
	out.print(sb.toString());
	return;
}



sb.append("{\n");
sb.append("    success:true, ");
sb.append("    msg:'조회완료', ");
sb.append("    data:{list1:[");
for (int a = 0; a < l_Files.size(); a++) {
	if(a !=0){
		sb.append("    ,");
	}
	sb.append("    {\n");
	sb.append("        name:'" + l_Files.elementAt(a).toString() + "'\n");
	sb.append("    }\n");
}
sb.append("     ]}\n");
sb.append("}");
out.print(sb.toString());
%>


<%!        
public void GetDirectory(String a_Path, Vector a_files, Vector a_folders) throws Exception{
    File l_Directory = new File(a_Path);
    File[] l_files = l_Directory.listFiles();

    for (int c = 0; c < l_files.length; c++) {
        if (l_files[c].isDirectory()) {
            a_folders.add(l_files[c].getName());
        } else {
			if (l_files[c].getName().endsWith(".link")) {	        	
            	a_files.add(l_files[c].getName());
	        }
	    }
    }
}
%> 