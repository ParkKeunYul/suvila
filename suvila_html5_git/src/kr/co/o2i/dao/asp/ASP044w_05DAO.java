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
public class ASP044w_05DAO extends DefaultDAO{

	
	public String NAMEPSACE = "ASP044w_05DAO.";
	
	
	public List<Map<String, Object>> SELECT_SINDO_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CMS_INFO",param,result );
		
		return list;
	}	
	
	
	public boolean saveCmsInfo( CommonMap param
							   ,List<Map<String, Object>> uptList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.delete(NAMEPSACE+"UPDATE_CMS_INFO", info );
				
				String V_REMARK = "CMS관리 "+info.get("BUD_NO")+"_"+info.get("NAME_KOR");
					  V_REMARK += info.get("CMS_TRADE_CD")+"_"+info.get("IF_PAYMENT_BANK_CD");
					  V_REMARK += info.get("IF_PAYMENT_ACCOUNT")+"_"+info.get("ACCOUNT_SEQ");
					  V_REMARK +=  info.get("REG_GBN") +"_로 상태변경" ;
			    info.put("V_REMARK", V_REMARK);
			    info.put("V_MENU_NAME", "CMS관리");
				
				sqlSession.update("ASP044w_01DAO.INSERT_CSUPDATE", info );
				
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
