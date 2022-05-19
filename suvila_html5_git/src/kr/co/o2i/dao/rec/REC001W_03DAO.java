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
public class REC001W_03DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC001w_03DAO.";
	
	public List<Map<String, Object>> SELECT_IDKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_IDKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_JGKIND(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_JGKIND",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_IDREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_IDREC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YDREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YDREC",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_DONGCHAM(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DONGCHAM",param,result );
		return list;
	}
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			sqlSession.delete(NAMEPSACE+"DELETE_ALL_DONGCHAM",  param);
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("TEMPLE_CD", param.get("V_TEMPLE_CD"));
				info.put("UPT_USER" , param.get("V_C_USER_ID"));
				info.put("CRT_USER" , param.get("V_C_USER_ID"));
				info.put("REMOTE"   , param.get("V_REMOTE"));
				
				
				String ACCEPT_GBN = StringUtil.ObjToStr(info.get("ACCEPT_GBN")); 
				
				if("2".equals(ACCEPT_GBN)){
					sqlSession.insert(NAMEPSACE+"INSERT_INDEUNG_JOIN"  , info);
				}else if("4".equals(ACCEPT_GBN)) {
					sqlSession.insert(NAMEPSACE+"INSERT_YEONDEUNG_JOIN"  , info);
				}else if("12".equals(ACCEPT_GBN)) {
					sqlSession.insert(NAMEPSACE+"INSERT_WONBUL_JOIN"  , info);
				}
			}//for
			
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			return false;
		}
		return true;
			            
	}
            

}
