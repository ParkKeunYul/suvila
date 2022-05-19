package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;
@Repository
public class CodeSearchProcDAO extends DefaultDAO{
	
	public String NAMEPSACE = "CodeSearchProcDAO.";
	
	
	public boolean mokSave( CommonMap param
						   ,List<Map<String, Object>> addList
						   ,List<Map<String, Object>> uptList
						   ,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{

			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
			
				sqlSession.delete(NAMEPSACE+"DELETE_Accounts", info);
			}// del

			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("UPT_USER"    , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_Accounts"    , info);
			}// upt

			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"    , param.getString("V_ADMIN_ID"));				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				
				String SQL_MODE = StringUtil.ObjToStr(info.get("SQL_MODE"),"");
				if("S".equals(SQL_MODE)){
					sqlSession.insert(NAMEPSACE+"INSERT_Accounts"    , info);
				}
			}// add
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;

	} // mokSave
	
	public boolean sindoClassMgtSave( CommonMap param
									 ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			
			String CLASS_CD = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_CLASS_CD", param);
			System.out.println("CLASS_CD = "+ CLASS_CD);
			System.out.println("CLASS_CD = "+ CLASS_CD);
			System.out.println("CLASS_CD = "+ CLASS_CD);
			System.out.println("CLASS_CD = "+ CLASS_CD);
			
			param.put("CLASS_CD", CLASS_CD);
			
			
			sqlSession.insert(NAMEPSACE+"INSERT_SIN_CLASS_MGT", param);
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));				
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				info.put("CLASS_CD"    , param.getString("CLASS_CD"));
				
				System.out.println(info);
				
				int cnt = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_CLASS_CNT", info);
				
				if(cnt == 0) {
					sqlSession.insert(NAMEPSACE+"INSERT_SindoClass"    , info);
				}
				
			}// add
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// sindoClassMgtSave
	
	public boolean sindoClassSave( CommonMap param
								  ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));				
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				
				int cnt = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_CLASS_CNT", info);
				
				if(cnt == 0) {
					sqlSession.insert(NAMEPSACE+"INSERT_SindoClass"    , info);
				}
				
			}// add
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// sindoClassSave
		
	
}// CodeSearchProcDAO
