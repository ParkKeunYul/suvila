package kr.co.o2i.dao.asp;

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
public class ASP044w_03DAO extends DefaultDAO{

	
	public String NAMEPSACE = "ASP044w_03DAO.";
	
	
	public List<Map<String, Object>> SELECT_REC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC025W_01DAO.SELECT_REC",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_REC_DETAIL_TYPE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select("REC025W_01DAO.SELECT_REC_DETAIL_TYPE",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_REC_TEMPLE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE + "SELECT_REC_TEMPLE",param,result );
		
		return list;
	}
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_REC_SUB", info );
				
				String V_REMARK  = "접수관리 "+info.get("ACCEPT_SEQ")+"_"+info.get("SEQ")+"_";
					   V_REMARK += info.get("DEL_YN")  + "로 상태변경";
				
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "접수관리");
			    
				
				sqlSession.update("ASP044w_01DAO.INSERT_CSUPDATE", info );
				
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
	
	public boolean savePayHis( CommonMap param					    
							  ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				sqlSession.update(NAMEPSACE+"UPDATE_MISU", info );
				
			}
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
}
