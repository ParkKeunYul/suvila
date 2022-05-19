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
public class ACC009W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "ACC009w_01DAO.";
	
	public List<Map<String, Object>> SELECT_BUDGET(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_BUDGET",param,result );
		return list;
	}
	
		
	public boolean DELETE_ACC( CommonMap param ){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			
			sqlSession.insert(NAMEPSACE+"DELETE_ACC" , param);

		 	//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//
	
	
	public boolean save( CommonMap param 
						,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				
				int Duple = (Integer)sqlSession.selectOne(NAMEPSACE+"EXIST_BUDGET" ,info);
				if(Duple == 0){
					sqlSession.insert(NAMEPSACE+"INSERT_ACC_BUDGET" , info);
				}else{
					sqlSession.update(NAMEPSACE+"UPDATE_ACC_BUDGET" , info);
				}
				
			}/// for
			
			
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
