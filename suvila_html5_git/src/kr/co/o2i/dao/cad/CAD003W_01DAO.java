package kr.co.o2i.dao.cad;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.joda.time.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.DateTimeUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class CAD003W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "CAD003w_01DAO.";
	
	
	
	public boolean save( CommonMap param
					                ,List<Map<String, Object>> newList){
		
		
		Map<String, Object> result   = new HashMap<String, Object>();
		TransactionStatus status     = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{

			Map<String, Object> smsInfo = new HashMap<>();
			smsInfo.put("V_TR_NUM"       , param.getString("TR_NUM"));            
			smsInfo.put("V_TR_SENDDATE"  , param.getString("TR_SENDDATE"));       
			smsInfo.put("V_TR_SENDTIME"  , param.getString("TR_SENDTIME"));       
			smsInfo.put("V_TR_ID"        , param.getString("TR_ID"));            
			smsInfo.put("V_TR_SENDSTAT"  , param.getString("TR_SENDSTAT"));            
			smsInfo.put("V_TR_PHONE"     , param.getString("TR_PHONE"));          
			smsInfo.put("V_TR_CALLBACK"  , param.getString("TR_CALLBACK"));          
			smsInfo.put("V_TR_MESSAGE"   , param.getString("TR_MESSAGE"));        
			smsInfo.put("V_TR_ETC1"      , param.getString("TR_ETC1"));           
			smsInfo.put("V_TR_ETC2"      , param.getString("TR_ETC2"));  
			smsInfo.put("V_TR_ETC3"      , param.getString("TR_ETC3"));           
			smsInfo.put("V_TR_ETC4"      , param.getString("TR_ETC4"));           
			smsInfo.put("V_TR_ETC5"      , param.getString("TR_ETC5"));
			smsInfo.put("V_TR_MSG_GB"    , param.getString("TR_MSG_GB"));           
			smsInfo.put("V_TR_MSGTYPE"   , param.getString("TR_MSGTYPE"));
			
			smsInfo.put("USER_ID"        , Const.SMS_USER_ID);
			smsInfo.put("CDR_ID"         , "NAMECARDSMS");
			smsInfo.put("RESERVED3"      , "SMSREC");
			smsInfo.put("RESERVED4"      , "15");
			smsInfo.put("V_USER_ID"      , param.getString("V_USER_ID"));
			smsInfo.put("V_TEMPLE_CD"    , param.getString("V_TEMPLE_CD"));
			
			
			System.out.println("addList = "+ newList.size());
			
			String key = "";
			int cnt    = 0;
			
			for(int i = 0; i<newList.size(); i++){
				Map<String, Object> info  = newList.get(i);
				System.out.println("info ="+ info.get("SORT_SEQ"));
				
				key += ",'" + info.get("SORT_SEQ")+ "'";
				cnt++;
				
				if(cnt >= 999){
					System.out.println("처음");
					
					smsInfo.put("V_BUD_NO_LIST",key.substring(1));
					saveGroupSmsNameCard(sqlSession, smsInfo);
					
					key = "";
					cnt = 0;
				}// if
			}
			
			if(!key.equals("")){
				System.out.println("나중");
				smsInfo.put("V_BUD_NO_LIST",key.substring(1));
				saveGroupSmsNameCard(sqlSession, smsInfo);
			}// if
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			result.put("stat", false);
			result.put("msg" , Const.ERR_MSG);
			
			txManager.rollback(status);
			e.printStackTrace();
			return false;
		}
		return true;
		
	}// saveGroup
	
	
	public void saveGroupSmsNameCard(SqlSession sqlSession
			                        ,Map<String, Object> smsInfo){
		
		String MsgTypeSql = "INSERT_NAME_SMS_NOW";
		
		//System.out.println("V_TR_MSG_GB = "+ smsInfo.get("V_TR_MSG_GB"));
		
		
		if( "LMS".equals(  StringUtil.ObjToStr( smsInfo.get("V_TR_MSG_GB")  ) ) ){
			MsgTypeSql = "INSERT_NAME_LMS_NOW";
		}
		
		//System.out.println("INSERT_NAME_SMS_NOW = "+ MsgTypeSql);
		
		/*System.out.println(smsInfo.get("USER_ID"));
		System.out.println(smsInfo.get("CDR_ID"));
		System.out.println(smsInfo.get("V_TR_MSGTYPE"));
		System.out.println(smsInfo.get("V_TR_MESSAGE"));
		System.out.println(smsInfo.get("V_TR_CALLBACK"));
		System.out.println(smsInfo.get("RESERVED3"));
		System.out.println(smsInfo.get("RESERVED4"));
		System.out.println(smsInfo.get("V_TR_ETC5"));
		System.out.println(smsInfo.get("V_TR_MSGTYPE"));
		System.out.println(smsInfo.get("V_TR_SENDDATE"));
		System.out.println(smsInfo.get("V_TR_SENDTIME"));*/
		System.out.println(smsInfo.get("V_BUD_NO_LIST"));
		
		
		
		sqlSession.insert(NAMEPSACE + MsgTypeSql , smsInfo);
		
		
	}
	
	
	
}
