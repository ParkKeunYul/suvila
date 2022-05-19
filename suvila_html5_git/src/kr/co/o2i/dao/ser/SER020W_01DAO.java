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
public class SER020W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER020w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ASP_ANNOUNCE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_ANNOUNCE",param,result );
		return list;
	}
	
	
	public boolean announceSave( CommonMap param
							   ,List<Map<String, Object>> addList
							   ,List<Map<String, Object>> uptList
							   ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_ANNOUNCE", info);
			}// for
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("UPT_USER"    , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				String SQL_MODE = StringUtil.ObjToStr(info.get("SQL_MODE"),"");
				if(!"S".equals(SQL_MODE)){
					sqlSession.update(NAMEPSACE+"UPDATE_ASP_ANNOUNCE"    , info);
				}
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"    , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_ANNOUNCE"    , info);
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
