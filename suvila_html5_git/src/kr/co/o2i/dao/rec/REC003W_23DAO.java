package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC003W_23DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC003w_23DAO.";
	
	
	
	public List<Map<String, Object>> SELECT_SAGU(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SAGU",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_49KIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SAGU_KIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SAGU_DEATH(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SAGU_DEATH",param,result );
		
		return list;
	}

	public List<Map<String, Object>> SELECT_SAGU_BOK(CommonMap param){
	
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SAGU_BOK",param,result );
		
		return list;
	}
	
	
	public boolean saveSaguJaeKind( CommonMap param
								   ,List<Map<String, Object>> uptList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_49KIND", info);
				
				info.put("RESERVED6" , info.get("ACCEPT_SEQ")+"|"+info.get("SEQ"));
				info.put("CODE"      , 5);
				
				String EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE"));
				EVENT_DATE = EVENT_DATE.replaceAll("-", "").replaceAll("/", "");				
				EVENT_DATE = EVENT_DATE.substring(0, 8);
				
				
				if("T".equals( StringUtil.ObjToString(info.get("LUNAR_SOLAR"), "")  )){
					LunarCalendar lc = new LunarCalendar() ;
					info.put("EVENT_DATE", lc.fromLunar(EVENT_DATE) );
				}else{
					info.put("EVENT_DATE", EVENT_DATE);
				}
				
				CommonUtil.uptSmsMsgProc(sqlSession, info);
				
			}
			
			
			//txManager.rollback(status);
			 txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			return false;
		}
		return true;
		
		
	}// sav
			
	public boolean saveYoungga( CommonMap param
							   ,List<Map<String, Object>> uptList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			 
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_49_YOUNGGA", info);
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
	
	public boolean saveBokwi( CommonMap param
							 ,List<Map<String, Object>> addList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			sqlSession.insert(NAMEPSACE+"DELETE_49BOKWI_ALL", param);
			
			for(int i = 0; i< addList.size(); i++) {
				Map<String, Object> info = addList.get(i);
				info.put("TEMPLE_CD"       , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"          , param.getString("V_REMOTE"));
				info.put("V_USER_ID"       , param.getString("V_USER_ID"));
				info.put("V_MAIN_BOKWI"    , StringUtil.StrBolToTF(info.get("MAIN_BOKWI")+""));
				
				// System.out.println("info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_49BOKWI", info);
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
