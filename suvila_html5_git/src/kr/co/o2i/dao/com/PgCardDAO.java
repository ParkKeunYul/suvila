package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class PgCardDAO extends DefaultDAO {

	
	public String NAMEPSACE = "PgCardDAO.";
	
	
	public List<Map<String, Object>> SELECT_CARD_DETAIL(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CARD_DETAIL",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_CARD_AUTHCODE_LIST(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CARD_AUTHCODE_LIST",param,result );
		
		return list;
	}
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> recList
			            ,List<Map<String, Object>> mainList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			if(recList.size() > 0) {
				
				Map<String, Object> recInfo = recList.get(0);
				recInfo.put("V_USER_ID", param.getString("V_USER_ID"));
				recInfo.put("V_REMOTE" , param.getString("V_REMOTE"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_REC_CARDPAY_HIS", recInfo);
				sqlSession.update(NAMEPSACE+"UPDATE_REC_CARDPAY", recInfo);
				
				
				System.out.println("mainList.size() = "+ mainList.size());
				System.out.println("mainList.size() = "+ mainList.size());
				System.out.println("mainList.size() = "+ mainList.size());
				System.out.println("mainList.size() = "+ mainList.size());
				System.out.println("mainList.size() = "+ mainList.size());
				System.out.println("mainList.size() = "+ mainList.size());
				
				for(int i = 0; i<mainList.size(); i++) {
					
					Map<String, Object> info = mainList.get(i);
					
					info.put("V_USER_ID", param.getString("V_USER_ID"));
					info.put("V_REMOTE" , param.getString("V_REMOTE"));
					
					sqlSession.insert(NAMEPSACE+"INSERT_MISU_LIMIT", info);
					
				}// for i
				
			}
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	
}
