package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class ASP005w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP005w_01DAO.";
	
	public List<Map<String, Object>> SELECT_SY_MENU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SY_MENU",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SEL_SEAR_TEMPLE_MENU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SEL_SEAR_TEMPLE_MENU",param,result );
		return list;
	}
	
	public boolean transactBaseMenuSave(CommonMap param
									   ,List<Map<String, Object>> addList
									   ,List<Map<String, Object>> uptList
			                           ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				
				sqlSession.delete(NAMEPSACE+"DELETE_PERSON_TEMPLE_All_MENU", info);
				sqlSession.delete(NAMEPSACE+"DELETE_AUTH_TEMPLE_All_MENU", info);
				sqlSession.delete(NAMEPSACE+"DELETE_SEAR_TEMPLE_All_MENU", info);
				sqlSession.delete(NAMEPSACE+"DELETE_STANDARD_MENU", info);
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				sqlSession.insert(NAMEPSACE+"UPDATE_STANDARD_MENU", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				sqlSession.insert(NAMEPSACE+"INSERT_STANDARD_MENU", info);
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
	
	
	public boolean transactLeftMenuSave(CommonMap param
									   ,List<Map<String, Object>> addList
						               ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_PERSON_MENU", info);
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_AUTH_MENU", info);
				sqlSession.delete(NAMEPSACE+"DELETE_SEAR_TEMPLE_MENU", info);
			}
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID", param.getString("V_USER_ID"));
				info.put("V_REMOTE" , param.getString("V_REMOTE"));
				System.out.println(info);
				sqlSession.insert(NAMEPSACE+"INSERT_SEAR_TEMPLE_MENU", info);
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
	
	
	
	
	
}//ASP005w_01DAO
