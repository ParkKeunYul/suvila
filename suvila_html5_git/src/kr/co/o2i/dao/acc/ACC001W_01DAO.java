package kr.co.o2i.dao.acc;

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
public class ACC001W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "ACC001w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ACC_FETCH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ACC_FETCH",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ACC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ACC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_REMAIN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_REMAIN",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_APPROVAL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_APPROVAL",param,result );
		return list;
	}
	
	
	public int EXT_SETTLE(CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"EXT_SETTLE",param);
	}
	
	
	public boolean save( CommonMap param					    
					    ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("UPT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_ACC"    , info);
				
			}//for
			
			
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
