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
public class ASP001w_01DAO extends DefaultDAO {
	
	public String NAMEPSACE = "ASP001w_01DAO.";
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_MASTER",param,result );
		return list;
	}

	
	public int IsExit_TempleId( CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"ISEXIT_TEMPLEID", param);
	}
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_APPROVAL_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_APPROVAL_MGT",param,result );
		return list;
	}
	
	public boolean INSERT_ASP_TEMPLE_MASTER(CommonMap param
										   ,boolean fileIsExit){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			String NEW_TEMPLE_CD = sqlSession.selectOne(NAMEPSACE+"SELECT_NEW_TEMPLE_CD")+"";
			
			
			System.out.println("NEW_TEMPLE_CD = "+ NEW_TEMPLE_CD);
			
			param.put("TEMPLE_CD", NEW_TEMPLE_CD);
			sqlSession.insert(NAMEPSACE+"INSERT_ASP_TEMPLE_MASTER", param);
			
			// 1.사용자정보 입력
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_USER_INSERT", param);
			// 2.메뉴구성 입력
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_MENU_INSERT", param);
			// 3.권한별메뉴 입력
			sqlSession.insert(NAMEPSACE+"ASP_AUTH_MENU_INSERT", param);
			// 4.개인별 메뉴 입력
			sqlSession.insert(NAMEPSACE+"ASP_PERSON_MENU_INSERT", param);
			// 5.계정회계분류
			sqlSession.insert(NAMEPSACE+"ACC_ACCOUNTS", param);
			// 6.기부금영수증 출력관리
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_DONATION_PRINT_MGT", param);
			// 7.결재기준관리
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_APPROVAL_MGT", param);
			// 8.문자관리
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_EVENT_ALARM_MGT", param);
			// 9.문자양식
			sqlSession.insert(NAMEPSACE+"ASP_TEMPLE_EVENT_ALARM_DOC", param);
						
			// 10 도장이미지
			if( fileIsExit ) sqlSession.insert(NAMEPSACE+ "INSERT_ASP_TEMPLE_FILE", param);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	public boolean UPDATE_ASP_TEMPLE_MASTER(CommonMap param
			                               ,boolean fileIsExit){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_MASTER", param);
			
			
			if( fileIsExit ){
				param.put("V_FILE_TEMPLE_CD", param.getString("TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+ "DELETE_ASP_TEMPLE_FILE", param);
				sqlSession.insert(NAMEPSACE+ "INSERT_ASP_TEMPLE_FILE", param);
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
	
	public int ASP_TEMPLE_FILE_CNT(CommonMap param){
		try{
			return (Integer)sqlSession.selectOne(NAMEPSACE +"ASP_TEMPLE_FILE_CNT", param);
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	
	public Map<String, Object> SELECT_ASP_TEMPLE_MASTER_FILE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_MASTER_FILE", param,result );
		return list.get(0);
		 
	}
	
	public boolean DELETE_ASP_TEMPLE_FILE(CommonMap param){
		try{
			sqlSession.delete(NAMEPSACE+"DELETE_ASP_TEMPLE_FILE",param);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
 	
	
	public boolean APPROVAL_SAVE( List<Map<String, Object>> addList
			                     ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<addList.size(); i++){
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_TEMPLE_APPROVAL_MGT", addList.get(i));
			}
			
			for(int i = 0; i<uptList.size(); i++){
				sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_APPROVAL_MGT", uptList.get(i));
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
	
	
	public boolean APPROVAL_DELETE(CommonMap param){
		try{
			sqlSession.delete(NAMEPSACE+"DELETE_ASP_TEMPLE_APPROVAL_MGT", param);
		}catch (Exception e) {
			e.printStackTrace();			
			return false;
		}	
		return true;
	}
	
	
	
	
}
