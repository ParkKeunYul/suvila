package kr.co.o2i.dao.rec;

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
public class REC002W_09DAO  extends DefaultDAO{

	
	public String  NAMEPSACE = "REC002W_09DAO.";
	
	
	public List<Map<String, Object>> SELECT_Ing(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Ing",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_General(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_General",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_Detail(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Detail",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_Detail_TEMP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Detail_TEMP",param,result );
		return list;
	}
	
	public boolean IngSortSave( CommonMap param
							   ,List<Map<String, Object>> uptList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				sqlSession.update(NAMEPSACE+"UPDATE_SORT_Ing",info);
			}// for i
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	// 신 생 백 정 보 정 보 성
	
	public boolean GeneralSave( CommonMap param
							   ,List<Map<String, Object>> newList
							   ,List<Map<String, Object>> uptList
							   ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			for(int i = 0; i< delList.size(); i++) {
				Map<String, Object> info = delList.get(i);
				sqlSession.update(NAMEPSACE+"DELETE_General", info);
				
			}// for uptList
			
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_General", info);
				
			}// for uptList
			
			
			for(int i = 0; i< newList.size(); i++) {
				Map<String, Object> info = newList.get(i);
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"INSERT_General", info);
				
			}// for newList
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			
			return false;
		}
		return true;
	}//IngSortSave
	
	
	public boolean DetailSave( CommonMap param
							  ,List<Map<String, Object>> newList
							  ,List<Map<String, Object>> uptList
							  ,List<Map<String, Object>> delList){
				
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			for(int i = 0; i< delList.size(); i++) {
				Map<String, Object> info = delList.get(i);
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"DELETE_Detail", info);
				
			}// for uptList
			
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				info.put("USE_YN", StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("FDATE", StringUtil.ObjToStr( info.get("FDATE") ).replaceAll("-", "").substring(0, 8) );
				info.put("RDATE", StringUtil.ObjToStr( info.get("RDATE") ).replaceAll("/", ""));
				
			//	System.out.println("uptInfo = "+ info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_Detail", info);
				
			}// for uptList
			
			
			for(int i = 0; i< newList.size(); i++) {
				Map<String, Object> info = newList.get(i);
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				info.put("USE_YN", StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("FDATE", StringUtil.ObjToStr( info.get("FDATE") ).replaceAll("-", "").substring(0, 8) );
				info.put("RDATE", StringUtil.ObjToStr( info.get("RDATE") ).replaceAll("/", ""));
				info.put("AMT",  StringUtil.ObjToInt( info.get("AMT")  , 0) );
				
				System.out.println(info);
				
				
				sqlSession.update(NAMEPSACE+"INSERT_Detail", info);
				
			}// for newList
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			return false;
		}
		return true;
	}//IngSortSave
	/*
	public  List<Map<String,Object>> SELECT_Ing(@Param("param")CommonMap param);
	
	public  void UPDATE_SORT_Ing(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_General(@Param("param")CommonMap param);
	
	public  void INSERT_General(@Param("param")CommonMap param);
	
	public  void UPDATE_General(@Param("param")CommonMap param);
	
	public  void DELETE_General(@Param("param")CommonMap param);
	
	List<Map<String,Object>> SELECT_Detail(@Param("param")CommonMap param);
	
	List<Map<String,Object>> SELECT_Detail_TEMP(@Param("param")CommonMap param);
	
	public  void INSERT_Detail(@Param("param")CommonMap param);
	
	public  void UPDATE_Detail(@Param("param")CommonMap param);
	*/
}
