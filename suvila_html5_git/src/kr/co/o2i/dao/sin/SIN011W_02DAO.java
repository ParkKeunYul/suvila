package kr.co.o2i.dao.sin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.net.ssl.HttpsURLConnection;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

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

@Repository
public class SIN011W_02DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN011W_02DAO.";
	
	
	public boolean saveReq( CommonMap param
			               ,Map<String, Object> dsCardInfo
						   ,List<Map<String, Object>> uptList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		String reqUrl = "https://data.nicepay.co.kr/smslink/api"; 
		
		
		
		try{
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID", param.getString("V_USER_ID"));
				
				info.put("V_PRAY_NM" , dsCardInfo.get("PRAY_NM"));
				info.put("V_AMOUNT"  , dsCardInfo.get("AMOUNT"));
				
				
				
				Date now            = new Date();
				SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");
				
				HttpsURLConnection hconn = null;
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
				
				String usrId           = StringUtil.ObjToStr(dsCardInfo.get("SUB2_TRADE_ID"));
				String merchantKey     = StringUtil.ObjToStr(dsCardInfo.get("MERCHANTKEY"));
				String trDtm           = sf.format(now);
				String sid             =  "0501001";
				DataEncrypt sha256Enc  = new DataEncrypt();
				
				Map<String, Object> sendData = new HashMap<String, Object>();
				Map<String, Object> h_info   = new HashMap<String, Object>();
				
				
				h_info.put("sid"      , sid);
				h_info.put("trDtm"    , trDtm);
				h_info.put("gubun"    , "S");
				h_info.put("resCode"  , "");
				h_info.put("resMsg"   , "");
				
				Map<String, Object> b_info       = new HashMap<String, Object>();
				String MOID     = param.getString("V_TEMPLE_CD")+"_"+trDtm+"_"+ StringUtil.ObjToString(info.get("BUD_NO"), "").replaceAll("-", "");
				//String ordEmail = SIN011W_01Avo.getEmail1()
				String ordEmail = "o2i@o2i.co.kr";
				
				String email1 =  StringUtil.ObjToString(info.get("EMAIL1"), "");
				String email2 =  StringUtil.ObjToString(info.get("EMAIL2"), "");
				
				if(!"".equals(email1) && !"".equals(email2) ){
					ordEmail = email1+"@"+ email2;
				}
				
				
				b_info.put("usrId"    , usrId.substring(0, usrId.length()-1));
				b_info.put("mid"      , usrId);
				b_info.put("encKey"   , sha256Enc.encrypt(sid + usrId.substring(0, usrId.length()-1) + trDtm + merchantKey));
				b_info.put("type"     , "0");
				b_info.put("goodsNm"  , dsCardInfo.get("PRAY_NM"));
				b_info.put("goodsAmt" , dsCardInfo.get("AMOUNT"));
				b_info.put("moid"     , MOID);
				b_info.put("ordNm"    , info.get("NAME_KOR"));
				b_info.put("ordEmail" , ordEmail);
				b_info.put("ordHpNo"  , StringUtil.ObjToString(info.get("MOBILE_TELNO_M"), "").replaceAll("-", ""));
				
				
				
				info.put("V_ENCKEY"    , b_info.get("encKey"));
				info.put("V_TRDTM"     , h_info.get("trDtm"));
				info.put("V_MOID"     , MOID);
				info.put("V_SID"      , sid);
				info.put("V_ORDEMAIL" , ordEmail);
				info.put("V_MID"      , usrId);
				info.put("V_USRID"    , usrId.substring(0, usrId.length()-1));
				
				
				sendData.put("header", h_info);
				sendData.put("body", b_info);
				
				String reqInfoString = StringUtil.getJsonStringFromMap(sendData).toString();

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
					
					if((header1.get("resCode")+"").equals("0000")){
						
						String reqId = "";
						try{
							reqId = ((ArrayList<Map<String, Object>>)body1.get("data")).get(0).get("reqId")+"" ;
						}catch(Exception e){
						}
						
						info.put("V_REQDT"   , body1.get("reqDt"));
						info.put("V_AUTHCL"  , body1.get("authCl"));
						info.put("V_DATACNT" , body1.get("dataCnt"));
						info.put("V_REQID"   , reqId);
						
						
						
						sqlSession.insert(NAMEPSACE+"INSERT_CARD_SMS_PAY", info);
					
					}
				}
				
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}
	
}//SIN011W_01DAO
