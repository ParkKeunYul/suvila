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
public class SIN001P_05DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_05DAO.";
	
	
	public List<Map<String, Object>> SELECT_SINDO_CARD_MASTER_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_SINDO_CARD_MASTER_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SIN_GROUP_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_GROUP_HIS",param,result );
		return list;
	}
	
	public boolean updateSindoDetail(CommonMap param){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			
			
			sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER_DETAIL", param);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
}//SIN001P_05DAO
