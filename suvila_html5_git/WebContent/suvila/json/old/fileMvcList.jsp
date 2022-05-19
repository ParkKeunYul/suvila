<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
// 애플리케이션명
String path = request.getParameter("path") + "/app/";

Vector l_Files = new Vector(), l_Folders = new Vector();
GetDirectory(path, l_Files, l_Folders);

StringBuffer sb = new StringBuffer();

sb.append("{\n");
sb.append("    children:[\n");

for( int a = 0 ; a<l_Folders.size() ; a++ ){
	if(a !=0){
		sb.append("    ,");
	}
	String folderName = l_Folders.elementAt(a).toString();
	sb.append("    {\n");
	sb.append("        name:'" + folderName + "',\n");
	sb.append("        url:'ExFrm.view." + folderName + "',\n");
	sb.append("        leaf:false,\n");
	sb.append("        children:[\n");
	
	Vector l_Files1 = new Vector(); 
	Vector l_Folders1 = new Vector();
	GetDirectory(path + l_Folders.elementAt(a).toString() , l_Files1, l_Folders1);
	for (int a1 = 0; a1 < l_Files1.size(); a1++) {
		if(a1 !=0){
			sb.append("        ,");
		}
		sb.append("        {\n");
		System.out.println("a1" + a1);
		String fileName = l_Files1.elementAt(a1).toString(); 
		sb.append("            name:'" + fileName + "',\n");
		sb.append("            url:'ExFrm.view." + fileName + "',\n");
		sb.append("            path:'" + folderName + "/"+ fileName + "',\n");
		sb.append("            leaf:true\n");
		sb.append("        }\n");
	}	
	sb.append("        ]\n");
	sb.append("    }\n");
}

for (int a = 0; a < l_Files.size(); a++) {
	if(a !=0){
		sb.append("    ,");
	}
	sb.append("    {\n");
	sb.append("        name:'" + l_Folders.elementAt(a).toString() + "',\n");
	sb.append("        url:'ExFrm.view." + l_Folders.elementAt(a).toString() + "',\n");
	sb.append("        leaf:true\n");
	sb.append("    }\n");
}
sb.append("     ]\n");
sb.append("}");
out.print(sb.toString());
%>


<%!        
public void GetDirectory(String a_Path, Vector a_files, Vector a_folders) {
    File l_Directory = new File(a_Path);
    File[] l_files = l_Directory.listFiles();

    for (int c = 0; c < l_files.length; c++) {
        if (l_files[c].isDirectory()) {
            a_folders.add(l_files[c].getName());
        } else {
            a_files.add(l_files[c].getName());
        }
    }
}
%> 