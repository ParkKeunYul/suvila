package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC004W_07DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC004w_07DAO.";
	
	public List<Map<String, Object>> SELECT_mgt(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_mgt",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_event(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_event",param,result );
		return list;
	}
	
	
	
	public boolean GeneralSave( CommonMap param
							   ,List<Map<String, Object>> addList
							   ,List<Map<String, Object>> uptList) {
	
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("SET_YN"      , StringUtil.StrBolToTF( info.get("SET_YN")+"" ));
				
				sqlSession.update(NAMEPSACE+"UPDATE_mgt"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("SET_YN"      , StringUtil.StrBolToTF( info.get("SET_YN")+"" ));
				
				sqlSession.insert(NAMEPSACE+"INSERT_mgt"    , info);
							
			}//for
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;

	}
	
	public Map<String, Object> DetailSave( CommonMap param
							   ,List<Map<String, Object>> addList
							   ,List<Map<String, Object>> uptList
							   ,List<Map<String, Object>> delList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		
		Map<String, Object> retInfo = new HashMap<String, Object>();
		retInfo.put("result", true);
		try {
			
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				int cnt = StringUtil.ObjToInt(sqlSession.selectOne(NAMEPSACE+"SELECT_REC", info));
				if(cnt > 0) {
					retInfo.put("msg", "접수 기록이 있는 입제일은 삭제할수 없습니다.");
					retInfo.put("result", false);
					return retInfo;
				}
				
				sqlSession.delete(NAMEPSACE+"DELETE_event"    , info);
			}//for
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("COMPLET_YN"  , StringUtil.StrBolToTF( info.get("COMPLET_YN")+"" ));
				
				String EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE"), "").replaceAll("-", "").replaceAll("/", "");
				info.put("EVENT_DATE", EVENT_DATE.substring(0, 8));
				
				
				String EVENT_DATE_TEMP = StringUtil.ObjToStr(info.get("EVENT_DATE_TEMP"), "").replaceAll("-", "").replaceAll("/", "");
				
				if(!EVENT_DATE_TEMP.equals(EVENT_DATE)) {
					int cnt = StringUtil.ObjToInt(sqlSession.selectOne(NAMEPSACE+"SELECT_REC", info));
					if(cnt > 0) {
						retInfo.put("msg", "접수 기록이 있는 입제일은 날짜를 변경 할수 없습니다.");
						retInfo.put("result", false);
						return retInfo;
					}
				}
				
				sqlSession.update(NAMEPSACE+"UPDATE_event"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("COMPLET_YN"  , StringUtil.StrBolToTF( info.get("COMPLET_YN")+"" ));
				
				String EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("EVENT_DATE", EVENT_DATE.substring(0, 8));
				
				sqlSession.insert(NAMEPSACE+"INSERT_event"    , info);
							
			}//for
			
			retInfo.put("result", true);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			retInfo.put("msg", Const.ERR_MSG);
			retInfo.put("result", false);
		}
		return retInfo;
	}
}
