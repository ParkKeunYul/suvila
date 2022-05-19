<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.*" %>
<%@ page import="java.io.*"%>
<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.parser.*" %>
<%@ page import="java.util.Iterator" %>
<%

String strReturn ="";
String strMsg ="";
String strResult = "";
String strSuccess = "false";

Connection conn = null;
Statement stmt = null;
ResultSet rs = null;

// 애플리케이션명
//String strAppName = "CardApp";
// 프로젝트 정대경로
// String strProjectPath = "C:\\tomcat8\\webapps\\ROOT\\ExtJsMaker\\project";
// 템플릿 경로
String strTemplatePath = "C:\\tomcat\\webapps\\ROOT\\Pef\\ExtIde\\template";

//try
//{
//////    Class.forName("com.mysql.jdbc.Driver");

    request.setCharacterEncoding("utf-8");
    
    String strProjectPath = request.getParameter("projectPath");
    String strAppName = request.getParameter("appName");
    String strFolderName = request.getParameter("folderName");
    String strScreenCode = request.getParameter("screenCode");
    String strScreenName = request.getParameter("screenName");
    String strOverWrite = request.getParameter("overwrite");
    String strTemplateCode = request.getParameter("templateCode");
    String strGridData1 = request.getParameter("gridData1");
    String strGridData2 = request.getParameter("gridData2");
    String strGridData3 = request.getParameter("gridData3");
    String strGridData4 = request.getParameter("gridData4");    

    String strGridPrefix1 = request.getParameter("gridPrefix1");
    String strGridPrefix2 = request.getParameter("gridPrefix2");
    String strGridPrefix3 = request.getParameter("gridPrefix3");
    String strGridPrefix4 = request.getParameter("gridPrefix4");


    int gridCount = Integer.parseInt(request.getParameter("gridCount"));

    System.out.println(strScreenCode);
    System.out.println(strScreenName);
    System.out.println(strTemplateCode);
    System.out.println(strGridData1);
    System.out.println("strOverWrite:" + strOverWrite);
    System.out.println("gridCount:" + gridCount);


    // View
    StringBuffer[] sbViewItem = new StringBuffer[4];    // 첫번째
    StringBuffer[] sbTableViewItem = new StringBuffer[4];    // 첫번째
    StringBuffer[] sbGridItem = new StringBuffer[4];
    
    // Model
    StringBuffer[] sbModelData = new StringBuffer[4];
    StringBuffer[] sbModelStoreField = new StringBuffer[4];
    StringBuffer[] sbModelStoreParam = new StringBuffer[4];   
    
    // Controller
    StringBuffer[] sbControllerSearchParam = new StringBuffer[4];
    StringBuffer[] sbControllerSearchStoreParam = new StringBuffer[4];
    StringBuffer[] sbControllerSearchTestData = new StringBuffer[4];


    StringBuffer sbControllerFormData = new StringBuffer();
    
    StringBuffer[] sbControllerSearchFromGridActionColumnParam = new StringBuffer[4];
    
    System.out.println(">>=============================================");        
    
    for(int i=0; i< gridCount; i++) {

        sbViewItem[i] = new StringBuffer();    // 두번째
        sbTableViewItem[i] = new StringBuffer();    // 두번째
        sbGridItem[i] = new StringBuffer();
        sbModelData[i] = new StringBuffer();
        sbModelStoreField[i] = new StringBuffer();
        sbModelStoreParam[i] = new StringBuffer();      
        
        sbControllerSearchParam[i] = new StringBuffer();   
        sbControllerSearchStoreParam[i] = new StringBuffer();   
        sbControllerSearchTestData[i] = new StringBuffer();  
        
        sbControllerSearchFromGridActionColumnParam[i] = new StringBuffer();
        
        
        System.out.println("::" + strGridData1);
        System.out.println("::" + strGridData2);
        System.out.println("::" + strGridData3);
        System.out.println("::" + strGridData4);
        String strGridData = "";
        String strGridPrefix = "";
        if(i==0){
            strGridData = strGridData1;
            strGridPrefix = strGridPrefix1;
        }else if(i==1){
            strGridData = strGridData2;
            strGridPrefix = strGridPrefix2;
        }else if(i==2){
            strGridData = strGridData3;
            strGridPrefix = strGridPrefix3;
        }else if(i==3){
            strGridData = strGridData4;
            strGridPrefix = strGridPrefix4;
        }
        System.out.println("_____");
        JSONParser parser = new JSONParser();
        System.out.println("_____" + i);
        Object obj= parser.parse(strGridData);
        System.out.println("_____");

             
        //System.out.println(obj.toString());
        JSONArray jsonArray = (JSONArray)obj; 
        System.out.println(">>>>>>>>>>>>>>>>>>>>" + i);
        Iterator<Object> iterator = jsonArray.iterator();
        int iteCount = 0;
        while (iterator.hasNext()) {
            System.out.println("::::" + iteCount);
            JSONObject jsonObject =(JSONObject) iterator.next();
            System.out.println(">>>" + jsonObject.get("field_name"));
            String fieldName         = (String)jsonObject.get("field_name");
            String fieldKorName     = (String)jsonObject.get("field_kor_name");
            String fieldLength         = (String)jsonObject.get("field_length");
            String fieldType         = (String)jsonObject.get("fieldType");
            String fromTo             = (String)jsonObject.get("fromTo");
            
            System.out.println("fieldType:" + fieldType);
            
            // View Items
            sbViewItem[i].append(chgViewItem(
                                strGridPrefix,
                                iteCount, 
                                fieldName, 
                                fieldKorName, 
                                fieldLength, 
                                fieldType, 
                                fromTo));
            sbTableViewItem[i].append(chgTableViewItem(
                                strGridPrefix,
                                iteCount, 
                                fieldName, 
                                fieldKorName, 
                                fieldLength, 
                                fieldType, 
                                fromTo));
            sbGridItem[i].append(chgGridItem(iteCount, 
                                fieldName, 
                                fieldKorName, 
                                fieldLength, 
                                fieldType, 
                                fromTo));    
                                
            // MODEL ==========================================================                                           
            // Model Data       
            if(iteCount !=0 )
                sbModelData[i].append(",\n        ");    
            sbModelData[i].append(strGridPrefix).append( fieldName + ":''");    
    
            // Model Store Field
            if(iteCount !=0 )
                sbModelStoreField[i].append(",");    
            //sbModelStoreField[i].append("'" + strGridPrefix + fieldName + "'");    
            sbModelStoreField[i].append("'" + fieldName + "'");    // 접두어제거
            
            // Model Param       
            if(iteCount !=0 )
                sbModelStoreParam[i].append(",\n                        ");    
            //sbModelStoreParam[i].append( strGridPrefix + fieldName + ":''");    
            sbModelStoreParam[i].append( fieldName + ":''");    // 파라미터도 접두어제거
                    
            // CONTROLLER ====================================================        
            // Controller Event    
            System.out.println(">>" + i);
            System.out.println(sbControllerSearchParam[i]);
            System.out.println(strGridPrefix);
            System.out.println(fieldName);
            
            if(iteCount !=0 )
                sbControllerSearchParam[i].append("\n        ");    
            sbControllerSearchParam[i].append("var "+ strGridPrefix + fieldName + "=  this.lookupReference('" + strGridPrefix + fieldName + "').getValue();");
            
            if(iteCount !=0 )
                sbControllerSearchStoreParam[i].append(",\n                ");    
            //sbControllerSearchStoreParam[i].append(strGridPrefix + fieldName + ":" + strGridPrefix + fieldName);            
            sbControllerSearchStoreParam[i].append( fieldName + ":" + strGridPrefix + fieldName);            
             
            // 테스트데이터
            if(iteCount !=0 )
                sbControllerSearchTestData[i].append(",");    
            sbControllerSearchTestData[i].append(fieldName + ":'" + i + "'");    

            if(iteCount !=0 )
                sbControllerSearchFromGridActionColumnParam[i].append("\n            ");    
            sbControllerSearchFromGridActionColumnParam[i].append("var "+ strGridPrefix + fieldName + "=  obj.data." + fieldName + ";");            

			// 폼 파라미터
            sbControllerFormData.append(getFormParam(
                                strGridPrefix,
                                iteCount, 
                                fieldName, 
                                fieldKorName, 
                                fieldLength, 
                                fieldType, 
                                fromTo));
               
            iteCount++;
            
            System.out.println("???"  + sbModelStoreField.toString());
        }
    }
    
    System.out.println("-----------------------------------------");
//////        conn = DriverManager.getConnection(
//////        "jdbc:mysql://127.0.0.1:3306/extjsmaker?useUnicode=true&characterEncoding=utf-8", 
//////        "root", 
//////        "1234");
//////    stmt = conn.createStatement();
    
    System.out.println("..1");
    /*
    String sql = "select screen_name from screen where screen_code= '" + strScreenCode + "'";
    
    rs= stmt.executeQuery(sql);
    System.out.println("..2");
    StringBuffer tempList = new StringBuffer();
    int i=0;
    if(rs.next()){
        //strMsg="이미존재합니다.";
        //throw new Exception();
        String sqlUpdate = "update screen set " + 
            "screen_name = '" + strScreenName + "'," + 
            "template_code = '" + strTemplateCode + "' " + 
            " WHERE screen_code = '" + strScreenCode + "' ";
        stmt.execute(sqlUpdate);        
        
    }else {
        String sqlInsert = "insert into screen(" + 
            "screen_code, screen_name, template_code, file_path, file_name) values('" + 
            strScreenCode + "','" + 
            strScreenName + "','" + 
            strTemplateCode + "','" + 
            strProjectPath + "','" + 
            strFolderName +
        "')";
        stmt.execute(sqlInsert);
    }
    */
    
    
    // View 생성
    System.out.println("View파일만들기시작");
    
    String strViewFilePath                 = strProjectPath + "\\app\\view\\" + strFolderName + "\\" + strScreenCode + ".js";
    String strModelFilePath             = strProjectPath + "\\app\\view\\" + strFolderName + "\\" + strScreenCode + "Model.js";
    String strControllerFilePath         = strProjectPath + "\\app\\view\\" + strFolderName + "\\" + strScreenCode + "Controller.js";
    
    String strViewTemplateContent         = getContents(strTemplatePath + "\\" + strTemplateCode + "_view.js");
    String strModelTemplateContent         = getContents(strTemplatePath + "\\" + strTemplateCode + "_model.js");
    String strControllerTemplateContent = getContents(strTemplatePath + "\\" + strTemplateCode + "_controller.js");
    
    System.out.println("View파일만들기:" + strViewFilePath);
    System.out.println("View템플릿:" + strViewTemplateContent);
    
    int arrayLength= 46;
    int tempGap = 10;
    String[][] strChgItem = new String[arrayLength][2];
    strChgItem[0][0] = "{@+id:appName}";    
    strChgItem[0][1] = strAppName;    
    
    strChgItem[1][0] = "{@+id:path}";    
    strChgItem[1][1] = strFolderName;    
    
    strChgItem[2][0] = "{@+id:code}";    
    strChgItem[2][1] = strScreenCode;    
    
    strChgItem[3][0] = "{@+id:title}";    
    strChgItem[3][1] = strScreenName;   
        
    strChgItem[4][0] = "{@+id:codeLowercase}";    
    strChgItem[4][1] = strScreenCode.toLowerCase();   


    strChgItem[5][0] = "{@+id:formParam}";    
    strChgItem[5][1] = sbControllerFormData.toString();        
     
    for(int i=0; i< gridCount; i++){
        strChgItem[6 + (i*tempGap)][0] = "{@+id:viewItem" + (i+1) + "}";    
        strChgItem[6 + (i*tempGap)][1] = sbViewItem[i].toString(); 
    
        strChgItem[7 + (i*tempGap)][0] = "{@+id:data" + (i+1) + "}";
        strChgItem[7 + (i*tempGap)][1] = sbModelData[i].toString(); 
    
        strChgItem[8 + (i*tempGap)][0] = "{@+id:fields" + (i+1) + "}";    
        strChgItem[8 + (i*tempGap)][1] = sbModelStoreField[i].toString(); 
    
        strChgItem[9 + (i*tempGap)][0] = "{@+id:params" + (i+1) + "}";    
        strChgItem[9 + (i*tempGap)][1] = sbModelStoreParam[i].toString();     
    
        strChgItem[10 + (i*tempGap)][0] = "{@+id:gridItem" + (i+1) + "}";    
        strChgItem[10 + (i*tempGap)][1] = sbGridItem[i].toString();
        
        strChgItem[11 + (i*tempGap)][0] = "{@+id:controllerSearchParam" + (i+1) + "}";    
        strChgItem[11 + (i*tempGap)][1] = sbControllerSearchParam[i].toString();         

        strChgItem[12 + (i*tempGap)][0] = "{@+id:controllerSearchStoreParam" + (i+1) + "}";    
        strChgItem[12 + (i*tempGap)][1] = sbControllerSearchStoreParam[i].toString();         
        
        strChgItem[13 + (i*tempGap)][0] = "{@+id:controllerSearchTestData" + (i+1) + "}";    
        strChgItem[13 + (i*tempGap)][1] = sbControllerSearchTestData[i].toString();     
        
        strChgItem[14 + (i*tempGap)][0] = "{@+id:controllerSearchFromGridActionColumnParam" + (i+1) + "}";    
        strChgItem[14 + (i*tempGap)][1] = sbControllerSearchFromGridActionColumnParam[i].toString();             

        strChgItem[15 + (i*tempGap)][0] = "{@+id:tableViewItem" + (i+1) + "}";    
        strChgItem[15 + (i*tempGap)][1] = sbTableViewItem[i].toString();    
        
    }
    for(int i=gridCount; i< 4; i++){
        strChgItem[6 + (i*tempGap)][0] = "{@+id:viewItem" + (i+1) + "}";    
        strChgItem[6 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
    
        strChgItem[7 + (i*tempGap)][0] = "{@+id:data" + (i+1) + "}";
        strChgItem[7 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
    
        strChgItem[8 + (i*tempGap)][0] = "{@+id:fields" + (i+1) + "}";    
        strChgItem[8 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
    
        strChgItem[9 + (i*tempGap)][0] = "{@+id:params" + (i+1) + "}";    
        strChgItem[9 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
    
        strChgItem[10 + (i*tempGap)][0] = "{@+id:gridItem" + (i+1) + "}";    
        strChgItem[10 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
        
        strChgItem[11 + (i*tempGap)][0] = "{@+id:controllerSearchParam" + (i+1) + "}";    
        strChgItem[11 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 

        strChgItem[12 + (i*tempGap)][0] = "{@+id:controllerSearchStoreParam" + (i+1) + "}";    
        strChgItem[12 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
        
        strChgItem[13 + (i*tempGap)][0] = "{@+id:controllerSearchTestData" + (i+1) + "}";    
        strChgItem[13 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★"; 
        
        strChgItem[14 + (i*tempGap)][0] = "{@+id:controllerSearchFromGridActionColumnParam" + (i+1) + "}";    
        strChgItem[14 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★";     
        
        strChgItem[15 + (i*tempGap)][0] = "{@+id:tableViewItem" + (i+1) + "}";    
        strChgItem[15 + (i*tempGap)][1] = "변환 오류임★★★★★★★★★★★";                     
    }
    try {
        File file = new File(strViewFilePath);
        if(file.createNewFile() == false){
            // 파일이 있음
        }
        System.out.println("View파일을 만듬");
        //BufferedWriter bw = new BufferedWriter(new FileWriter(strViewFilePath,"UTF-8"));   
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strViewFilePath), "UTF-8"));   
        
        
        for(int i=0; i< arrayLength; i++){
            strViewTemplateContent = strViewTemplateContent.replace(strChgItem[i][0],strChgItem[i][1]);
        }     
        bw.write(strViewTemplateContent);
          bw.close();
          System.out.println("View 쓰기종료");
    }
    catch(Exception exFile){
        System.out.println("View:" + exFile.toString());
        throw exFile;
    }

    // ViewModel 생성
    try {
        File file = new File(strModelFilePath);
        if(file.createNewFile() == false){
            // 파일이 있음
        }
        System.out.println("Model파일을 만듬");
        //BufferedWriter bw = new BufferedWriter(new FileWriter(strModelFilePath,"UTF-8"));   
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strModelFilePath), "UTF-8"));
        for(int i=0; i< arrayLength; i++){
            strModelTemplateContent = strModelTemplateContent.replace(strChgItem[i][0],strChgItem[i][1]);
        }             
        bw.write(strModelTemplateContent);
          bw.close();
          System.out.println("Model 쓰기종료");
    }
    catch(Exception exFile){
        System.out.println("Model:" +exFile.toString());
        throw exFile;
    }
       
    // ViewController 새성
    try {
        File file = new File(strControllerFilePath);
        if(file.createNewFile() == false){
            // 파일이 있음
        }
        System.out.println("Controller파일을 만듬");
        //BufferedWriter bw = new BufferedWriter(new FileWriter(strControllerFilePath,"UTF-8"));  
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(strControllerFilePath), "UTF-8"));
         
        for(int i=0; i< arrayLength; i++){
            strControllerTemplateContent = strControllerTemplateContent.replace(strChgItem[i][0],strChgItem[i][1]);
        } 
        bw.write(strControllerTemplateContent);
          bw.close();
          System.out.println("View 쓰기종료");
    }
    catch(Exception exFile){
        System.out.println("Controller:" + exFile.toString());
        throw exFile;
    }      

    strSuccess = "true";
    strMsg = "등록하였습니다.";
/*    
}
catch(Exception ex)
{
    System.out.println(ex.toString());
    //throw ex;
    if(strMsg.trim().length() == 0){
        strMsg = ex.toString();
    }
}
finally
{
    try{ rs.close();}catch(Exception exRs){}
    try{ stmt.close();}catch(Exception exStmt){}
    try{ conn.close();}catch(Exception exConn){}
}

*/

strReturn = "{'success':" + strSuccess + ", 'data':'" + strResult + "', 'msg': '" + strMsg + "'}";
out.println(strReturn.replace('\'','\"').trim());
%>
<%!
public static String getContents(String file){
    StringBuffer strReturn = new StringBuffer();
    
    try{
        BufferedReader bf = new BufferedReader(new FileReader(file));
        String line="";
        while((line = bf.readLine())!= null){

            strReturn.append(line).append("\n");
            
        }
        //strReturn.append(bf.read());
        bf.close();
    }
    catch(Exception exFile){
        System.out.println("에러");
        System.out.println(exFile.toString());
    }
    finally{
        
    }
    return strReturn.toString();
}

public static String getFormParam( String strGridPrefix,
                                   int iteCount, 
                                   String fieldName, 
                                   String fieldKorName, 
                                   String fieldLength, 
                                   String fieldType, 
                                   String fromTo){
	StringBuffer sb1 = new StringBuffer();  
	String fieldNameChg = fieldName; 
	if(fieldName.length() > 1){
		fieldNameChg = fieldName.substring(0,1).toUpperCase() + fieldName.substring(1);
	}
	sb1.append("    this.lookupReferenece('")
	   .append(strGridPrefix)
	   .append(fieldNameChg).append("').setValue(obj.test.")
	   .append(fieldName).append(");	// ")
	   .append(fieldKorName)
	   .append("\n");
	return sb1.toString();
}

public static String chgViewItem( String strGridPrefix,
                                       int iteCount, 
                                       String fieldName, 
                                      String fieldKorName, 
                                      String fieldLength, 
                                      String fieldType, 
                                      String fromTo){
    
    StringBuffer sb1 = new StringBuffer();    
    if(iteCount != 0 )
        sb1.append(",\n            ");
        
    if(fieldType.equals("텍스트")){
        if(fromTo.equals("Y")){ 
            sb1.append("{\n")
              .append("            layout:'hbox', \n")
              .append("                items:[{ ")
              .append("                    xtype:'extextfield', \n")
              .append("                    fieldLabel:'").append(fieldKorName).append("',\n")
              .append("                    labelAlign:'right',\n")
              .append("                    name:'").append(strGridPrefix).append(fieldName).append("From',\n")
              .append("                    reference:'").append(strGridPrefix).append(fieldName).append("From',\n")
              .append("                    maxlength:").append(fieldLength).append(", \n")
              .append("                },{html:'~'},{\n")
              .append("                    xtype:'extextfield', \n")
              .append("                    labelAlign:'right',\n")
              .append("                    name:'").append(strGridPrefix).append(fieldName).append("To',\n")
              .append("                    reference:'").append(strGridPrefix).append(fieldName).append("To',\n")
              .append("                    maxlength:").append(fieldLength).append(", \n")
              .append("                }] \n")
              .append("            }");               
        } else {
            sb1.append("{\n")
              .append("                xtype:'extextfield', \n")
              .append("                fieldLabel:'").append(fieldKorName).append("',\n")
              .append("                labelAlign:'right',\n")
              .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
              .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
              .append("                maxlength:").append(fieldLength).append(", \n")
              .append("            }");
        }
    } else if(fieldType.equals("텍스트(알파벳,숫자)")){
        
        sb1.append("{\n")
          .append("                xtype:'extextfield', \n")
          .append("                vtype:'alphanumeric', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    } else if(fieldType.equals("텍스트(알파벳)")){
        sb1.append("{\n")
          .append("                xtype:'extextfield', \n")
          .append("                vtype:'alpha', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("텍스트(이메일)")){
        sb1.append("{\n")
          .append("                xtype:'extextfield', \n")
          .append("                vtype:'email', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("텍스트(url)")){
        sb1.append("{\n")
          .append("                xtype:'extextfield', \n")
          .append("                vtype:'url', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("날짜")){
        if(fromTo.equals("Y")){ 
            sb1.append("{\n")
              .append("            layout:'hbox', \n")
              .append("                items:[{ ")
              .append("                    xtype:'exdatefield', \n")
              .append("                    format:'Y-m-d', \n")
              .append("                    fieldLabel:'").append(fieldKorName).append("',\n")
              .append("                    labelAlign:'right',\n")
              .append("                    name:'").append(strGridPrefix).append(fieldName).append("From',\n")
              .append("                    reference:'").append(strGridPrefix).append(fieldName).append("From' \n")
              .append("                },{html:'~'},{\n")
              .append("                    xtype:'exdatefield', \n")
              .append("                    format:'Y-m-d', \n")
              .append("                    labelAlign:'right',\n")
              .append("                    name:'").append(strGridPrefix).append(fieldName).append("To',\n")
              .append("                    reference:'").append(strGridPrefix).append(fieldName).append("To' \n")
              .append("                }] \n")
              .append("            }");               
        } else {    	
	        sb1.append("{\n")
	          .append("                xtype:'exdatefield', \n")
	          .append("                format:'Y-m-d', \n")
	          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
	          .append("                labelAlign:'right',\n")
	          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
	          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
	          .append("                maxlength:").append(fieldLength).append(", \n")
          	  .append("            }");            
        }
    }else if(fieldType.equals("시간")){
        sb1.append("{\n")
          .append("                xtype:'timefield', \n")
          .append("                //format:'Y-m-d', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("텍스트(조회)")){
        sb1.append("{\n")
          .append("                xtype:'searchfield', \n")
          .append("                //format:'Y-m-d', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("숫자")){
        sb1.append("{\n")
          .append("                xtype:'numberfield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("콤보박스")){
        sb1.append("{\n")
          .append("                xtype:'excombobox', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                displayField: 'name',\n")
          .append("                valueField: 'value',\n")
          .append("                store:{\n")
          .append("                    fields:['name','value'],\n")
          .append("                    data:[\n")
          .append("                        {'name':'test1', 'value':'test1'},\n")
          .append("                        {'name':'test2', 'value':'test2'}\n")
          .append("                    ]\n")
          .append("                },\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
                   
    }else if(fieldType.equals("체크박스")){
        sb1.append("{\n")
          .append("                xtype:'fieldcontainer', \n")
          .append("                defaultType: 'checkboxfield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                items:[   \n")
          .append("                {   \n")
          .append("                    boxLabel:'check1',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'check1' ,\n")
          .append("                },{   \n")
          .append("                    boxLabel:'check2',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'check2' ,\n")
          .append("                },{   \n")
          .append("                    boxLabel:'check3',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'check3' ,\n")
          .append("                }]   \n")
          .append("            }");            
    }else if(fieldType.equals("라디오")){
        sb1.append("{\n")
          .append("                xtype:'fieldcontainer', \n")
          .append("                defaultType: 'radiofield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                items:[   \n")
          .append("                {   \n")
          .append("                    boxLabel:'radio1',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'radio1' ,\n")
          .append("                },{   \n")
          .append("                    boxLabel:'radio2',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'radio2' ,\n")
          .append("                },{   \n")
          .append("                    boxLabel:'radio3',   \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    inputValue:'radio3' ,\n")
          .append("                }]   \n")
          .append("            }");           
    }else if(fieldType.equals("스피너")){
        sb1.append("{\n")
          .append("                xtype:'spinnerfield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                step:1,\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("텍스트영역")){
        sb1.append("{\n")
          .append("                xtype:'textarea', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }   
    else if(fieldType.equals("파일")){
        sb1.append("{\n")
          .append("                xtype:'filefield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");                      
    }else if(fieldType.equals("히든")){
        sb1.append("{\n")
          .append("                xtype:'hiddenfield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }else if(fieldType.equals("태그")){
        sb1.append("{\n")
          .append("                xtype:'tagfield', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("                displayField: 'name',\n")
          .append("                valueField: 'value',\n")
          .append("                store:{\n")
          .append("                    fields:['name','value'],\n")
          .append("                    data:[\n")
          .append("                        {'name':'test1', 'value':'test1'},\n")
          .append("                        {'name':'test2', 'value':'test2'}\n")
          .append("                    ]\n")
          .append("                },\n")          
          .append("            }");            
    }else if(fieldType.equals("HTML에디터")){
        sb1.append("{\n")
          .append("                xtype:'htmleditor', \n")
          .append("                fieldLabel:'").append(fieldKorName).append("',\n")
          .append("                labelAlign:'right',\n")
          .append("                name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                maxlength:").append(fieldLength).append(", \n")
          .append("            }");            
    }
    return sb1.toString();
}

public static String chgTableViewItem( String strGridPrefix,
                                        int iteCount, 
                                        String fieldName, 
                                       String fieldKorName, 
                                       String fieldLength, 
                                       String fieldType, 
                                       String fromTo){
    StringBuffer sb2 = new StringBuffer();    
    if(iteCount != 0 )
        sb2.append(",\n            ");
       
    if(fieldType.equals("텍스트")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'extextfield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("'\n")
          .append("                }]\n")
          .append("            }");
    } 
    else if(fieldType.equals("텍스트(알파벳,숫자)")){

        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")  
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")                   
          .append("                xtype:'extextfield', \n")
          .append("                    vtype:'alphanumeric', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")
          .append("            }");  
         
    } 
    else if(fieldType.equals("텍스트(알파벳)")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")          
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                xtype:'extextfield', \n")
          .append("                    vtype:'alpha', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")         
          .append("            }");  
                    
    }else if(fieldType.equals("텍스트(이메일)")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")          
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                xtype:'extextfield', \n")
          .append("                    vtype:'email', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")          
          .append("            }");  
                    
    }else if(fieldType.equals("텍스트(url)")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")         
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'extextfield', \n")
          .append("                    vtype:'url', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]\n")         
          .append("            }");  
              
    }else if(fieldType.equals("날짜")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("' \n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'exdatefield', \n")
          .append("                    format:'Y-m-d', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")          
          .append("            }");  
                    
    }else if(fieldType.equals("시간")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("' \n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'timefield', \n")
          .append("                    //format:'Y-m-d', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]")         
          .append("            }");  
                    
    }else if(fieldType.equals("텍스트(조회)")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'searchfield', \n")
          .append("                    //format:'Y-m-d', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]")          
          .append("            }");   
                   
    }else if(fieldType.equals("숫자")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'numberfield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]")          
          .append("            }");   
                   
    }else if(fieldType.equals("콤보박스")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'excombobox', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    displayField: 'name',\n")
          .append("                    valueField: 'value',\n")
          .append("                    store:{\n")
          .append("                        fields:['name','value'],\n")
          .append("                        data:[\n")
          .append("                            {'name':'test1', 'value':'test1'},\n")
          .append("                            {'name':'test2', 'value':'test2'}\n")
          .append("                        ]\n")
          .append("                    },\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")       
          .append("            }");            
                   
    }else if(fieldType.equals("체크박스")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'fieldcontainer', \n")
          .append("                    defaultType: 'checkboxfield', \n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    items:[   \n")
          .append("                    {   \n")
          .append("                        boxLabel:'check1',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'check1' ,\n")
          .append("                    },{   \n")
          .append("                        boxLabel:'check2',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'check2' ,\n")
          .append("                    },{   \n")
          .append("                        boxLabel:'check3',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'check3' ,\n")
          .append("                    }]   \n")
          .append("                }]\n")         
          .append("            }");            
    }else if(fieldType.equals("라디오")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("' \n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'fieldcontainer', \n")
          .append("                    defaultType: 'radiofield', \n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    items:[   \n")
          .append("                    {   \n")
          .append("                        boxLabel:'radio1',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'radio1' ,\n")
          .append("                    },{   \n")
          .append("                        boxLabel:'radio2',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'radio2' ,\n")
          .append("                    },{   \n")
          .append("                        boxLabel:'radio3',   \n")
          .append("                        name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                        inputValue:'radio3' ,\n")
          .append("                    }]   \n")
          .append("                    }]\n")      
          .append("            }");           
    }else if(fieldType.equals("스피너")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'spinnerfield', \n")
          .append("                    step:1,\n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]\n")          
          .append("            }");            
    }else if(fieldType.equals("텍스트영역")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'textarea', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]\n")        
          .append("            }");            
    }   
    else if(fieldType.equals("파일")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'filefield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append("\n")
          .append("                }]\n")          
          .append("            }");                      
    }else if(fieldType.equals("파일멀티")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("', \n")
          .append("                items:[{\n")
          .append("                    xtype:'exfilemultifield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    fileList:'filelist',\n")          
          .append("                }]\n")          
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'textarea', \n")
          .append("                    name:'filelist' \n")
          .append("                }]\n")
          .append("            }");
    }else if(fieldType.equals("히든")){
        sb2.append("{\n")        
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'hiddenfield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")          
          .append("            }");            
    }else if(fieldType.equals("태그")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'tagfield', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(", \n")
          .append("                    displayField: 'name',\n")
          .append("                    valueField: 'value',\n")
          .append("                    store:{\n")
          .append("                        fields:['name','value'],\n")
          .append("                        data:[\n")
          .append("                        {'name':'test1', 'value':'test1'},\n")
          .append("                        {'name':'test2', 'value':'test2'}\n")
          .append("                        ]\n")
          .append("                    }\n")  
          .append("                }]\n")                           
          .append("            }");            
    }else if(fieldType.equals("HTML에디터")){
        sb2.append("{\n")
          .append("                xtype:'exdisplaylabel', \n")
          .append("                html:'").append(fieldKorName).append("'\n")
          .append("            },{\n")           
          .append("                xtype:'exdisplayfield',\n")
          .append("                items:[{\n")
          .append("                    xtype:'htmleditor', \n")
          .append("                    name:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    reference:'").append(strGridPrefix).append(fieldName).append("',\n")
          .append("                    maxlength:").append(fieldLength).append(" \n")
          .append("                }]\n")          
          .append("            }");            
    }
    
    return sb2.toString();


}

public static String chgGridItem(int iteCount, 
                                       String fieldName, 
                                      String fieldKorName, 
                                      String fieldLength, 
                                      String fieldType, 
                                      String fromTo){
    
    StringBuffer sb = new StringBuffer();    
    if(iteCount != 0 )
        sb.append(",\n            ");

        sb.append("{\n")
          .append("                text:'").append(fieldKorName).append("',\n")
          .append("                dataIndex:'").append(fieldName).append("',\n")
          .append("                flex:1\n")
          .append("            }");

    return sb.toString();
}

%>

