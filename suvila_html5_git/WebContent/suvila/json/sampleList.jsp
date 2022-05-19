<%@ page contentType="text/html;charset=utf-8"  pageEncoding="utf-8" %>
<%
request.setCharacterEncoding("utf-8");
System.out.println("시작");
String strPage = request.getParameter("page");
if(strPage == null || strPage.trim().length() == 0){
	strPage = "1";
}
System.out.println("시1작");
String strLimit = request.getParameter("limit");
if(strLimit == null || strLimit.trim().length() == 0){
	strLimit = "10";
}
if(!strLimit.equals("10") && 
   !strLimit.equals("20")){
	strLimit = "10";
}

System.out.println("시2작");
System.out.println("strPage:" + strPage + ","  + strLimit);


if(strLimit.equals("10")){
	if(strPage.equals("1"))
	{
	%>
		{
	    "success":true,
	    "data":{
	    	"list":[
				 {"custNo":"1","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":0.5,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"2","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":0.1,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"3","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":0.8,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"4","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":0.9,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"5","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"6","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"7","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"8","custName":"임걱정","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"9","custName":"임걱정","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},		
				 {"custNo":"10","custName":"임걱정","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
				 {"custNo":"1","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"2","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"3","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"4","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"5","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"6","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"7","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"8","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"9","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		
				 {"custNo":"10","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"		 
		},
		"msg":"정상조회됨"	
		}	     
	<%
	}
	else if(strPage.equals("2"))
	{		     	
	%>
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"11","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"12","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"13","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"14","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"15","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"16","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"17","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"18","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},     
				 {"custNo":"19","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"20","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
			     {"custNo":"11","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"12","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"13","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"14","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"15","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"16","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"17","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"18","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		     
				 {"custNo":"19","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"20","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}	 
	<%
	}
	else if(strPage.equals("3"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"21","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"22","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"23","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"24","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"25","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"26","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"27","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"28","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"29","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"30","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
			     {"custNo":"21","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"22","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"23","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"24","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"25","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"26","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"27","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"28","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"29","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"30","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else if(strPage.equals("4"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"31","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"32","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"33","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"34","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"35","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"36","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"37","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"38","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"39","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"40","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
			 "listDetail":[
			     {"custNo":"31","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"32","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"33","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"34","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"35","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"36","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"37","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"38","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"39","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"40","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else if(strPage.equals("5"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"41","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"42","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"43","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"44","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"45","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"46","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"47","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"48","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"49","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"50","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
			 "listDetail":[
			     {"custNo":"41","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"42","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"43","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"44","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"45","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"46","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"47","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"48","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"49","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"50","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else if(strPage.equals("6"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"51","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"52","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"53","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"54","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"55","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"56","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"57","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"58","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"59","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"60","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
			 "listDetail":[
			     {"custNo":"51","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"52","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"53","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"54","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"55","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"56","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"57","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"58","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"59","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"60","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else if(strPage.equals("7"))
	{		     	
	%>	     
		{
	    "success":true,
	    "data":{
	    	"list":[
				 {"custNo":"61","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"62","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"63","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
				 {"custNo":"64","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"65","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]},
			     {"custNo":"66","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001", "commonCodeList":[{"value":"001", "display":"코드001"},{"value":"002", "display":"코드002"},{"value":"003", "display":"코드003"}]}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
				 {"custNo":"61","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"62","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"63","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"64","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"65","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"66","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else
	{		     	
	%>
		{
	    "success":false,
	    "data":{
		},
		"msg":"유효한 페이지가 아닙니다."	
		}
	<%
	}
}
else if(strLimit.equals("20"))
{
	if(strPage.equals("1"))
	{
	%>
		{
	    "success":true,
	    "data":{
	    	"list":[
				 {"custNo":"1","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"2","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"3","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"4","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"5","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"6","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"7","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"8","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"9","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		
				 {"custNo":"10","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"11","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"12","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"13","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"14","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"15","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"16","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"17","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"18","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		     
				 {"custNo":"19","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"20","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
				 {"custNo":"1","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"2","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"3","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"4","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"5","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"6","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"7","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"8","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"9","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		
				 {"custNo":"10","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"11","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"12","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"13","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"14","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"15","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"16","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"17","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"18","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},		     
				 {"custNo":"19","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"20","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],
			 "listTotalDetailSize":"66"		 
		},
		"msg":"정상조회됨"	
		}	     
	<%
	}
	else if(strPage.equals("2"))
	{		     	
	%>
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"21","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"22","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"23","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"24","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"25","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"26","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"27","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"28","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"29","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"30","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"31","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"32","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"33","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"34","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"35","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"36","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"37","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"38","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"39","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"40","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],			     	    	
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
			     {"custNo":"21","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"22","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"23","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"24","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"25","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"26","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"27","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"28","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"29","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"30","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"31","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"32","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"33","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"34","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"35","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"36","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"37","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"38","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"39","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"40","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}	 
	<%
	}
	else if(strPage.equals("3"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
			     {"custNo":"41","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"42","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"43","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"44","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"45","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"46","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"47","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"48","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"49","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"50","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"51","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"52","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"53","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"54","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"55","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"56","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"57","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"58","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"59","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"60","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}

			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
			     {"custNo":"41","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"42","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"43","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"44","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"45","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"46","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"47","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"48","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"49","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"50","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"51","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"52","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"53","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"54","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"55","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"56","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"57","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"58","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"59","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"60","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"}
			     
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else if(strPage.equals("4"))
	{		     	
	%>          	
		{
	    "success":true,
	    "data":{
	    	"list":[
				 {"custNo":"61","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"62","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"63","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"64","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"65","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"66","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],
			 "listTotalSize":"66",
	    	"listDetail":[
				 {"custNo":"61","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"62","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"63","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
				 {"custNo":"64","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"65","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false, "commonCode": "001"},
			     {"custNo":"66","custName":"홍길동","addr":"경기도 파주시 금촌로 50 후곡마을 ","point":1000,"birth":"20140101" ,"merryCls":false}
			 ],
			 "listTotalDetailSize":"66"	
		},
		"msg":"정상조회됨"	
		}
	<%
	}
	else
	{		     	
	%>
		{
	    "success":false,
	    "data":{
		},
		"msg":"유효한 페이지가 아닙니다."	
		}
	<%
	}
}
else
{
%>
		{
	    "success":false,
	    "data":{
		},
		"msg":"테스트용으로 limit는 10, 20까지만 지원합니다."	
		}

<%
}
System.out.println("왜 안될까");
%>
