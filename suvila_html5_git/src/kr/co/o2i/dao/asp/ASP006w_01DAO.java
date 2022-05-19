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
public class ASP006w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP006w_01DAO.";
	
	
	/* 문자컬럼관리 조회 */
	public List<Map<String, Object>> selectItem(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_EVENT_ALARM_ITEM",param,result );
				
		
		return list;
	}
	
	/* 컬럼명 조회 */
	public List<Map<String, Object>> selectColumn(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_COLUMN_NAME",param,result );
		return list;
	}
	
	/* 컬럼명 조회 */
	public List<Map<String, Object>> selectTable(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TABLE_NAME",param,result );
		return list;
	}
	
	
	public boolean transactSave(CommonMap param
							   ,List<Map<String, Object>> addList
							   ,List<Map<String, Object>> uptList
						       ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				sqlSession.delete(NAMEPSACE+"DELETE_EVENT_ALARM_ITEM", info);
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("CRT_USER", param.getString("CRT_USER"));
				info.put("UPT_USER", param.getString("UPT_USER"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				sqlSession.delete(NAMEPSACE+"UPDATE_EVENT_ALARM_ITEM", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER", param.getString("CRT_USER"));
				info.put("UPT_USER", param.getString("UPT_USER"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				sqlSession.delete(NAMEPSACE+"INSERT_EVENT_ALARM_ITEM", info);
			}
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//transactSave
	
	
	
}//ASP005w_01DAO
