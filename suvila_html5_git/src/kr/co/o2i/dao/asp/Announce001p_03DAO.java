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
public class Announce001p_03DAO extends DefaultDAO {

	public String  NAMEPSACE = "AnnounceDAO.";
	
	public List<Map<String, Object>> SELECT_DETAIL_SCHEDUEL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL_SCHEDUEL",param,result );
		return list;
	}
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> addList
						,List<Map<String, Object>> uptList
						,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"DELETE_DETAIL_SCHEDUEL"    , info);
			}//for
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("REMOTE"     , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				sqlSession.insert(NAMEPSACE+"UPDATE_DETAIL_SCHEDUEL"    , info);
				
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("REMOTE"     , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				sqlSession.insert(NAMEPSACE+"INSERT_DETAIL_SCHEDUEL"    , info);
				
			}//for
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
		
	}// save
	
	public List<Map<String, Object>> SELECT_FORTY_NINE_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_FORTY_NINE_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_JIJE_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_JIJE_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_CHONDOJE_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CHONDOJE_DETAIL",param,result );
		return list;
	}
}
