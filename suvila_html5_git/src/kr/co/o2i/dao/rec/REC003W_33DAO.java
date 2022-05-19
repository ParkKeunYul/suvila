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
public class REC003W_33DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC003w_33DAO.";
	
	
	
	public List<Map<String, Object>> SELECT_GIJAE(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GIJAE",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GIJAE_DEA(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GIJAE_DEA",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GIJAE_BOK(CommonMap param){
	
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GIJAE_BOK",param,result );
		
		return list;
	}
	
	
	
	/*public boolean saveSaguJaeKind( CommonMap param
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
*/			
	public boolean saveYoungga( CommonMap param
							   ,List<Map<String, Object>> uptList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			 
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_GIJE_YOUNGGA", info);
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
			
			sqlSession.insert(NAMEPSACE+"DELETE_GIJE_ALL", param);
			
			for(int i = 0; i< addList.size(); i++) {
				Map<String, Object> info = addList.get(i);
				info.put("TEMPLE_CD"       , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"          , param.getString("V_REMOTE"));
				info.put("V_USER_ID"       , param.getString("V_USER_ID"));
				info.put("V_MAIN_BOKWI"    , StringUtil.StrBolToTF(info.get("MAIN_BOKWI")+""));
				
				
				System.out.println("info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_GIJE", info);
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
	
	public boolean updateGije( CommonMap param
			   				  ,List<Map<String, Object>> uptList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				
				info.put("EVENT_TIME"  , StringUtil.ObjToStr(info.get("EVENT_TIME"), "").replaceAll(":", ""));
				
				String EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE"), "").replaceAll("-", "").replaceAll("/", "");
				System.out.println("");
					   EVENT_DATE = EVENT_DATE.substring(0, 8);
				info.put("EVENT_DATE", EVENT_DATE);
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_GIJE_EVENTDATE", info);
				
				
				info.put("CODE"      , 6);
				info.put("JESA_GUBUN", "");
				info.put("RESERVED6" , info.get("ACCEPT_SEQ")+"|"+ info.get("SEQ"));
				
				if("T".equals(info.get("LUNAR_SOLAR"))){
					LunarCalendar lc = new LunarCalendar() ;
					info.put("EVENT_DATE", lc.fromLunar(EVENT_DATE));
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
		
	}
	
}
