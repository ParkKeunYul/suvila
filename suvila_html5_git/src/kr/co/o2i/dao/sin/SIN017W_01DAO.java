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
public class SIN017W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN017W_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SIN_FAMILY(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SIN_FAMILY",param,result );
		return list;
	}
	
	public boolean saveSindoCardNew( CommonMap param
            						,List<Map<String, Object>> uptList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				
				sqlSession.update("SIN006W_01DAO.UPDATE_SETTING",info);
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
	
}//SIN017W_01DAO
