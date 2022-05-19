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
public class SER033W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER033w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_DONATION_PRINT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_DONATION_PRINT_MGT",param,result );
		return list;
	}
	
	public boolean save( CommonMap param
				        ,List<Map<String, Object>> uptList ) {
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_DONATION_PRINT_MGT", info);
			}
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//
	
	
}//SER033W_01DAO
