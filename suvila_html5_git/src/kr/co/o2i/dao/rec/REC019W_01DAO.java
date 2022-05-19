package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC019W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC019w_01DAO.";
	
	public List<Map<String, Object>> SELECT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_USER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_USER",param,result );
		return list;
	}
	
	public boolean saveMgt( CommonMap param					    
				    	   ,List<Map<String, Object>> addList
				    	   ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("CRT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("UPT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"    , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				sqlSession.insert(NAMEPSACE+"UPDATE_MGT"    , info);
				
			}// for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("UPT_USER"  , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"    , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				sqlSession.insert(NAMEPSACE+"INSERT_MGT"    , info);
			}//for
		
			 //txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// for
	
	
	public boolean saveDetail( CommonMap param					    
				    	   	  ,List<Map<String, Object>> addList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i<addList.size(); i++){
				String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
				
				Map<String, Object>  accRecInfo = new HashMap<String, Object>();
				accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
				accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
				accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
				accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
				accRecInfo.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				accRecInfo.put("ACCEPT_GBN"  , 10);
				accRecInfo.put("SEQ"  		 , 1);
				
				System.out.println(accRecInfo);
				
				sqlSession.insert(NAMEPSACE+"INSERT_MASTER", accRecInfo);
				sqlSession.insert(NAMEPSACE+"INSERT_SEQ", accRecInfo);
				
				
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("REMOTE"     , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				info.put("ACCEPT_SEQ" , ACCEPT_SEQ);
				
				sqlSession.insert(NAMEPSACE+"INSERT_DETAIL", info);
				sqlSession.insert(NAMEPSACE+"INSERT_MISU"  , info);
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
	
	public boolean saveUser( CommonMap param					    
						    ,List<Map<String, Object>> addList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("REMOTE"     , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_USER", info);
			}// for
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
}
