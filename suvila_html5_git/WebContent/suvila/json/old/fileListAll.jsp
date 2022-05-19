
<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>


<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Arrays" %>
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
boolean isComma = false;
boolean isComma1 = false;
boolean isComma2 = false;
boolean isComma3 = false;
boolean isComma4 = false;
boolean isComma5 = false;
boolean isComma6 = false;
boolean isComma7 = false;
boolean isExistFolder = false;
for( int a = 0 ; a<l_Folders.size() ; a++ ){
    isExistFolder = true;
    isComma = true;
    isComma1 = false;
    isComma2 = false;
    isComma3 = false;
    isComma4 = false;
    isComma5 = false;
    isComma6 = false;
    isComma7 = false;
    
	if(a !=0){
		sb.append(",{\n");
	}
    else {
        sb.append("    {\n");
    }
	String folderName = l_Folders.elementAt(a).toString();
	sb.append("        name:'" + folderName + "',\n");
	sb.append("        url:'ExFrm." + folderName + "',\n");
    sb.append("        path:'" + folderName + "',\n");
    sb.append("        pathBf:'',\n");
    sb.append("        type:'app',");
	sb.append("        leaf:false,\n");
	sb.append("        children:[\n");
	
	Vector l_Files1 = new Vector(); 
	Vector l_Folders1 = new Vector();
	GetDirectory(path + folderName , l_Files1, l_Folders1);
	for( int a1 = 0 ; a1<l_Folders1.size() ; a1++ ){
		String folderName1 = l_Folders1.elementAt(a1).toString();
        isComma1 = true;
        isComma2 = false;
        if(a1 !=0){
            sb.append(",{\n");
        }
        else {
            sb.append("        {\n");
        }
		sb.append("            name:'" + folderName1 + "',\n");
		sb.append("            url:'ExFrm." + folderName + "." +  folderName1 + "',\n");
        sb.append("            path:'" + folderName + "/" + folderName1 + "',\n");
        sb.append("            pathBf:'" + folderName + "',\n");
        sb.append("            type:'app',");
		sb.append("            leaf:false,\n");
		sb.append("            children:[\n");
		Vector l_Files2 = new Vector(); 
		Vector l_Folders2 = new Vector();
		GetDirectory(path + folderName + "/" + folderName1 , l_Files2, l_Folders2);
		for (int a2 = 0; a2 < l_Folders2.size(); a2++) {
			String folderName2 = l_Folders2.elementAt(a2).toString();
            isComma2 = true;
            if(a2 !=0){
                sb.append(",{\n");
            }
            else {
                sb.append("            {\n");
            }
			sb.append("                name:'" + folderName2 + "',\n");
			sb.append("                url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "',\n");
            sb.append("                path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "',\n");
            sb.append("                pathBf:'" + folderName + "/" + folderName1 + "',\n");
            sb.append("                type:'app',");
			sb.append("                leaf:false,\n");
			sb.append("                children:[\n");
			Vector l_Files3 = new Vector(); 
			Vector l_Folders3 = new Vector();
			GetDirectory(path + folderName + "/" + folderName1 + "/" + folderName2 , l_Files3, l_Folders3);
            // 추가분
            for (int a3 = 0; a3 < l_Folders3.size(); a3++) {
                String folderName3 = l_Folders3.elementAt(a3).toString();
                isComma3 = true;
                if(a3 !=0){
                    sb.append(",{\n");
                }
                else {
                    sb.append("            {\n");
                }
                sb.append("                name:'" + folderName3 + "',\n");
                sb.append("                url:'ExFrm." + folderName + "." + folderName1 + "." + folderName2 + "." + folderName3 + "',\n");
                sb.append("                path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 + "',\n");
                sb.append("                pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "',\n");
                sb.append("                type:'app',");
                sb.append("                leaf:false,\n");
                sb.append("                children:[\n");
                // 다음단계
                Vector l_Files4 = new Vector(); 
                Vector l_Folders4 = new Vector();
                GetDirectory(path + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 , l_Files4, l_Folders4);
                // 추가분
                for (int a4 = 0; a4 < l_Folders4.size(); a4++) {
                    String folderName4 = l_Folders4.elementAt(a4).toString();
                    isComma4 = true;
                    if(a4 !=0){
                        sb.append(",{\n");
                    }
                    else {
                        sb.append("            {\n");
                    }
                    sb.append("                name:'" + folderName4 + "',\n");
                    sb.append("                url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3  + "." + folderName4 + "',\n");
                    sb.append("                path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3  + "/" + folderName4  + "',\n");
                    sb.append("                pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3  + "',\n");
                    sb.append("                type:'app',");
                    sb.append("                leaf:false,\n");
                    sb.append("                children:[\n");


                    // 다음단계
                    Vector l_Files5 = new Vector(); 
                    Vector l_Folders5 = new Vector();
                    GetDirectory(path + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 + "/" + folderName4 , l_Files5, l_Folders5);
                    // 추가분
                    for (int a5 = 0; a5 < l_Folders5.size(); a5++) {
                        String folderName5 = l_Folders5.elementAt(a5).toString();
                        isComma5 = true;
                        if(a5 !=0){
                            sb.append(",{\n");
                        }
                        else {
                            sb.append("            {\n");
                        }
                        sb.append("                name:'" + folderName5 + "',\n");
                        sb.append("                url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3  + "." + folderName4 + "." + folderName5 + "',\n");
                        sb.append("                path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3  + "/" + folderName4  + "/" + folderName5 + "',\n");
                        sb.append("                pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 + "/" + folderName4  + "',\n");
                        sb.append("                type:'app',");
                        sb.append("                leaf:false,\n");
                        sb.append("                children:[\n");
                        // 파일일 들어갈곳...
                        
                        // 다음단계
                        Vector l_Files6 = new Vector(); 
                        Vector l_Folders6 = new Vector();
                        GetDirectory(path + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 + "/" + folderName4 + "/" + folderName5 , l_Files6, l_Folders6);
                        // 추가분
                        for (int a6 = 0; a6 < l_Folders6.size(); a6++) {
                            String folderName6 = l_Folders5.elementAt(a6).toString();
                            isComma6 = true;
                            if(a6 !=0){
                                sb.append(",{\n");
                            }
                            else {
                                sb.append("            {\n");
                            }
                            sb.append("                name:'" + folderName6 + "',\n");
                            sb.append("                url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3  + "." + folderName4 + "." + folderName5 + "." + folderName6 + "',\n");
                            sb.append("                path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3  + "/" + folderName4  + "/" + folderName5  + "/" + folderName6 + "',\n");
                            sb.append("                pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" + folderName3 + "/" + folderName4 + "/" + folderName5  + "',\n");
                            sb.append("                type:'app',");
                            sb.append("                leaf:false,\n");
                            sb.append("                children:[\n");
                            // 파일일 들어갈곳...
                            sb.append("]\n");
                            sb.append("                }");		
                        }
                        
                        for (int a6 = 0; a6 < l_Files6.size(); a6++) {
                            if(a6 !=0){
                                sb.append(",{\n");
                            }
                            else {
                                sb.append("                {\n");
                            }
                            String fileName6 = l_Files6.elementAt(a6).toString().replace(".js", ""); 
                            //System.out.println("a6" + a6 + "," + fileName6);
                            sb.append("                        name:'" + l_Files5.elementAt(a6).toString() + "',\n");
                            sb.append("                        url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3 + "." + folderName4 + "." + folderName5 + "." + fileName6 + "',\n");
                            sb.append("                        path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "/" +  folderName4 + "/" +  folderName5 + "/" +  fileName6 + "',\n");
                            sb.append("                        pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "/" +  folderName4 + "/" +  folderName5 + "',\n");
                            sb.append("                        type:'app',");
                            sb.append("                        leaf:true\n");
                            sb.append("                    }");
                        }
                        // 다음단계                        
                        
                        
                        sb.append("]\n");
                        sb.append("                }");		
                    }
                    // 추가분
                    for (int a5 = 0; a5 < l_Files5.size(); a5++) {
                        if(a5 !=0){
                            sb.append(",{\n");
                        }
                        else {
                            sb.append("                {\n");
                        }
                        String fileName5 = l_Files5.elementAt(a5).toString().replace(".js", ""); 
                        //System.out.println("a5" + a5 + "," + fileName5);
                        sb.append("                        name:'" + l_Files5.elementAt(a5).toString() + "',\n");
                        sb.append("                        url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3 + "." + folderName4 + "." + fileName5 + "',\n");
                        sb.append("                        path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "/" +  folderName4 + "/" +  fileName5 + "',\n");
                        sb.append("                        pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "/" +  folderName4 + "',\n");
                        sb.append("                        type:'app',");
                        sb.append("                        leaf:true\n");
                        sb.append("                    }");
                    }
                    // 다음단계

                    sb.append("]\n");
                    sb.append("                }");		
                }
                // 추가분
                for (int a4 = 0; a4 < l_Files4.size(); a4++) {
                    if(a4 !=0){
                        sb.append(",{\n");
                    }
                    else {
                        sb.append("                {\n");
                    }
                    String fileName4 = l_Files4.elementAt(a4).toString().replace(".js", ""); 
                    //System.out.println("a4" + a4 + "," + fileName4);
                    sb.append("                        name:'" + l_Files4.elementAt(a4).toString() + "',\n");
                    sb.append("                        url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + folderName3 + "." + fileName4 + "',\n");
                    sb.append("                        path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "/" +  fileName4 + "',\n");
                    sb.append("                        pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  folderName3 + "',\n");
                    sb.append("                        type:'app',");
                    sb.append("                        leaf:true\n");
                    sb.append("                    }");
                }
                // 다음단계
                sb.append("]\n");
                sb.append("                }");		
            }
            // 추가분
			for (int a3 = 0; a3 < l_Files3.size(); a3++) {
				if(a3 !=0){
                    sb.append(",{\n");
                }
                else {
                    sb.append("                {\n");
                }
				String fileName3 = l_Files3.elementAt(a3).toString().replace(".js", ""); 
				//System.out.println("a3" + a3 + "," + fileName3);
				sb.append("                        name:'" + l_Files3.elementAt(a3).toString() + "',\n");
				sb.append("                        url:'ExFrm." + folderName + "." +  folderName1 + "." + folderName2 + "." + fileName3 + "',\n");
				sb.append("                        path:'" + folderName + "/" + folderName1 + "/" + folderName2 + "/" +  fileName3 + "',\n");
                sb.append("                        pathBf:'" + folderName + "/" + folderName1 + "/" + folderName2 + "',\n");
				sb.append("                        type:'app',");
                sb.append("                        leaf:true\n");
				sb.append("                    }");
			}
            sb.append("]\n");
            sb.append("                }");		
		}
		for (int a2 = 0; a2 < l_Files2.size(); a2++) {
			if(a2 !=0 || isComma2 == true){
                sb.append(",{\n");
            }
            else {
                sb.append("            {\n");
            }
			String fileName2 = l_Files2.elementAt(a2).toString().replace(".js", ""); 
			//System.out.println("a2" + a2 + "," + fileName2);
			sb.append("                name:'" + l_Files2.elementAt(a2) + "',\n");
			sb.append("                url:'ExFrm." + folderName + "." +  folderName1 + "." + fileName2 + "',\n");
			sb.append("                path:'" + folderName + "/" + folderName1 + "/"+ fileName2 + "',\n");
            sb.append("                pathBf:'" + folderName + "/" + folderName1 + "',\n");
			sb.append("                type:'app',");
            sb.append("                leaf:true\n");
			sb.append("            }");
		}
		sb.append("]\n");
		sb.append("        }");		
	}
	for (int a1 = 0; a1 < l_Files1.size(); a1++) {
		if(a1 !=0 || isComma1 == true){
            sb.append(",{\n");
        }
        else {
            sb.append("        {\n");
        }
		String fileName1 = l_Files1.elementAt(a1).toString().replace(".js", ""); 
		//System.out.println("a1" + a1 + "," + fileName1);
		sb.append("            name:'" + l_Files1.elementAt(a1).toString() + "',\n");
		sb.append("            url:'ExFrm." + folderName + "." + fileName1 + "',\n");
		sb.append("            path:'" + folderName + "/"+ fileName1 + "',\n");
        sb.append("            pathBf:'" + folderName + "',\n");
		sb.append("            type:'app',");
        sb.append("            leaf:true\n");
		sb.append("        }");
		
	}	
	sb.append("]\n");
	sb.append("    }");
}
//////////////////////////////////
// 서버 JSON 파일 읽기

// 애플리케이션명
//System.out.println("server가져오기");
String pathS = request.getParameter("path") + "/extra/";
Vector s_Files = new Vector(), s_Folders = new Vector();
GetDirectory(pathS, s_Files, s_Folders);
boolean isSComma = false;
boolean isSComma1 = false;
boolean isSComma2 = false;
boolean isSComma3 = false;
boolean isSComma4 = false;
boolean isSComma5 = false;
for( int s = 0; s < s_Folders.size(); s++ ){
    isSComma = true;
    isSComma1 = false;
    isSComma2 = false;
    isSComma3 = false;
    isSComma4 = false;
    isSComma5 = false;
	if(s !=0){
		sb.append(",{\n");
	}
    else {
        sb.append("     ,{\n");
    }
	String folderNameS = s_Folders.elementAt(s).toString();
	sb.append("        name:'" + folderNameS + "',\n");
	sb.append("        url:'ExFrm." + folderNameS + "',\n");
    sb.append("        path:'" + folderNameS + "',\n");
    sb.append("        pathBf:'',\n");
    sb.append("        type:'server',");
	sb.append("        leaf:false,\n");
	sb.append("        children:[\n");
	
	Vector s_Files1 = new Vector(); 
	Vector s_Folders1 = new Vector();
   // System.out.println("1::" + pathS + folderNameS );
	GetDirectory(pathS + folderNameS , s_Files1, s_Folders1);
	for( int s1 = 0 ; s1 < s_Folders1.size() ; s1++ ){
		String folderNameS1 = s_Folders1.elementAt(s1).toString();
        isSComma1 = true;
        isSComma2 = false;
        isSComma3 = false;
        isSComma4 = false;
        isSComma5 = false;
        if(s1 !=0){
            sb.append(",{\n");
        }
        else {
            sb.append("        {\n");
        }
		sb.append("            name:'" + folderNameS1 + "',\n");
		sb.append("            url:'ExFrm." + folderNameS + "." +  folderNameS1 + "',\n");
        sb.append("            path:'" + folderNameS + "/" + folderNameS1 + "',\n");
        sb.append("            pathBf:'" + folderNameS + "',\n");
        sb.append("            type:'server',");
		sb.append("            leaf:false,\n");
		sb.append("            children:[\n");
		Vector s_Files2 = new Vector(); 
		Vector s_Folders2 = new Vector();
        //System.out.println("2::" + pathS + folderNameS + "/" + folderNameS1);
		GetDirectory(pathS + folderNameS + "/" + folderNameS1 , s_Files2, s_Folders2);
		for (int s2 = 0; s2 < s_Folders2.size(); s2++) {
			String folderNameS2 = s_Folders2.elementAt(s2).toString();
            isSComma2 = true;
            isSComma3 = false;
            isSComma4 = false;
            isSComma5 = false;
            if(s2 !=0){
                sb.append(",{\n");
            }
            else {
                sb.append("            {\n");
            }
			sb.append("                name:'" + folderNameS2 + "',\n");
			sb.append("                url:'ExFrm." + folderNameS + "." +  folderNameS1 + "." + folderNameS2 + "',\n");
            sb.append("                path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "',\n");
            sb.append("                pathBf:'" + folderNameS + "/" + folderNameS1 + "',\n");
            sb.append("                type:'server',");
			sb.append("                leaf:false,\n");
			sb.append("                children:[\n");
			Vector s_Files3 = new Vector(); 
			Vector s_Folders3 = new Vector();
            //System.out.println("3::" + pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2);
			GetDirectory(pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 , s_Files3, s_Folders3);
            // 추가분
            for (int s3 = 0; s3 < s_Folders3.size(); s3++) {
                String folderNameS3 = s_Folders3.elementAt(s3).toString();
                isSComma3 = true;
                isSComma4 = false;
                isSComma5 = false;
                if(s3 !=0){
                    sb.append(",{\n");
                }
                else {
                    sb.append("            {\n");
                }
                sb.append("                name:'" + folderNameS3 + "',\n");
                sb.append("                url:'ExFrm." + folderNameS + "." + folderNameS1 + "." + folderNameS2 + "." + folderNameS3 + "',\n");
                sb.append("                path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "',\n");
                sb.append("                pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "',\n");
                sb.append("                type:'server',");
                sb.append("                leaf:false,\n");
                sb.append("                children:[\n");
                // 다음단계시작
                Vector s_Files4 = new Vector(); 
                Vector s_Folders4 = new Vector();
               // System.out.println("4::" + pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3);
                GetDirectory(pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2  + "/" + folderNameS3 , s_Files4, s_Folders4);
                // 추가분
                for (int s4 = 0; s4 < s_Folders4.size(); s4++) {
                    String folderNameS4 = s_Folders4.elementAt(s4).toString();
                    isSComma4 = true;
                    isSComma5 = false;
                    if(s4 !=0){
                        sb.append(",{\n");
                    }
                    else {
                        sb.append("                {\n");
                    }
                    sb.append("                    name:'" + folderNameS4 + "',\n");
                    sb.append("                    url:'ExFrm." + folderNameS + "." + folderNameS1 + "." + folderNameS2 + "." + folderNameS3 + "." + folderNameS4 + "',\n");
                    sb.append("                    path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "/" + folderNameS4 + "',\n");
                    sb.append("                    pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "',\n");
                    sb.append("                    type:'server',");
                    sb.append("                    leaf:false,\n");
                    sb.append("                    children:[\n");
                    // 다음단계
                    Vector s_Files5 = new Vector(); 
                    Vector s_Folders5 = new Vector();
                    //System.out.println("5::" + pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "/" + folderNameS4);
                    GetDirectory(pathS + folderNameS + "/" + folderNameS1 + "/" + folderNameS2  + "/" + folderNameS3  + "/" + folderNameS4, s_Files5, s_Folders5);
                    // 추가분
                    for (int s5 = 0; s5 < s_Folders5.size(); s5++) {
                        String folderNameS5 = s_Folders5.elementAt(s5).toString();
                        isSComma5 = true;
                        if(s5 !=0){
                            sb.append(",{\n");
                        }
                        else {
                            sb.append("                    {\n");
                        }
                        sb.append("                        name:'" + folderNameS5 + "',\n");
                        sb.append("                        url:'ExFrm." + folderNameS + "." + folderNameS1 + "." + folderNameS2 + "." + folderNameS3 + "." + folderNameS4 + "." + folderNameS5 + "',\n");
                        sb.append("                        path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "/" + folderNameS4 + "/" + folderNameS5 + "',\n");
                        sb.append("                        pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "/" + folderNameS4 + "',\n");
                        sb.append("                        type:'server',");
                        sb.append("                        leaf:false,\n");
                        sb.append("                        children:[\n");
                        sb.append("]\n");
                            sb.append("                        }");		
                        }
                        // 추가분
                        for (int s5 = 0; s4 < s_Files5.size(); s5++) {
                            if(s5 !=0 || isSComma5 == true){
                                sb.append(",{\n");
                            }
                            else {
                                sb.append("                        {\n");
                            }
                            String fileNameS5 = s_Files5.elementAt(s5).toString(); 
                            //System.out.println("s5" + s5 + "," + fileNameS5);
                            sb.append("                                name:'" + s_Files5.elementAt(s5).toString() + "',\n");
                            sb.append("                                url:'ExFrm." + folderNameS + "." +  folderNameS1 + "." + folderNameS2 + "." + folderNameS3  + "." + folderNameS4 + "." + fileNameS5 + "',\n");
                            sb.append("                                path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" +  folderNameS3  + "/" +  folderNameS4 + "/" +  fileNameS5 + "',\n");
                            sb.append("                                pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "/" + folderNameS4 + "',\n");
                            sb.append("                                type:'server',");
                            sb.append("                                leaf:true\n");
                            sb.append("                            }");
                        }
                    // 다음단계종료
                    sb.append("]\n");
                    sb.append("                }");		
                }
                // 추가분
                for (int s4 = 0; s4 < s_Files4.size(); s4++) {
                    if(s4 !=0 || isSComma4 == true){
                        sb.append(",{\n");
                    }
                    else {
                        sb.append("                    {\n");
                    }
                    String fileNameS4 = s_Files4.elementAt(s4).toString(); 
                    //System.out.println("s4" + s4 + "," + fileNameS4);
                    sb.append("                            name:'" + s_Files4.elementAt(s4).toString() + "',\n");
                    sb.append("                            url:'ExFrm." + folderNameS + "." +  folderNameS1 + "." + folderNameS2 + "." + folderNameS3 + "." + fileNameS4 + "',\n");
                    sb.append("                            path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" +  folderNameS3 + "/" +  fileNameS4 + "',\n");
                    sb.append("                            pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" + folderNameS3 + "',\n");
                    sb.append("                            type:'server',");
                    sb.append("                            leaf:true\n");
                    sb.append("                        }");
                }
                // 다음단계종료
                sb.append("]\n");
                sb.append("                }");		
            }
            // 추가분
			for (int s3 = 0; s3 < s_Files3.size(); s3++) {
				if(s3 !=0 || isSComma3 == true){
                    sb.append(",{\n");
                }
                else {
                    sb.append("                {\n");
                }
				String fileNameS3 = s_Files3.elementAt(s3).toString(); 
				//System.out.println("s3" + s3 + "," + fileNameS3);
				sb.append("                        name:'" + s_Files3.elementAt(s3).toString() + "',\n");
				sb.append("                        url:'ExFrm." + folderNameS + "." +  folderNameS1 + "." + folderNameS2 + "." + fileNameS3 + "',\n");
				sb.append("                        path:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "/" +  fileNameS3 + "',\n");
                sb.append("                        pathBf:'" + folderNameS + "/" + folderNameS1 + "/" + folderNameS2 + "',\n");
                sb.append("                        type:'server',");
				sb.append("                        leaf:true\n");
				sb.append("                    }");
			}
            sb.append("]\n");
            sb.append("                }");		
		}
		for (int s2 = 0; s2 < s_Files2.size(); s2++) {
			if(s2 !=0 || isSComma2 == true){
                sb.append(",{\n");
            }
            else {
                sb.append("            {\n");
            }
			String fileNameS2 = s_Files2.elementAt(s2).toString(); 
			//System.out.println("s2" + s2 + "," + fileNameS2);
			sb.append("                name:'" + s_Files2.elementAt(s2) + "',\n");
			sb.append("                url:'ExFrm." + folderNameS + "." +  folderNameS1 + "." + fileNameS2 + "',\n");
			sb.append("                path:'" + folderNameS + "/" + folderNameS1 + "/"+ fileNameS2 + "',\n");
            sb.append("                pathBf:'" + folderNameS + "/" + folderNameS1 + "',\n");
            sb.append("                type:'server',");
			sb.append("                leaf:true\n");
			sb.append("            }");
		}
		sb.append("]\n");
		sb.append("        }");		
	}
	for (int s1 = 0; s1 < s_Files1.size(); s1++) {
		if(s1 !=0 || isSComma1 == true){
            sb.append(",{\n");
        }
        else {
            sb.append("        {\n");
        }
		String fileNameS1 = s_Files1.elementAt(s1).toString(); 
		//System.out.println("s1" + s1 + "," + fileNameS1);
		sb.append("            name:'" + s_Files1.elementAt(s1).toString() + "',\n");
		sb.append("            url:'ExFrm." + folderNameS + "." + fileNameS1 + "',\n");
		sb.append("            path:'" + folderNameS + "/"+ fileNameS1 + "',\n");
        sb.append("            pathBf:'" + folderNameS + "',\n");
        sb.append("            type:'server',");
		sb.append("            leaf:true\n");
		sb.append("        }");
		
	}	
	sb.append("]\n");
	sb.append("    }");
}

if(isExistFolder== true){
    sb.append(",{");
    sb.append("            name:'Application.js',\n");
    sb.append("            url:'ExFrm.Application',\n");
    sb.append("            path:'Application.js',\n");
    sb.append("            pathBf:'',\n");
    sb.append("            type:'application',");
    sb.append("            leaf:true\n");
    sb.append("}");
    
}


//////////////////////////////////

sb.append("]\n");
sb.append("}");
out.print(sb.toString());
%>


<%!        
public void GetDirectory(String a_Path, Vector a_files, Vector a_folders) {
    File l_Directory = new File(a_Path);
    File[] l_files = l_Directory.listFiles();
    if(l_files != null && l_files.length > 0){
        Arrays.sort(l_files);
        for (int c = 0; c < l_files.length; c++) {

            if (l_files[c].isDirectory()) {
                if(l_files[c].getName().indexOf("ide") != -1){
                    continue;
                }
                if(l_files[c].getName().indexOf("base") != -1){
                    continue;
                }
                a_folders.add(l_files[c].getName());
            } else {
                if(l_files[c].getName().equals("IdeController.js")){
                    continue;
                }
                a_files.add(l_files[c].getName());
            }
        }
    }
}
%> 