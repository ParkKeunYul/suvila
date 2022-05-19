package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class SIN001W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SIN_CARD_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CARD_MASTER",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BUNGA(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_BUNGA",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SIN_CARD_MASTER_NAME_EXIST(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CARD_MASTER_NAME_EXIST",param,result );
		
		System.out.println("SELECT_SIN_CARD_MASTER_NAME_EXIST = "+list.size());
		
		return list;
	}
	
	
	public String SELECT_NEXT_BUDCD(CommonMap param){
		return (String)sqlSession.selectOne(NAMEPSACE+"SELECT_NEXT_BUDCD",param );
	}
	
	
	
	public boolean SindoSave( CommonMap param					    
							 ,List<Map<String, Object>> addList
							 ,List<Map<String, Object>> uptList
							 ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			String CHANGE_DAEUJU_BUD_NO = "";
			String ODL_DAEUJU_BUD_NO    = "";
			String BUD_CODE = "";
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				BUD_CODE = StringUtil.ObjToStr( info.get("BUD_CODE") );
				
				sqlSession.update(NAMEPSACE+"DELETE_SIN_CARD_MASTER"    , info);
			}//for
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				BUD_CODE = StringUtil.ObjToStr( info.get("BUD_CODE") );
				
				ODL_DAEUJU_BUD_NO = StringUtil.ObjToStr( info.get("DAEUJU_BUD_NO") );
				
				boolean iDAEJU_YN = false;
				String  sDAEJU_YN = "";
				
				try {
					iDAEJU_YN = (boolean)info.get("DAEJU_YN");
				}catch (Exception e) {
					sDAEJU_YN = StringUtil.ObjToStr(info.get("DAEJU_YN"));
				}
				
				if( iDAEJU_YN || "1".equals(sDAEJU_YN) ){
					CHANGE_DAEUJU_BUD_NO = StringUtil.ObjToStr( info.get("BUD_NO") );
				}
				System.out.println(i+" = "+info);
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				BUD_CODE = StringUtil.ObjToStr( info.get("BUD_CODE") );
				
				ODL_DAEUJU_BUD_NO = StringUtil.ObjToStr( info.get("DAEUJU_BUD_NO") );
				
				boolean iDAEJU_YN = false;
				String  sDAEJU_YN = "";
				
				try {
					iDAEJU_YN = (boolean)info.get("DAEJU_YN");
				}catch (Exception e) {
					sDAEJU_YN = StringUtil.ObjToStr(info.get("DAEJU_YN"));
				}
				
				if( iDAEJU_YN || "1".equals(sDAEJU_YN) ){
					CHANGE_DAEUJU_BUD_NO = StringUtil.ObjToStr( info.get("BUD_NO") );
				}
				
				String SQL_MODE = StringUtil.ObjToStr(info.get("SQL_MODE"));
				if("I".equals(SQL_MODE)){
					sqlSession.insert(NAMEPSACE+"ADD_SIN_CARD_MASTER"    , info);
				}
				
				
			}//for
			
			System.out.println("CHANGE_DAEUJU_BUD_NO = "+ CHANGE_DAEUJU_BUD_NO);
			
			
			if(!CHANGE_DAEUJU_BUD_NO.equals(ODL_DAEUJU_BUD_NO)) {
				param.put("V_DAEJU_BUD_NO", CHANGE_DAEUJU_BUD_NO);
				
				param.put("BUD_CODE", BUD_CODE);
				
				sqlSession.update(NAMEPSACE+"UPDATE_DAEJU_NO"    , param);
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
	
	public boolean newSindoSave( CommonMap param					    
								,List<Map<String, Object>> addList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				info.put("V_BUD_CODE"  , param.getString("V_BUD_CODE"));
				info.put("V_GBN_CODE"  , param.getString("V_GBN_CODE"));
				
				
				System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER"    , info);
			}// for
			
			param.put("V_DAEJU_BUD_NO", (String)sqlSession.selectOne(NAMEPSACE+"SELECT_DAEJU_NO", param));
			
			sqlSession.update(NAMEPSACE+"UPDATE_NEW_DAEJU_NO" , param);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
			 	 			 
			 
	public List<Map<String, Object>> SELECT_SIN_DEATH_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_DEATH_INFO",param,result );
		return list;
	}
	
}
