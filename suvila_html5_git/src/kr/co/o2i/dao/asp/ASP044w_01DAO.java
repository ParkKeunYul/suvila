package kr.co.o2i.dao.asp;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CreateAreaCode;
import kr.co.o2i.util.StringUtil;

@Repository
public class ASP044w_01DAO extends DefaultDAO{

	public String NAMEPSACE = "ASP044w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_IDREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC001w_03DAO.SELECT_IDREC",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_Building(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC001w_10DAO.SELECT_Building",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_Deng_NEW(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC001w_07DAO.SELECT_Deng_NEW",param,result );
		return list;
	}
	
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_IEDUNG_CLOSE_YN", info );
				
				String V_REMARK  = "인등 "+info.get("ACCEPT_SEQ")+"_"+info.get("SEQ")+"_";
					   V_REMARK += info.get("LIGHT_NM") + "_"+info.get("LIGHT_NM") + "번호 _";
					   V_REMARK += info.get("CLOSE_YN")  + "로 상태변경";
				
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "인등_소등");
			    
				
				sqlSession.update(NAMEPSACE+"INSERT_CSUPDATE", info );
				
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
	
	public List<Map<String, Object>> SELECT_YDREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC001w_03DAO.SELECT_YDREC",param,result );
		
		return list;
	}
	
	public boolean ydsave( CommonMap param					    
						  ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_YDUNG_CLOSE_YN", info );
				
				String V_REMARK  = "인등 "+info.get("ACCEPT_SEQ")+"_"+info.get("SEQ")+"_";
					   V_REMARK += info.get("LIGHT_NM") + "_"+info.get("LIGHT_NM") + "번호 _";
					   V_REMARK += info.get("CLOSE_YN")  + "로 상태변경";
				
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "연등_소등");
			    
				
				sqlSession.update(NAMEPSACE+"INSERT_CSUPDATE", info );
				
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
	
}
