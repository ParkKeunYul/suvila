package kr.co.o2i.dao.asp;

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
public class AnnounceDAO extends DefaultDAO {

	/*달력 조회*/
	//public  List<Map<String,Object>> SELECT_CALENDER(@Param("param")CommonMap param);
	
	public String  NAMEPSACE = "AnnounceDAO.";
	
	public List<Map<String, Object>> ASP_ANCSELECT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"ASP_ANCSELECT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> ASP_ANCSELECT_TYPE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"ASP_ANCSELECT_TYPE",param,result );
		return list;
	}
	
	public List<Map<String, Object>> TEMPLE_ANCSELECT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"TEMPLE_ANCSELECT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_REQINFOVO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REQINFOVO",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_YEAR(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YEAR",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_MONTH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MONTH",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_CALENDER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CALENDER",param,result );
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> getNextDay(CommonMap param){
		return (Map<String, Object>)sqlSession.selectOne(NAMEPSACE+"getNextDay",param );		
	}
	
	
	public List<Map<String, Object>> SELECT_CALENDER_DAY(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CALENDER_DAY",param,result );
		return list;
	}
	
	public boolean reqSave( CommonMap param					    
		    			   ,List<Map<String, Object>> mainList
		    			   ,List<Map<String, Object>> smsList  ){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			
			for(int i = 0; i<mainList.size(); i++){
				Map<String, Object> info  = mainList.get(i);
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("UPT_USER"  , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"SinInfoUpdate",info);
				
				String ACCEPT_GBN = StringUtil.ObjToStr(info.get("ACCEPT_GBN"));
				System.out.println("ACCEPT_GBN = "+ ACCEPT_GBN);
				sqlSession.update(NAMEPSACE+"ReqInfoUpdate"+ACCEPT_GBN,info);
				
				
			}//
			
			
			System.out.println("smsList.size() = "+ smsList.size());
			
			
			
			if(smsList.size() > 0) {
				CommonUtil.smsSend(sqlSession, param, smsList);
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
