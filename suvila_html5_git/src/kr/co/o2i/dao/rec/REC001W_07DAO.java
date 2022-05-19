package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC001W_07DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC001w_07DAO.";
	
	
	/* 전각  */
	public boolean JungakSave( CommonMap param					    
							  ,List<Map<String, Object>> addList
							  ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				sqlSession.update(NAMEPSACE+"UPDATE_Jungak"    , info);
				
			}// for upt
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				String JUNGAK_CD = StringUtil.ObjToStr(sqlSession.selectOne(NAMEPSACE+"SELECT_jungak_cd")) ;
				info.put("JUNGAK_CD", JUNGAK_CD);
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_Jungak"    , info);
				
				
			}// for add
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	/* 등 */
	public boolean GradeSave( CommonMap param					    
							 ,List<Map<String, Object>> addList
							 ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("FAMILY_YN"   , StringUtil.StrBolToTF( info.get("FAMILY_YN")+"" ));
				info.put("DEATH_YN"    , StringUtil.StrBolToTF( info.get("DEATH_YN")+"" ));
				
				sqlSession.update(NAMEPSACE+"UPDATE_Grade"    , info);
				
			}// for upt
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("FAMILY_YN"   , StringUtil.StrBolToTF( info.get("FAMILY_YN")+"" ));
				info.put("DEATH_YN"    , StringUtil.StrBolToTF( info.get("DEATH_YN")+"" ));
				
				sqlSession.insert(NAMEPSACE+"INSERT_Grade"    , info);
				
				
			}// for add
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	public boolean AmountSave( CommonMap param					    
							  ,List<Map<String, Object>> addList
							  ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_REC_DEUNG_PRICE_MGT"    , info);
			}// upt for
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_REC_DEUNG_PRICE_MGT"    , info);
			}// add for
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}		
		return true;
	}
	
	public List<Map<String, Object>> select_Deung(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Deng_NEW",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> select_SindoInfo(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		if( "2".equals(param.getString("V_ACCEPT_GBN")) ) {
			sqlSession.select(NAMEPSACE+"SELECT_SindoInfo"+param.getString("V_ACCEPT_GBN"),param,result );
		}else {
			sqlSession.select(NAMEPSACE+"SELECT_SindoInfo",param,result );
		}
		
		return list;
	}
	
	public boolean Deung_proc( CommonMap param 
							  ,List<Map<String, Object>> addList
							  ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				System.out.println("UPDATE INFO = "+ info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_Building"    , info);
				
				sqlSession.update(NAMEPSACE+"REC_002W_10",info);
			}// upt for
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_Building"    , info);
				
				
				sqlSession.selectOne(NAMEPSACE+"REC_002W_10",info);
			}// add for
			
			
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}		
		return true;
	}//
	
	public boolean select_Clear( CommonMap param ){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			sqlSession.selectOne(NAMEPSACE+"REC_002W_10_CLEAR",param);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// 
            

}
