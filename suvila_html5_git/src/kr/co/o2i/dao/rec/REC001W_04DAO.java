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
public class REC001W_04DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC001w_04DAO.";
	
	
	/* 인등  조회 */
	public List<Map<String, Object>> SELECT_MISU(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MISU",param,result );
		
		return list;
	}
		
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> addList
			            ,List<Map<String, Object>> smsList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("TEMPLE_CD", param.get("V_TEMPLE_CD"));
				info.put("UPT_USER" , param.get("V_USER_ID"));
				info.put("CRT_USER" , param.get("V_USER_ID"));
				info.put("REMOTE"   , param.get("V_REMOTE"));
				
				System.out.println("info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_MISU", info);
				
			}//for
			
			if(smsList.size() > 0  ){
				CommonUtil.smsSend(sqlSession, param, smsList);
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
