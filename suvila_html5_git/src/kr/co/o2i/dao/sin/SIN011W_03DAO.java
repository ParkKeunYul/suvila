package kr.co.o2i.dao.sin;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.DataEncrypt;
import kr.co.o2i.util.StringUtil;
import javax.net.ssl.SSLContext; 
import javax.net.ssl.SSLSession;
import javax.net.ssl.HostnameVerifier; 
import javax.net.ssl.HttpsURLConnection;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.sql.Connection;
import java.text.SimpleDateFormat;

@Repository
public class SIN011W_03DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN011W_03DAO.";
	
	
	public List<Map<String, Object>> SELECT_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_INFO",param,result );
		return list;
	}
	
	public boolean resultReq( CommonMap param
					         ,Map<String, Object> cardInfo
					         ,List<Map<String, Object>> dsMainList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		String reqUrl = "https://data.nicepay.co.kr/smslink/api";
		HttpsURLConnection hconn = null;
		try{
			
			for(int i = 0; i< dsMainList.size(); i++) {
				Map<String, Object> info = dsMainList.get(i);
				
				URL url				= new URL(reqUrl);
			  	hconn 				= (HttpsURLConnection)url.openConnection();
			  	
			  	hconn.setHostnameVerifier(new HostnameVerifier() { 
						public boolean verify(String hostname, SSLSession session) { 
							return true; 
			  		} 
			  	});
			  	
			  	hconn.setRequestMethod("POST");
				hconn.setRequestProperty("Content-Type", "application/json; utf-8");
				hconn.setConnectTimeout(10000);
				hconn.setDoOutput(true);
				hconn.setDoInput(true);
				
				
				 
				Date now = new Date();
				SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");
				
				String trDtm       = sf.format(now);
				String merchantKey = StringUtil.ObjToStr(cardInfo.get("MERCHANTKEY"));
				String sid         = "0501002";
			  	String usrId       = StringUtil.ObjToStr(info.get("USRID"));
			  	String mid         = StringUtil.ObjToStr(info.get("MID"));
			  	
					
			  	
			  	
			  	DataEncrypt sha256Enc 	  = new DataEncrypt();
					
			  	Map<String, Object> sendData     = new HashMap<String, Object>();
			  	Map<String, Object> h_info       = new HashMap<String, Object>();
			  	
				h_info.put("sid"      , sid);
				h_info.put("trDtm"    , trDtm);
				h_info.put("gubun"    , "S");
				h_info.put("resCode"  , "");
				h_info.put("resMsg"   , "");
				
				
				
				Map<String, Object> b_info       = new HashMap<String, Object>();
				b_info.put("usrId"      , usrId);
				b_info.put("encKey"     , sha256Enc.encrypt(sid + usrId + trDtm + merchantKey));
				b_info.put("mid"        , info.get("MID"));
				b_info.put("reqId"      , info.get("REQID"));
				b_info.put("type"       , 0);
				
				b_info.put("usrId"      , usrId);
				b_info.put("mid"        , mid);
		  	
				sendData.put("header", h_info);
				sendData.put("body", b_info);
				
				String reqInfoString = getJsonStringFromMap(sendData).toString();
							
				OutputStream os= hconn.getOutputStream();
				os.write(reqInfoString.toString().getBytes("UTF-8"));
				os.flush();
				os.close();
				
				if(200 == hconn.getResponseCode()){
					String line ="";
					BufferedReader br = new BufferedReader(new InputStreamReader(hconn.getInputStream(), "UTF-8"));
					String resultString = "";
					while ( (line = br.readLine()) != null) {
						resultString += line;
					}
					
					JSONParser parser  = new JSONParser();
					Object obj         = parser.parse(resultString);
					JSONObject jsonObj = (JSONObject)obj;
					
					Map<String, Object> header1 = (HashMap<String, Object>)jsonObj.get("header");
					Map<String, Object> body1   = (HashMap<String, Object>)jsonObj.get("body");
					
					
					Map<String , Object> dataInfo = ((List<Map<String , Object>>) body1.get("data")).get(0);
					String svcNm = StringUtil.ObjToString( dataInfo.get("svcNm") , "");
					String payStatus = StringUtil.ObjToString( dataInfo.get("payStatus") , "");
					if("결제완료".equals(payStatus)){
						
						info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
						info.put("V_SRCNM"    , svcNm);
						info.put("V_PAYSTATUS", payStatus);
						info.put("V_TID"      , StringUtil.ObjToString( dataInfo.get("tid") , ""));
						info.put("V_PAYDT"    , StringUtil.ObjToString( dataInfo.get("payDt") , ""));
						
						sqlSession.update(NAMEPSACE+"updateCardPaySmsHis",info);
					}else{
						System.out.println("결제안됨");
					}
				}
				
			}// for
			
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}
	
	public boolean cancelCardPay( CommonMap param
					             ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"       , param.getString("V_REMOTE"));
				info.put("V_USER_ID"    , param.getString("V_USER_ID"));
				
				sqlSession.insert(NAMEPSACE+"UPDATE_CANCEL_CARD", info);
			}
			
			
			txManager.commit(status);
			return true;
			
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
				
	}
	
	
	public boolean updateRemark( CommonMap param
            					 ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try {
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"       , param.getString("V_REMOTE"));
				info.put("V_USER_ID"    , param.getString("V_USER_ID"));
				
				sqlSession.insert(NAMEPSACE+"UPDATE_REMARK", info);
			}
			txManager.commit(status);
			return true;
			
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
				
	}
	
	
	public JSONObject getJsonStringFromMap( Map<String, Object> map ){
	      JSONObject jsonObject = new JSONObject();
	      for( Map.Entry<String, Object> entry : map.entrySet() ) {
	          String key = entry.getKey();
	          Object value = entry.getValue();
	          jsonObject.put(key, value);
	      }
	      
	      return jsonObject;
	}
	
	
	

	
}//SIN011W_03DAO
