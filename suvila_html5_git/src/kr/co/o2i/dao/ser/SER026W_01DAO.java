package kr.co.o2i.dao.ser;

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
public class SER026W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER026w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_BON(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_BON",param,result );
		return list;
	}
	
	
	public boolean save( CommonMap param					    
					    ,List<Map<String, Object>> addList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"    , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
			
				
				int Duple = (Integer)sqlSession.selectOne(NAMEPSACE+"DUPLE_BON", info);
				
				System.out.println("Duple = "+ Duple);
				
				if(Duple == 0){
					sqlSession.insert(NAMEPSACE+"INSERT_BON"    , info);
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

	
	
	
}//SER020W_01DAO
