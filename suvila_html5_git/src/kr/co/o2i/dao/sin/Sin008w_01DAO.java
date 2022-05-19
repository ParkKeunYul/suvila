package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class Sin008w_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN008W_01DAO.";
	
	public List<Map<String, Object>> SELECT_SMS_ALARM_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SMS_ALARM_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SMS_ALARM_DOC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SMS_ALARM_DOC",param,result );
		return list;
	}
	
	
	/*	신도 가족 조회  SELECT_SMS_ALARM_ITEM */
	public List<Map<String, Object>> SELECT_SMS_ALARM_ITEM(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SMS_ALARM_ITEM",param,result );
		return list;
	}
	
	public boolean saveDoc( CommonMap param
						   ,List<Map<String, Object>> addList
						   ,List<Map<String, Object>> uptList
						   ,List<Map<String, Object>> delList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i < delList.size(); i++) {
				Map<String, Object> info = delList.get(i);
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"DELETE_SMS_ALARM_DOC",info);
			}
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CHECK_YN"  , StringUtil.StrBolToTF( info.get("CHECK_YN")+"" ));
				
				sqlSession.update(NAMEPSACE+"UPDATE_SMS_ALARM_DOC",info);
			}
			
			
			for(int i = 0; i < addList.size(); i++) {
				Map<String, Object> info = addList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CHECK_YN"    , StringUtil.StrBolToTF( info.get("CHECK_YN")+"" ));
				
				
				sqlSession.update(NAMEPSACE+"INSERT_SMS_ALARM_DOC",info);
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
	
	
	public boolean saveMgt( CommonMap param
			   			   ,List<Map<String, Object>> uptList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("USE_YN"    , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				int COUNT  =  (Integer)sqlSession.selectOne("selectExist", info);
				
				if(COUNT < 1) {
					sqlSession.update(NAMEPSACE+"INSERT_SMS_ALARM_MGT",info);
				}else {
					sqlSession.update(NAMEPSACE+"UPDATE_SMS_ALARM_MGT",info);
				}
			}//
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
	}// 
	
}
