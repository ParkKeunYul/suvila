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
	* <��� ��� ����>
	* ����� ��� �ɼ��� ����� ȯ�濡 �µ��� �����ϼ���.
	* �α� ���丮�� �� �����ϼ���.
	*******************************************************
	*/
	NicePayHttpServletRequestWrapper httpRequestWrapper = new NicePayHttpServletRequestWrapper(request);
	NicePayWEB nicepayWEB = new NicePayWEB();
	
	
	
	String MID = request.getParameter("MID");
	//String file_name = "C:/workspace_extjs/suvila_html5/WebContent/WEB-INF/nicelog/"+MID+"/keyin/";
	String file_name = pageContext.getServletContext().getRealPath("/")+"/WEB-INF/nicelog/"+MID+"/keyin/";
	
	nicepayWEB.setParam("NICEPAY_LOG_HOME",file_name); 
	//nicepayWEB.setParam("NICEPAY_LOG_HOME","C:/log");                           // �α� ���丮 ����
	nicepayWEB.setParam("APP_LOG","1");                                         // �̺�Ʈ�α� ��� ����(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EVENT_LOG","1");                                       // ���ø����̼Ƿα� ��� ����(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EncFlag","S");                                         // ��ȣȭ�÷��� ����(N: ��, S:��ȣȭ)
	nicepayWEB.setParam("SERVICE_MODE","CL0");                                  // ���񽺸�� ����(���� ���� : PY0 , ��� ���� : CL0)
	
	/*
	*******************************************************
	* <��� ��� �ʵ�>
	*******************************************************
	*/
	WebMessageDTO responseDTO   = nicepayWEB.doService(httpRequestWrapper,response);
	
	String resultCode           = responseDTO.getParameter("ResultCode");       // ����ڵ� (��Ҽ���: 2001, ��Ҽ���(LGU ������ü):2211)
	String resultMsg            = responseDTO.getParameter("ResultMsg");        // ����޽���
	String cancelAmt            = responseDTO.getParameter("CancelAmt");        // ��ұݾ�
	String cancelDate           = responseDTO.getParameter("CancelDate");       // �����
	String cancelTime           = responseDTO.getParameter("CancelTime");       // ��ҽð�
	String cancelNum            = responseDTO.getParameter("CancelNum");        // ��ҹ�ȣ
	String payMethod            = responseDTO.getParameter("PayMethod");        // ��� ��������
	String mid                  = responseDTO.getParameter("MID");              // ���� ID
	String tid                  = responseDTO.getParameter("TID");              // �ŷ����̵� TID
	 
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
