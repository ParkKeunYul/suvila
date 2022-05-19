package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC002W_03DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC002w_03DAO.";
	
	public List<Map<String, Object>> SELECT_GDKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_GDKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BSKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GDREC(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GDREC",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BSREC(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSREC",param,result );
		
		return list;
	}
	
	public boolean saveGD( CommonMap param
			              ,List<Map<String, Object>> uptList){
			
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				
				sqlSession.update("REC002w_03DAO.UPDATE_PRAY_ORGINATE", info);
				
			}
			
			
			// txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
}
