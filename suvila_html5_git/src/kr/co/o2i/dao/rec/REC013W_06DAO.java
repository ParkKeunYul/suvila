package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC013W_06DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC013w_06DAO.";
	
	public List<Map<String, Object>> SELECT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MGT",param,result );
		
		return list;
	}
	
	public boolean save( CommonMap param
						,List<Map<String, Object>> addList
			  			,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID" , param.getString("V_USER_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"    , StringUtil.StrBolToTF( info.get("SET_YN")+"" ));
				sqlSession.update(NAMEPSACE+"UPDATE_MGT"    , info);
			}// for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID" , param.getString("V_USER_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"    , StringUtil.StrBolToTF( info.get("SET_YN")+"" ));
				sqlSession.insert(NAMEPSACE+"INSERT_MGT"    , info);
			}// for
			
			
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
