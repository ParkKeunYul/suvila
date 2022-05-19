package kr.co.o2i.dao.cad;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class CAD001W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "CAD001w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_NAME_CARD(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD",param,result );
		return list;
	}
	
	
	public void INSERT_NAME_CARD(CommonMap param){
		sqlSession.insert(NAMEPSACE+"SELECT_NAME_CARD",param );
	}
	
	public void UPDATE_NAME_CARD(CommonMap param){
		sqlSession.update(NAMEPSACE+"UPDATE_NAME_CARD",param );
	}
	
	public void DELETE_NAME_CARD(CommonMap param){
		sqlSession.delete(NAMEPSACE+"DELETE_NAME_CARD",param );
	}
	
	
	public List<Map<String, Object>> SELECT_NAME_CARD_GROUP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD_GROUP",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_NAME_CARD_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD_INFO",param,result );
		return list;
	}
	
	
	public boolean onDelete( CommonMap param
	          				,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"DELETE_NAME_CARD", info);
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
	
	public boolean onSave( CommonMap param
						  ,List<Map<String, Object>> addList
						  ,List<Map<String, Object>> uptList
						  ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			System.out.println("addList = "+ addList.size());
			System.out.println("uptList = "+ uptList.size());
			System.out.println("delList = "+ delList.size());
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.update(NAMEPSACE+"DELETE_NAME_CARD", info);
				
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
			
				
				sqlSession.update(NAMEPSACE+"UPDATE_NAME_CARD", info);
				
			}
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.update(NAMEPSACE+"INSERT_NAME_CARD", info);
				
			}
			
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
	}
	
}
