package kr.co.o2i.dao.asp;

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
public class ASP010w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP010w_01DAO.";
	
	public List<Map<String, Object>> SELECT_CMS_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CMS_INFO",param,result );					
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PAYMENT_DAY(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PAYMENT_DAY",param,result );					
		return list;
	}
	
	
	public boolean transactSave(CommonMap param
			   				   ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			String SQL_MODE = param.getString("SQL_MODE");
			
			System.out.println("SQL_MODE = "+ SQL_MODE);
			
			if("S".equals(SQL_MODE)){ // 수정
				
				System.out.println("SPARAM = "+ param);
				System.out.println("USE_YN = ["+ param.getString("USE_YN")+"]");
				
				sqlSession.update(NAMEPSACE+"UPDATE_CMS_INFO", param);
				
				for(int i = 0; i<uptList.size(); i++){
					Map<String, Object> info  = uptList.get(i);
					
					info.put("CMS_TRADE_CD", param.getString("CMS_TRADE_CD"));
					info.put("TEMPLE_CD"   , param.getString("TEMPLE_CD"));
					System.out.println("info = "+ info);
					
					sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_CMS_PAYMENT_DAY_MGT", info);
				}
				
			}else{ // 신규
				System.out.println("I = "+ SQL_MODE);
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_CMS_INFO", param);
				sqlSession.insert(NAMEPSACE+"INSERT_CMS_PAYMENT_DAY_MGT", param);
				
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
	
}//ASP010w_01DAO
