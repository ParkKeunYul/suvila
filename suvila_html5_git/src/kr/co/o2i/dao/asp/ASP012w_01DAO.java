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
public class ASP012w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP012w_01DAO.";
	
	public List<Map<String, Object>> SELECT_ACC_ACCOUNTS_MAPPER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ACC_ACCOUNTS_MAPPER",param,result );					
		return list;
	}
	
	
	
	
	
	public boolean transactSave(CommonMap param
			   				   ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID", param.getString("V_USER_ID"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				
				
				System.out.println(info);
				int cnt = (Integer)sqlSession.selectOne(NAMEPSACE+"getExistAccAccountsMapper", info);
				if(cnt > 0){
					sqlSession.update(NAMEPSACE+"UPDATE_ACC_ACCOUNTS_MAPPER", info);
				}else{
					sqlSession.insert(NAMEPSACE+"INSERT_ACC_ACCOUNTS_MAPPER", info);
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
}
