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
public class ASP044w_04DAO extends DefaultDAO{

	
	public String NAMEPSACE = "ASP044w_04DAO.";
	
	
	public List<Map<String, Object>> SELECT_SINDO_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		if("".equals(param.getString("V_NAME_KOR", ""))) {
			sqlSession.select(NAMEPSACE+"SELECT_SINDO_INFO",param,result );
		}else {
			sqlSession.select(NAMEPSACE+"SELECT_SINDO_NAME_INFO",param,result );
		}
		
		return list;
	}	
	
	
	public List<Map<String, Object>> SELECT_SIN_DEATH_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select("SIN001p_03DAO.SELECT_SIN_DEATH_INFO",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SIN_BRANCH_FAMILY_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_BRANCH_FAMILY_HIS",param,result );
		
		return list;
	}
	
	public boolean saveSindoInfo( CommonMap param
								 ,List<Map<String, Object>> uptList
								 ,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.delete(NAMEPSACE+"UPDATE_SINDO_INFO", info );
				
				String V_REMARK = "신도관리 "+info.get("BUD_NO")+"_"+info.get("NAME_KOR")+"_"+info.get("DEL_YN") +"_로 상태변경" ;
				
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "신도관리");
				
				sqlSession.update("ASP044w_01DAO.INSERT_CSUPDATE", info );
				
			}
			
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_SINDO_INFO", info );
				
				String V_REMARK = "신도관리 "+info.get("BUD_NO")+"_"+info.get("NAME_KOR")+"_DB에서 완전 삭제" ;
				
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "신도관리");
				
				sqlSession.insert("ASP044w_01DAO.INSERT_CSUPDATE", info );
			}
			
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	
	public boolean delete_branch( CommonMap param								 
								 ,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.insert(NAMEPSACE + "DELETE_BRANCH", info );
				
			}
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
}
