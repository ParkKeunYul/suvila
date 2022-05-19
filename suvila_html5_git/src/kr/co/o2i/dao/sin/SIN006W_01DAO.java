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

@Repository
public class SIN006W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN006W_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SIN_CARD_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
			
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CARD_HIS",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SIN_CARD_NEW(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
			
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CARD_NEW",param,result );
		return list;
	}
	
	public boolean sindoSave( CommonMap param					    
							 ,List<Map<String, Object>> addList
							 ,List<Map<String, Object>> uptList
							 ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_SIN_CARD_HIS"    , info);
			}//for
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_HIS"    , info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_HIS"    , info);
				
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
	
	
	public List<Map<String, Object>> SELECT_SINDO_CARD_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
			
		sqlSession.select(NAMEPSACE+"SELECT_SINDO_CARD_INFO",param,result );
		return list;
	}
	
	
}//SIN006W_01DAO
