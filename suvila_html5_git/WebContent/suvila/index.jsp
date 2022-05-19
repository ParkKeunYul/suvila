<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="kr.co.o2i.util.StringUtil"%>
<%@page import="java.util.Map"%>
<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%
request.setCharacterEncoding("utf-8");

	Date today = new Date();
	
	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <style>
    .grid-group .x-grid-with-row-lines .x-grid-item {
        border-width:0;
    } 
    .exgridspan table tr.x-grid-row {
        border-style: solid;
        border-width: 0px 0 0 !important;
        border-color: #ededed;    
    }
    
    /* 이것이 먹는다.*/ 
    .exgridspan table {
        border-style: solid;
        border-width: 0px 0 0 !important;
        border-color: #ededed;    
    }

    .exspanline {
        border-style: solid;
        border-width: 1px 1px 0 !important;
        border-color: #darkgray;    
    }
    .exspanlinenone {
        border-style: solid;
        border-width: 0px 1px 0 !important;
        border-color: #ededed;    
    }
    .exrowwhite {
        border-style: solid;
        border-width: 0px 0 0 !important;
        border-color: #ededed;    
        background-color:white !important;               
    }
    
    
    .tleft{
    	text-align: left;
    }
    
    </style>
    <title>종무행정프로그램</title>
    <script language="javascript">
        var lboUserJsonPath = "./extra";
    </script>    
    <!-- 
    <script language="javascript" src="./resources/js/jquery-1.8.3.min.js"></script>
     -->
    <script language="javascript" src="./resources/js/common.js?a=<%=sdf.format(today)%>"></script>
    <script language="javascript" src="./resources/js/gf_util.js?a=<%=sdf.format(today)%>"></script>
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
	<script id="microloader" data-app="68c04271-bd53-45a3-957d-e36337914122" type="text/javascript" src="bootstrap.js"></script>
	 <%	
		String autoFlag = "false";
	    		
	    Map<String, Object> adminSession = null;
	    		
		String USER_ID   = "";    	
		String TEMPLE_CD = "";
		String USER_NM   = "";
		String V_AUTH_ADMIN_YN = "";
		try{
			adminSession = (Map<String, Object>)session.getAttribute("adminSession");
			if(adminSession != null){
				V_AUTH_ADMIN_YN = StringUtil.ObjToStr(adminSession.get("V_AUTH_ADMIN_YN"), "");			
				USER_ID   =  StringUtil.ObjToStr(adminSession.get("USER_ID"), "");
				TEMPLE_CD =  StringUtil.ObjToStr(adminSession.get("TEMPLE_CD"), "");
				USER_NM   =  StringUtil.ObjToStr(adminSession.get("USER_NM"), "");
				
				if("Y".equals(V_AUTH_ADMIN_YN)){
					autoFlag = "true";
					adminSession.put("V_AUTH_ADMIN_YN", "N");
					session.setAttribute("adminSession", adminSession);
				}
			}
			System.out.println("adminSession = "+ adminSession);
		}catch(Exception e){}				
	%>
	<script >
	   var autoFlag = "<%=autoFlag%>";
	   //alert( autoFlag );
		if(autoFlag == "true"){
			exCommon.user.userId   = "<%=USER_ID%>";
			exCommon.user.userName = "<%=USER_NM%>";
	        exCommon.user.templeCd = "<%=TEMPLE_CD%>"; 
		}else{
			exCommon.user.userId   = "";
			exCommon.user.userName = "";
			exCommon.user.templeCd = "";
		}
		
	</script>
	<style>
		/*합계 배경색*/
		.x-grid-row-summary .x-grid-cell{
		    background-color: #b3cee3 !important;
		    color : #9933ff;        
		}
		
		/*SMS/CMS수수료 상단 그룹핑 안보이게*/
		.asp013w_01_a .x-group-hd-container,
		.acc014w_01_a .x-group-hd-container,
		.acc015w_01_a .x-group-hd-container,
		.acc019w_01_a .x-group-hd-container,
		.acc025w_01_a .x-group-hd-container{
			display: none !important;
		} 
		/*excolumnwidgetcombo cell 패딩*/
		.x-grid-widgetcolumn-cell-inner{
			padding:  0 1px !important;
		}
		.x-grid-cell-inner{
			/* padding: 2px 5px 2px 4px; */
			
		}
		.x-form-text-default{
			padding: 3px 3px 2px;
		}
		
		/*그리드 checkbox text 한줄로*/
		.x-column-header-text{
			display: inline-block;
			padding-right: 2px;
		}
		
		
		/*그리드 checkbox 세로 정렬*/
		.x-column-header-checkbox .x-column-header-checkbox:after, .x-grid-checkcolumn:after{
			display : inline-block;
			vertical-align: middle;
		}
		
		.font700{
			font-weight: 700;
		}
		
		/* .x-grid-item{	
			border-width: 0 0 0 0 !important;
		} */
		
		.acc012w_01_a .x-grid-item {	
			 border-width: 0 0 0 0 !important;
		}
		
		.acc012w_01_a .x-grid-item:last-child{
			border-bottom: 1px solid #ededed !important;
		}
		
		.acc012w_01_a .x-grid-item-selected > tr > td { 
		    background:#D0DEF0 !important;    
		}
		
		.acc012w_01_a .exspanline > div,
		.acc012w_01_a .exspanlinenone > div {
		     /* background-color: white; */    
		 }
		
		
		
		.useYnBack{
			 background-color:#C8C8C8;
		}
		
		.useYnBackIm{
			 background-color:#C8C8C8 !important;
		}
		
		.x-grid-with-col-lines .x-grid-item-selected .x-grid-cell{
			border-color : #ededed !important;
			border-width : 0 1px 1px 0 !important;
		}
		
		.x-grid-with-col-lines .x-grid-cell{
			border-width : 0 1px 1px 0 !important;
		}
		
		.acc013w_01_a  .x-selmodel-column,
		.acc013w_01_a .x-grid-with-col-lines .x-grid-item-selected .x-grid-cell{
			/* background-color:#FFFFFF !important; */
		}
		
		.acc013w_01_a .x-column-header-checkbox{
			background-color:#f5f5f5 !important;
		}
		
		
		
		.acc013w_01_a .x-grid-row-summary .x-selmodel-column{
			background-color: #b3cee3 !important;
		}
		
		.sin001w_01_number .x-form-trigger{
			 display: none !important; 
		}
		
		.sin001w_01_a .x-grid-dirty-cell,
		.sin012w_01_a .x-grid-dirty-cell,
		.sin001p_01_a .x-grid-dirty-cell,
		.sin010w_01_a .x-grid-dirty-cell,
		.sin010p_01_a .x-grid-dirty-cell,
		.tr_sunab3_a  .x-grid-dirty-cell,
		.rec024w_03_a .x-grid-dirty-cell,
		.rec024w_04_a .x-grid-dirty-cell,
		.rec024w_07_a .x-grid-dirty-cell,
		.rec024w_02 .x-grid-dirty-cell,
		.none-dirty-grid .x-grid-dirty-cell{	
			 background-image: none !important;
		}
		
		.sin001_01_btn_line{
			border:1px solid #ced9ec !important;
			padding : 0 0 10px 0;
		}
		
		.price-fall .x-change-cell {
		    background-color: #FFB0C4;
		    color:red;
		}
		.price-rise .x-change-cell {
		    background-color: #B0FFC5;
		    color:green;
		}
		
		
		
		
		.rec024w_02 .x-grid-cell-row-numberer{
			background-color : #f6f9fd;
		}
		
		.cmsline{
			background-color: #d0e4f3 !important;
		}
		.recCellNotEdit{
			background-color : #f6f9fd !important;
		}
		
		.recCellEdit{
			background-color : #ffffff !important;
		}
		
		.sinCard{
			background-color : #516e8e !important;
		}
		.gibuReceipt{
			background-color : #5ABEF5 !important;				
		}
		
		.suvila_green_bg{
			background-color : #2BD768 !important;	
		}
		
		.suvila_error_bg{
			background-color : #FEBEBE !important;
		}
		
		.color_depth_0{
			background-color : #FFFFFF !important;
		}
		.color_depth_1, 
		.suvila_grid_bg{
			background-color : #F6F9FD !important;
		}
		.color_depth_2{
			background-color : #D0E4F3 !important;
		}
		.color_depth_3{
			background-color : #B3CEE3 !important;
		}
		.color_depth_4{
			background-color : #9CBCD5 !important;
		}
		.color_depth_5{
			background-color : #7DA4C3 !important;
		}
		.color_depth_6{
			background-color : #FAFDD9 !important;
		}
		
		.x-grid-row .x-grid-cell-selected,
		.x-grid-row .x-grid-cell-selected >   div {
			background-color: #c2ddf2 !important;
		}
		
		.x-grid-item-over,
		.x-grid-item-over .x-grid-cell-inner,
		.x-grid-item-over > td > div{
			background-color: #e2eff9 !important;	
		}
		
		
		.x-grid-item-selected,
		.x-grid-item-selected .x-grid-cell-inner,
		.x-grid-item-selected > td > div
		{
			background-color: #c2ddf2 !important;
			color : #000 !important;
		}
		
		.x-grid-item-selected td,
		.x-grid-item-selected td:hover{
			background-color: #c2ddf2 !important;
			color : #000 !important;
		} 
		
		.x-grid-item-focused,
		.x-grid-item-focused > td,
		.x-grid-item-focused > td > div{
			background-color: red !important;
		}  
		
		.x-grid-row .x-grid-cell-selected,
		.x-grid-row .x-grid-cell-selected >   div {
			background-color: inherit !important;
		} 
		
		.selectTab .x-tab.x-tab-active.x-tab-default{
			border-color : #126daf;
			background-color : #126daf;
		}
		
		.selectTab .x-tab.x-tab-active.x-tab-default .x-tab-inner-default{
			color: #fff;
		}
		
		.selectTab .x-tab-default-top{
			background-color : #fff;
		}
		
		.selectTab .x-tab-inner-default{
			color: black;
			
		}
		
		.selectTab .x-tab-bar-strip-default{
			/* background-color : #126daf; */
			background-color  : #fff;
		}
		
		.selectTab .x-tab-bar-default,
		.selectTab .x-tab-default{
			background-color: #fff;
		}
		
		.selectTab  .x-tab-bar-horizontal > .x-tab-bar-body-default{
			min-height: 31px;
		}
		
		.selectTab  .x-tab-bar-top > .x-tab-bar-body-default{
			padding-bottom: 0px;
		}
		
		/*탭 메인 #126daf*/
		
		.x-panel-default-outer-border-trbl{
			border-color: #fff !important;
			border-width : 0px !important;
		}
		
		
		.rec000p_06_a .x-column-header-align-right .x-column-header-text{
			margin-right: 0px !important;
		}
		.x-column-header-checkbox .x-column-header-text{
			/* display: inline-block; */
		}
		
		.x-form-radio-group60{
			width : 60px;
		}
		
		.x-form-radio-group40{
			width : 40px;
		}
		
		.topCheckHeader .x-column-header-checkbox .x-column-header-text{
			display: inline-block !important;
			/* padding-top: 2px; */	
			margin-bottom: 0px;		
			margin-right: 5px;
		}
		
		.cardPay_tot{
			font-size: 20px;
			text-align: right;
		}
	</style>
	<script src="http://183.111.230.154:8080/oz80/ozhviewer/jquery/jquery-2.0.3.min.js"></script>
	<link rel="stylesheet" href="http://183.111.230.154:8080/oz80/ozhviewer/jquery/jquery-ui.css" type="text/css"/>
	<script src="http://183.111.230.154:8080/oz80/ozhviewer/jquery/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="http://183.111.230.154:8080/oz80/ozhviewer/ui.dynatree.css" type="text/css"/>
	<script type="text/javascript" src="http://183.111.230.154:8080/oz80/ozhviewer/jquery.dynatree.js" charset="utf-8"></script>
	<script type="text/javascript" src="http://183.111.230.154:8080/oz80/ozhviewer/OZJSViewer.js" charset="utf-8"></script>
	<script>
		var AP_FILE_PATH;
		var AP_PRINT_DATA;
		
		
		function SetOZParamters_OZViewer(){
			var oz;
			
			oz = document.getElementById("OZViewer");
			
			oz.sendToActionScript("connection.reportname",AP_FILE_PATH);
			oz.sendToActionScript("connection.pcount","1");
			oz.sendToActionScript("connection.args1","json_data="+AP_PRINT_DATA);
			
	
			oz.sendToActionScript("viewer.largebundle", "true");  
			oz.sendToActionScript("viewer.childcount", "1");
			oz.sendToActionScript("export.exportbypage", "true");
			
			
			oz.sendToActionScript("child1.connection.reportname",AP_FILE_PATH);
			oz.sendToActionScript("child1.connection.pcount","1");
			oz.sendToActionScript("child1.connection.args1","json_data="+AP_PRINT_DATA);
			oz.sendToActionScript("child1.connection.servlet","http://183.111.230.154:8080/oz80/server");
	
	
	
			oz.sendToActionScript("comment.all","true"); //주석 사용
			oz.sendToActionScript("pdf.savecomment","true"); //주석 저장 사용
			
			oz.sendToActionScript("comment.highlightpen","true"); //형광펜 사용
			oz.sendToActionScript("connection.servlet","http://183.111.230.154:8080/oz80/server");
	
			return true;
		}
	</script>
</head>

 <!-- http://203.245.2.234:8080/oz80/sample_canvas.html -->
<body>
</body>
</html>
