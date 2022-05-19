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
	
	NicePayHttpServletRequestWrapper httpRequestWrapper = new NicePayHttpServletRequestWrapper(request);
	NicePayWEB nicepayWEB = new NicePayWEB();
	
	//String merchantKey = "TPP4afX4e5US6FEl0MnoyRHT/yzTRZVrKGJVBmew66y8jSDOt5ZNigM0DM/WZdYbev7OV/lTUEewzhq5dqKygg==";
	String merchantKey = request.getParameter("merchantKey");   
	String CardExpire  = request.getParameter("expYY") + request.getParameter("expMM");
	String payMethod   = request.getParameter("PayMethod");    
	
	httpRequestWrapper.addParameter("EncodeKey",merchantKey);     //상점키
	System.out.println("merchantKey = "+ merchantKey);
	
	
	Date today = new Date();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	
	
	
	String GoodsName = URLDecoder.decode( request.getParameter("GoodsName"), "UTF-8");
	String BuyerName = URLDecoder.decode( request.getParameter("BuyerName"), "UTF-8");
	
	httpRequestWrapper.addParameter("GoodsName" ,GoodsName);
	httpRequestWrapper.addParameter("BuyerName" ,BuyerName);
	
	
	
	System.out.println("GoodsName = "+ URLDecoder.decode( request.getParameter("GoodsName"), "UTF-8")  );
	
	 
	
	String MID = request.getParameter("MID");
	//String file_name = "c:/log/log_"+temple_cd;
	//String file_path = pageContext.getServletContext().getRealPath("/")+"/WEB-INF/nicelog/"+MID+"/keyin/";
	String file_path = "C:/workspace_extjs/suvila_html5/WebContent/WEB-INF/nicelog/"+MID+"/keyin/";
	
	 
	System.out.println("file_path = "+ file_path);
	
	nicepayWEB.setParam("NICEPAY_LOG_HOME",file_path);  
	//nicepayWEB.setParam("NICEPAY_LOG_HOME","c:/log");               //로그 디렉토리
	nicepayWEB.setParam("APP_LOG","1");                             //어플리케이션로그 설정(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EVENT_LOG","1");                           //이벤트로그 설정(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EncFlag","S");                             //암호화플래그 설정(N: 평문, S:암호화)
	nicepayWEB.setParam("SERVICE_MODE", "PY0");                     //서비스모드 설정(결제 서비스 : PY0 , 취소 서비스 : CL0)
	nicepayWEB.setParam("Currency", "KRW");                         //통화구분 설정(현재 KRW(원화) 가능)
	nicepayWEB.setParam("PayMethod",payMethod);                     //결제수단 설정
	httpRequestWrapper.addParameter("CardExpire", CardExpire);      //카드유효기간
	httpRequestWrapper.addParameter("AuthFlg", "2");

	
	WebMessageDTO responseDTO = nicepayWEB.doService(httpRequestWrapper,response);
	int amt = Integer.parseInt(responseDTO.getParameter("Amt"));     // 금액

	String resultCode = responseDTO.getParameter("ResultCode");      //결과코드 (정상 :3001 , 그 외 에러)
	String resultMsg  = responseDTO.getParameter("ResultMsg");       //결과메시지
	String authDate   = responseDTO.getParameter("AuthDate");        //승인일시 yymmdd24MMss
	String authCode   = responseDTO.getParameter("AuthCode");        //승인번호
	String buyerName  = responseDTO.getParameter("BuyerName");       //구매자명
	String mallUserID = responseDTO.getParameter("MallUserID");      //회원사고객ID
	String goodsName  = responseDTO.getParameter("GoodsName");       //상품명
	String mid        = responseDTO.getParameter("MID");             //상점ID
	String tid        = responseDTO.getParameter("TID");             //거래ID
	String moid       = responseDTO.getParameter("Moid");            //주문번호
	String cardCode   = responseDTO.getParameter("CardCode");        //카드사코드
	String cardName   = responseDTO.getParameter("CardName");        //카드사명
	String cardQuota  = responseDTO.getParameter("CardQuota");       //카드할부개월 (00:일시불,02:2개월)
	String cardNo     = responseDTO.getParameter("CardNo");          //카드번호

	 
	 JSONObject jObject = new JSONObject();
	 jObject.put("resultCode" , resultCode);
	 jObject.put("resultMsg"  , resultMsg);
	 jObject.put("authDate"   , authDate);
	 jObject.put("authCode"   , authCode);
	 jObject.put("buyerName"  , buyerName);
	 jObject.put("mallUserID" , mallUserID);
	 jObject.put("goodsName"  , goodsName);
	 jObject.put("mid"        , mid);
	 jObject.put("tid"        , tid);
	 jObject.put("moid"       , moid);
	 jObject.put("cardCode"   , cardCode);
	 jObject.put("cardName"   , cardName);
	 jObject.put("cardQuota"  , cardQuota);
	 jObject.put("cardNo"     , cardNo);
	 jObject.put("amt"        , amt);
	
	 
	 System.out.println("========== card pay==============");
	 System.out.println(jObject.toJSONString());
	 
	 out.println(jObject.toJSONString());
 
%>

