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
public class ASP011w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP011w_01DAO.";
	
	public List<Map<String, Object>> SELECT_DATE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DATE",param,result );					
		return list;
	}
	
	
	
	
	
	public boolean transactSave(CommonMap param
			   				   ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"UPDATE_DATE", info);
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
