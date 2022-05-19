<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
// 애플리케이션명
String path = request.getParameter("path") + "/resources/tmpljs/groupwidget/"; 

Vector l_Files = new Vector(), l_Folders = new Vector();
GetDirectory(path, l_Files, l_Folders);

StringBuffer sb = new StringBuffer();

sb.append("{\n");
sb.append("    success:true,\n");
sb.append("    msg:'',\n");
sb.append("    data:{list1:[\n");

for (int a = 0; a < l_Files.size(); a++) {

	String fileName = l_Files.elementAt(a).toString(); 
	
	if(a !=0){
		sb.append("    ,");
	}
	int index = fileName.indexOf('.');
	fileName = fileName.substring(0, index);
	
	
	sb.append("    {\n");
	sb.append("        type:'groupwidget',\n");
	sb.append("        name:'" + fileName + "',\n");
	sb.append("        url:'ExFrm.view.ide.TmplMake',\n");
	sb.append("        leaf:true\n");
	sb.append("    }\n");
}
sb.append("     ]}\n");
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