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
public class SIN013W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN013W_01DAO.";
	
	public List<Map<String, Object>> SELECT_SMS_WAIT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SMS_WAIT",param,result );
		return list;
	}
	
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> uptList
						,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				String TR_MSG_GB_OLD = StringUtil.ObjToStr(info.get("TR_MSG_GB_OLD"));
				String sql       	 = "DELETE_LMS_WAIT";
				if("SMS".equals(TR_MSG_GB_OLD)) {
					sql = "DELETE_SMS_WAIT";
				}
				sqlSession.delete(NAMEPSACE+""+ sql    , info);
				
			}//for
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				String TR_MSG_GB_OLD = StringUtil.ObjToStr(info.get("TR_MSG_GB_OLD"));
				String TR_MSG_GB 	 = StringUtil.ObjToStr(info.get("TR_MSG_GB"));
				
				
				if("SMS".equals(TR_MSG_GB_OLD) && "SMS".equals(TR_MSG_GB)){
					sqlSession.update(NAMEPSACE+"UPDATE_SMS_WAIT" , info);
					
				}else if("SMS".equals(TR_MSG_GB_OLD) && "LMS".equals(TR_MSG_GB)){
					sqlSession.insert(NAMEPSACE+"COPY_SMS_WAIT" , info);
					sqlSession.delete(NAMEPSACE+"DELETE_SMS_WAIT" , info);
					
				}else if("LMS".equals(TR_MSG_GB_OLD) && "LMS".equals(TR_MSG_GB)){
					sqlSession.update(NAMEPSACE+"UPDATE_LMS_WAIT" , info);
					
				}else if("LMS".equals(TR_MSG_GB_OLD) && "SMS".equals(TR_MSG_GB)){
					sqlSession.insert(NAMEPSACE+"COPY_LMS_WAIT" , info);
					sqlSession.delete(NAMEPSACE+"DELETE_LMS_WAIT" , info);
				}
				
			}
			//txManager.rollback(status);
			txManager.commit(status);
			
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	
}//SIN013W_01DAO
