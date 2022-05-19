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
	
	httpRequestWrapper.addParameter("EncodeKey",merchantKey);     //����Ű
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
	//nicepayWEB.setParam("NICEPAY_LOG_HOME","c:/log");               //�α� ���丮
	nicepayWEB.setParam("APP_LOG","1");                             //���ø����̼Ƿα� ����(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EVENT_LOG","1");                           //�̺�Ʈ�α� ����(0: DISABLE, 1: ENABLE)
	nicepayWEB.setParam("EncFlag","S");                             //��ȣȭ�÷��� ����(N: ��, S:��ȣȭ)
	nicepayWEB.setParam("SERVICE_MODE", "PY0");                     //���񽺸�� ����(���� ���� : PY0 , ��� ���� : CL0)
	nicepayWEB.setParam("Currency", "KRW");                         //��ȭ���� ����(���� KRW(��ȭ) ����)
	nicepayWEB.setParam("PayMethod",payMethod);                     //�������� ����
	httpRequestWrapper.addParameter("CardExpire", CardExpire);      //ī����ȿ�Ⱓ
	httpRequestWrapper.addParameter("AuthFlg", "2");

	
	WebMessageDTO responseDTO = nicepayWEB.doService(httpRequestWrapper,response);
	int amt = Integer.parseInt(responseDTO.getParameter("Amt"));     // �ݾ�

	String resultCode = responseDTO.getParameter("ResultCode");      //����ڵ� (���� :3001 , �� �� ����)
	String resultMsg  = responseDTO.getParameter("ResultMsg");       //����޽���
	String authDate   = responseDTO.getParameter("AuthDate");        //�����Ͻ� yymmdd24MMss
	String authCode   = responseDTO.getParameter("AuthCode");        //���ι�ȣ
	String buyerName  = responseDTO.getParameter("BuyerName");       //�����ڸ�
	String mallUserID = responseDTO.getParameter("MallUserID");      //ȸ�����ID
	String goodsName  = responseDTO.getParameter("GoodsName");       //��ǰ��
	String mid        = responseDTO.getParameter("MID");             //����ID
	String tid        = responseDTO.getParameter("TID");             //�ŷ�ID
	String moid       = responseDTO.getParameter("Moid");            //�ֹ���ȣ
	String cardCode   = responseDTO.getParameter("CardCode");        //ī����ڵ�
	String cardName   = responseDTO.getParameter("CardName");        //ī����
	String cardQuota  = responseDTO.getParameter("CardQuota");       //ī���Һΰ��� (00:�Ͻú�,02:2����)
	String cardNo     = responseDTO.getParameter("CardNo");          //ī���ȣ

	 
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

