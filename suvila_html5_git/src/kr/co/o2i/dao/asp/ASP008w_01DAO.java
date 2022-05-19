package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;


@Repository
public class ASP008w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP008w_01DAO.";
	
	public List<Map<String, Object>> SELECT_KWAN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_KWAN",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_HANG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_HANG",param,result );
				
		
		return list;
	}
	
	
	public boolean transactLeftSave(CommonMap param
			   					   ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID", param.getString("V_USER_ID"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				
				System.out.println("info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_KWAN", info);
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
	
	
	public boolean transactRightSave(CommonMap param
			   					    ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID", param.getString("V_USER_ID"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_HANG", info);
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
}
