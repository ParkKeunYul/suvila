package kr.co.o2i.dao.sin;

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
import kr.co.o2i.util.StringUtil;

@Repository
public class SIN011W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN011W_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_INFO",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SMS_DOC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SMS_DOC",param,result );
		return list;
	}
	
	
	public boolean saveSmsDoc( CommonMap param
							  ,List<Map<String, Object>> addList
							  ,List<Map<String, Object>> uptList
            				  ,List<Map<String, Object>> delList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i < delList.size(); i++) {
				Map<String, Object> info = delList.get(i);
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"DELETE_SMS_DOC",info);
			}
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("UPT_USER" , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_SMS_DOC",info);
			}
			
			
			for(int i = 0; i < addList.size(); i++) {
				Map<String, Object> info = addList.get(i);
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("CRT_USER" , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"INSERT_SMS_DOC",info);
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
	
	
	
	public boolean save( CommonMap param
						,Map<String, Object> smsInfo
						,List<Map<String, Object>> uptList) {
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			smsInfo.put("SMS_USER_ID" , Const.SMS_USER_ID);
			smsInfo.put("GROUPSMS"    , "GROUPSMS");
			smsInfo.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
			smsInfo.put("V_TEMPLE_NM" , param.getString("V_TEMPLE_NM"));
			smsInfo.put("RESERVED3"   , "SMSREC");
			smsInfo.put("RESERVED4"   , "12");
			smsInfo.put("V_USER_ID"   , param.getString("V_USER_ID"));
			
			String key = "";
			int cnt    = 0;
			
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				String BUD_NO = StringUtil.ObjToStr(info.get("BUD_NO"), "");
				key          += ",'" + BUD_NO + "'";
				cnt++;
				
				if(cnt >= 999){
					smsInfo.put("V_BUD_NO_LIST",key.substring(1));
					CommonUtil.saveGroupSmsSindo(sqlSession , smsInfo);
					key = "";
					cnt = 0;
				}
			}// for i
			
			if(!key.equals("")){
				smsInfo.put("V_BUD_NO_LIST",key.substring(1));
				CommonUtil.saveGroupSmsSindo(sqlSession , smsInfo);
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
	}// 

	
}//SIN011W_01DAO
