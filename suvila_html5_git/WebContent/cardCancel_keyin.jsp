<%@page import="java.net.URLDecoder"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.io.PrintWriter"%>
<%@ page contentType="text/html; charset=euc-kr"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.NicePayHttpServletRequestWrapper"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.NicePayWEB"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.dto.WebMessageDTO"%>
<%@page import="java.util.Date"%>
<%
	request.setCharacterEncoding("euc-kr");
	
	/*
	*******************************************************
	* <취소 결과 설정>
	* 사용전 결과 옵션을 사용자 환경에 맞도록 변경하세요.
	* 로그 디렉토리는 꼭 변경하세요.
	*******************************************************
	*/
	NicePayHttpServletRequestWrapper httpRequestWrapper = new NicePayHttpServletRequestWrapper(request);
	NicePayWEB nicepayWEB = new NicePayWEB();
	
	
	
	String MID = request.getParameter("MID");
	//String file_name = "C:/workspace_extjs/suvila_html5/WebContent/WEB-INF/nicelog/"+MID+"/keyin/";
	String file_name = pageContext.getServletContext().getRealPath("/")+"/WEB-INF/nicelog/"+MID+"/keyin/";
	
	nicepayWEB.setParam("NICEPAY_LOG_HOME",file_name); 
	//nicepayWEB.setParam("NICEPAY_LOG_HOME","C:/log");                           // 로그 디렉토리 설정
	nicepayWEB.setParam("APP_LOG","1");                                         // 이벤트로그 모드 설정(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EVENT_LOG","1");                                       // 어플리케이션로그 모드 설정(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EncFlag","S");                                         // 암호화플래그 설정(N: 평문, S:암호화)
	nicepayWEB.setParam("SERVICE_MODE","CL0");                                  // 서비스모드 설정(결제 서비스 : PY0 , 취소 서비스 : CL0)
	
	/*
	*******************************************************
	* <취소 결과 필드>
	*******************************************************
	*/
	WebMessageDTO responseDTO   = nicepayWEB.doService(httpRequestWrapper,response);
	
	String resultCode           = responseDTO.getParameter("ResultCode");       // 결과코드 (취소성공: 2001, 취소성공(LGU 계좌이체):2211)
	String resultMsg            = responseDTO.getParameter("ResultMsg");        // 결과메시지
	String cancelAmt            = responseDTO.getParameter("CancelAmt");        // 취소금액
	String cancelDate           = responseDTO.getParameter("CancelDate");       // 취소일
	String cancelTime           = responseDTO.getParameter("CancelTime");       // 취소시간
	String cancelNum            = responseDTO.getParameter("CancelNum");        // 취소번호
	String payMethod            = responseDTO.getParameter("PayMethod");        // 취소 결제수단
	String mid                  = responseDTO.getParameter("MID");              // 상점 ID
	String tid                  = responseDTO.getParameter("TID");              // 거래아이디 TID
	 
	JSONObject jObject = new JSONObject();
	jObject.put("resultCode" , resultCode);
	jObject.put("resultMsg"  , resultMsg);
	jObject.put("cancelAmt"  , cancelAmt);
	jObject.put("cancelDate" , cancelDate);
	jObject.put("cancelTime" , cancelTime);
	jObject.put("cancelNum"  , cancelNum);
	jObject.put("payMethod"  , payMethod);
	jObject.put("mid"        , mid);
	jObject.put("tid"        , tid);
	
	System.out.println("========== card cancel==============");
	System.out.println(jObject.toJSONString());
	out.println(jObject.toJSONString());

%>
