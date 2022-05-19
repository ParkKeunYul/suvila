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
public class SER021W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER021w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SY_MENU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SY_MENU",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SY_BUDMENU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SY_BUDMENU",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SY_USER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_SY_USER",param,result );
		return list;
	}

	
	public boolean budMenuSave( CommonMap param
							   ,List<Map<String, Object>> addList
							   ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_ADMIN_ID"  , param.getString("V_ADMIN_ID"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_SY_BUDMENU", info);
			}// for
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_ADMIN_ID"  , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				String SQL_MODE = StringUtil.ObjToStr(info.get("SQL_MODE"),"");
				if(!"S".equals(SQL_MODE)){
					
					System.out.println(info);
					
					sqlSession.insert(NAMEPSACE+"INSERT_SY_BUDMENU"    , info);
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

	
	
	
}//SER021W_01DAO
