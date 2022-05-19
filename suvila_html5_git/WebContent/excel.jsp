<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@page import="org.suvila.com.util.CommonUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page contentType = "text/html; charset=euc-kr" %>
<html>
<head>
<style type="text/css">
  html, body {
    height:100%; width:100%; overflow:hidden;
  }
</style>
<title></title>
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">
<meta name="naver-site-verification" content="056e4b19ff7daa885466d8141de9ec0c24ebb3ad"/>
</head>
<body>
<%
int num = 1;
int js = 11;
int je = 16;

int pageMu = num;
int pagesize = 20000;
response.setHeader("Content-Disposition","attachment;filename=sindo"+num+".xls");
response.setHeader("Content-Description", "JSP Generated Data");



%>
<table border="1">
	<tr>
		<th>순번</th>
		<th>구분</th>
		<th>입회일자</th>
		<th>신도번호</th>
		<th>신도명</th>
		<th>법명</th>
		<th>관계</th>
		<th>간지</th>
		<th>생년월일</th>
		<th>나이</th>
		<th>성별</th>
		<th>전화번호</th>
		<th>휴대번호</th>
		<th>주소1</th>
		<th>주소2</th>
		<th>우편번호</th>
		<th>대표신도번호</th>
		<th>이메일</th>
	</tr>



<%
	Connection conn = null;	

	String driver 	= "";
	String url 		= "";
	String user 	= "";
	String password = "";
	String DbName = "";
	
	
	
	
	for(int j = js; j<= je ; j++){
		
		pageMu = j;
		
		try {
			
			driver 	= "oracle.jdbc.driver.OracleDriver";
			url 	= "jdbc:oracle:thin:@121.254.224.156:1521:DB02";
			user 	= "suvila";
			password= "suvila";
			
			Class.forName(driver);
			conn = DriverManager.getConnection(url,user,password);
		
		
		
		
			String sql =""+
					" select * from ( select pt.*, ceil(rownum /  "+pagesize+") page  "+
					" 						from ( "+
					" 			       			SELECT   TEMPLE_CD,   "+
					"                            BUD_NO,   "+
					"                            BUD_CODE,   "+
					"                            SORT_SEQ,   "+
					"                            DAEJU_BUD_NO,   "+
					"                            REPRESEN_REL,   "+
					"                            NAME_KOR,   "+
					"                            ZIP_CD,   "+
					"                            ADDR1,   "+
							"                    ADDR2,   "+
					"                            TELNO1 || DECODE(TELNO1,NULL,'','-') || TELNO2 || DECODE(TELNO2,NULL,'','-') || TELNO3 AS TELNO,   "+
					"                            MOBILE_TELNO1 || DECODE(MOBILE_TELNO1,NULL,'','-') || MOBILE_TELNO2 || DECODE(MOBILE_TELNO2,NULL,'','-') || MOBILE_TELNO3 AS MOBILE_TELNO,   "+
					"                            POST_TRANS,   "+
					"                            SMS_TRANS,   "+
					"                            SEXAGENARY,   "+
					"                            (    SELECT NAME FROM ASP_CODE_MGT WHERE GROUP_CD = 'GANJI' AND CODE = SEXAGENARY) AS SEXAGENARY_NM,   "+
					"                            LUNAR_SOLAR,   "+
					"                            (    SELECT NAME FROM ASP_CODE_MGT WHERE GROUP_CD = 'LUNAR_SOLAR' AND CODE = LUNAR_SOLAR) AS LUNAR_SOLAR_NM,   "+
					"                            ISSUE_DATE,   "+
					"                            BIRTHDAY,   "+
					"                             case   "+
					"                              when length(REPLACE(BIRTHDAY, ' ', '')) =8 then (to_char(sysdate, 'YYYY') - substr(BIRTHDAY,0,4 ))||''   "+
					"                              else ''   "+
					"                            end  as AGE,   "+
					"                            SEX_GBN,   "+
					"                            (    SELECT NAME FROM ASP_CODE_MGT WHERE GROUP_CD = 'SEXGBN' AND CODE = SEX_GBN) AS SEX_GBN_NM,   "+
					"                            SINDO_GBN,   "+
					"                            (    SELECT NAME FROM ASP_CODE_MGT WHERE GROUP_CD = 'SINDOGBN' AND CODE = SINDO_GBN) AS SINDO_GBN_NM,   "+
					"                            MEMO,   "+
					"                            EMAIL,   "+
					"                            SACRED_KOR   "+
					"                              FROM SUVILA.SIN_CARD_MASTER  "+
					"                            WHERE TEMPLE_CD = '000013' 	 "+
					"                              AND BUD_NO NOT IN(SELECT BUD_NO FROM SUVILA.SIN_DEATH_INFO WHERE TEMPLE_CD = '000013') AND DEL_YN= 'F' "+
					"                              ORDEr by BUD_NO "+
					" 	    				) pt ) where page = "+j;
			
			
			int aaa = 1;
			List list =  CommonUtil.getDbList(conn, sql);					
			for(int i = 0;  i<list.size() ; i++){
				
					Map map = (Map)list.get(i);
				%>
					<tr>
						<th><%=aaa + ((pageMu-1)*pagesize)  %></th>
						<th><%=map.get("SINDO_GBN_NM") %></th>
						<th><%=map.get("ISSUE_DATE") %></th>
						<th><%=map.get("BUD_NO") %></th>
						<th><%=map.get("NAME_KOR") %></th>
						<th><%=map.get("SACRED_KOR") %></th>
						<th><%=map.get("REPRESEN_REL") %></th>
						<th><%=map.get("SEXAGENARY_NM") %></th>
						<th><%=map.get("BIRTHDAY") %></th>
						<th><%=map.get("AGE") %></th>
						<th><%=map.get("SEX_GBN_NM") %></th>
						<th><%=map.get("TELNO") %></th>
						<th><%=map.get("MOBILE_TELNO") %></th>
						<th><%=map.get("ADDR1") %></th>
						<th><%=map.get("ADDR2") %></th>
						<th><%=map.get("ZIP_CD") %></th>
						<th><%=map.get("DAEJU_BUD_NO") %></th>
						<th><%=map.get("EMAIL") %></th>
						<th><%=map.get("MEMO") %></th>								
					</tr>
				<%
				aaa++;
				
			}//for
			
		
			conn.close();
			
		} catch(Exception e){
			e.printStackTrace();
		}
		
	}// 1for
	
			
%>
</table>
</body>
</html>
