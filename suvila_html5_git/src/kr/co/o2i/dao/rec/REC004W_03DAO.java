package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC004W_03DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC004w_03DAO.";
	
	
	public List<Map<String, Object>> SELECT_WEPAEKIND(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_WEPAEKIND",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SPIRIT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SPIRIT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_EVENTSEQ(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_EVENTSEQ",param,result );
		return list;
	}
	
	public boolean update( CommonMap param
						  ,List<Map<String, Object>> uptList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_EVENTSEQ", info);
				
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
