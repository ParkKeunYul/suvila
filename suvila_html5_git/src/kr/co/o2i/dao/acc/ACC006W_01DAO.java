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
public class ACC006W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "ACC006w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ACC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ACC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_CHONGMU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_CHONGMU",param,result );
		return list;
	}
	
	public boolean appendAcc( CommonMap param					    
		    				 ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				String SQL_MODE  = StringUtil.ObjToStr(info.get("SQL_MODE"));
				
				if("S".equals(SQL_MODE)){
					info.put("V_USER_ID" , param.getString("V_USER_ID"));
					info.put("V_REMOTE"  , param.getString("V_REMOTE"));
					info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
					
					sqlSession.insert(NAMEPSACE+"INSERT_ACC"    , info);
				}
				
				else if("I".equals(SQL_MODE)){
					info.put("V_USER_ID" , param.getString("V_USER_ID"));
					info.put("V_REMOTE"  , param.getString("V_REMOTE"));
					info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
					
					sqlSession.insert(NAMEPSACE+"INSERT_ACC"    , info);
				}
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
	
	public boolean saveChongmu( CommonMap param					    
			 				   ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				info.put("I_AMOUNT", StringUtil.ObjToInt(info.get("I_AMOUNT") , 0));
				info.put("O_AMOUNT", StringUtil.ObjToInt(info.get("O_AMOUNT") , 0));
				
				sqlSession.insert(NAMEPSACE+"UPDATE_CHONGMU"    , info);
			}//for
			//txManager.rollback(status);
			txManager.commit(status);
			
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//saveChongmu
	
	
}
