package kr.co.o2i.dao.com;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class MemoHisDAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "MemoHisDAO.";
	
	
	public List<Map<String, Object>> SELECT_MEMO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_MEMO",param,result );
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
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"DELETE_MEMO"    , info);
			}//for
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("UPT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				
				sqlSession.insert(NAMEPSACE+"UPDATE_MEMO"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("UPT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_MEMO"    , info);
				
			}//for
			
			
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
