<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.Iterator" %>
<%
// 애플리케이션명
String path = request.getParameter("path") + "\\app\\view\\";

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
	GetDirectory(path + folderName , l_Files1, l_Folders1);
	for( int a1 = 0 ; a1<l_Folders1.size() ; a1++ ){
		String folderName1 = l_Folders1.elementAt(a1).toString();
		sb.append("    {\n");
		sb.append("        name:'" + folderName1 + "',\n");
		sb.append("        url:'ExFrm.view." + folderName1 + "',\n");
		sb.append("        leaf:false,\n");
		sb.append("        children:[\n");
		Vector l_Files2 = new Vector(); 
		Vector l_Folders2 = new Vector();
		GetDirectory(path + folderName + "\\\\" + folderName1 , l_Files2, l_Folders2);
		for (int a2 = 0; a2 < l_Folders2.size(); a2++) {
			String folderName2 = l_Folders2.elementAt(a2).toString();
			sb.append("    {\n");
			sb.append("        name:'" + folderName2 + "',\n");
			sb.append("        url:'ExFrm.view." + folderName1 + "." + folderName2 + "',\n");
			sb.append("        leaf:false,\n");
			sb.append("        children:[\n");
			Vector l_Files3 = new Vector(); 
			Vector l_Folders3 = new Vector();
			GetDirectory(path + folderName + "\\\\" + folderName1 + "\\\\" + folderName2 , l_Files3, l_Folders3);
			for (int a3 = 0; a3 < l_Files3.size(); a3++) {
				if(a3 !=0){
					sb.append("        ,");
				}
				sb.append("        {\n");
				String fileName3 = l_Files3.elementAt(a3).toString().replace(".js", ""); 
				System.out.println("a3" + a3 + "," + fileName3);
				sb.append("            name:'" + fileName3 + ".js',\n");
				sb.append("            url:'ExFrm.view." + folderName + "." +  folderName1 + "." + folderName2 + "." + fileName3 + "',\n");
				sb.append("            path:'" + folderName + "\\\\" + folderName1 + "\\\\" + folderName2 + "\\\\" +  fileName3 + "',\n");
				sb.append("            leaf:true\n");
				sb.append("        }\n");
			}
		}
		for (int a2 = 0; a2 < l_Files2.size(); a2++) {
			if(a2 !=0){
				sb.append("        ,");
			}
			sb.append("        {\n");
			String fileName2 = l_Files2.elementAt(a2).toString().replace(".js", ""); 
			System.out.println("a2" + a2 + "," + fileName2);
			sb.append("            name:'" + fileName2 + ".js',\n");
			sb.append("            url:'ExFrm.view." + folderName + "." +  folderName1 + "." + fileName2 + "',\n");
			sb.append("            path:'" + folderName + "\\\\" + folderName1 + "\\\\"+ fileName2 + "',\n");
			sb.append("            leaf:true\n");
			sb.append("        }\n");
		}
		sb.append("        ]\n");
		sb.append("    }\n");		
	}
	for (int a1 = 0; a1 < l_Files1.size(); a1++) {
		if(a1 !=0){
			sb.append("        ,");
		}
		sb.append("        {\n");
		String fileName1 = l_Files1.elementAt(a1).toString().replace(".js", ""); 
		System.out.println("a1" + a1 + "," + fileName1);
		sb.append("            name:'" + fileName1 + ".js',\n");
		sb.append("            url:'ExFrm.view." + folderName + "." + fileName1 + "',\n");
		sb.append("            path:'" + folderName + "\\\\"+ fileName1 + "',\n");
		sb.append("            leaf:true\n");
		sb.append("        }\n");
		
	}	
	sb.append("        ]\n");
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