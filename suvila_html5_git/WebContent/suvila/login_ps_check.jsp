<%@page import="kr.co.o2i.controller.com.LoginController"%>
<%@page import="kr.co.o2i.util.StringUtil"%>
<%@page import="java.net.InetAddress"%>
<%@ page contentType = "text/html; charset=euc-kr" %>
<%
  String user_id    = StringUtil.ObjToStr(request.getParameter("pi"));
  String temple_cd  = StringUtil.ObjToStr(request.getParameter("pt"));
  String client_ip  = request.getRemoteAddr();
  
  
  
  try{
  	String cookie_id = "";
  	Cookie cookie[] = request.getCookies();
  	for(int i = 0; i< cookie.length; i++){
  		if("passid".equals(cookie[i].getName())){
  			cookie_id = cookie[i].getValue();
  		}
  	}
  	System.out.print("jsp cookie");
  	// 쿠기를 중복 생성하면 이전 자바스크립트단 쿠키 불러오는 정보에서는 이전 정보로 불러오는 현상
  	// 값이 다르면 내부 쿠키값 기준으로 조회
  	if(!user_id.equals(cookie_id)) user_id = cookie_id; 
  }catch(Exception e){}
  
	  try{
	  	LoginController lc = new LoginController();
	  	String result = lc.autoIdPw(request, response, user_id, temple_cd, client_ip);
	  	response.getWriter().print(result.trim());
	  }catch(Exception e){
	  	e.printStackTrace();
	  }
%>
