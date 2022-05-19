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
public class REC020W_05DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC020w_05DAO.";
	
	public List<Map<String, Object>> SELECT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_MGT_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MGT_DETAIL",param,result );
		return list;
	}
	
	public Map<String, Object> GeneralSave(  CommonMap param				
							   				,List<Map<String, Object>> addList
							   				,List<Map<String, Object>> uptList
							   				,List<Map<String, Object>> delList) {
		
		
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("success", true);
		retMap.put("msg", Const.SUC_MSG);
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				int USE_COUNT = StringUtil.ObjectToInt(sqlSession.selectOne(NAMEPSACE+"selectMgtCount", info));
				if(USE_COUNT > 0) {
					retMap.put("success", false);
					retMap.put("msg", "사용중인 상세목록입니다. 삭제할 수 없습니다.");
					return retMap;
				}
				
				
				sqlSession.update(NAMEPSACE+"DELETE_MGT"    , info);
			}//for
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_MGT"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				//info.put("SET_YN"      , StringUtil.StrBolToTF( info.get("SET_YN")+"" ));
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_MGT"    , info);
							
			}//for
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			retMap.put("success", false);
			retMap.put("msg", Const.ERR_MSG);
			return retMap;
		}
		return retMap;
		
	}// GeneralSave
	
	public Map<String, Object> detailSave( CommonMap param				
							  		   			  ,List<Map<String, Object>> addList
							  		   			  ,List<Map<String, Object>> uptList
							  		   			  ,List<Map<String, Object>> delList) {
	
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("success", true);
		retMap.put("msg", Const.SUC_MSG);
		
		try {
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				String FDATE = StringUtil.ObjToStr(info.get("FDATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("FDATE", FDATE.substring(0, 8));
				String RDATE = StringUtil.ObjToStr(info.get("RDATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("RDATE", RDATE.substring(0, 8));
				
				
				int USE_COUNT = StringUtil.ObjectToInt(sqlSession.selectOne(NAMEPSACE+"selectMgtUseYN", info));
				if(USE_COUNT > 0) {
					retMap.put("success", false);
					retMap.put("msg", "사용중인 상세목록입니다. 삭제할 수 없습니다.");
					return retMap;
				}
				sqlSession.update(NAMEPSACE+"DELETE_MGT_DETAIL"    , info);
			}//for
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				
				String FDATE = StringUtil.ObjToStr(info.get("FDATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("FDATE", FDATE.substring(0, 8));
				String RDATE = StringUtil.ObjToStr(info.get("RDATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("RDATE", RDATE.substring(0, 8));
				
				sqlSession.update(NAMEPSACE+"UPDATE_MGT"    , info);
			}//for
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_MGT_DETAIL"    , info);
							
			}//for
			
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			retMap.put("success", false);
			retMap.put("msg", Const.ERR_MSG);
			return retMap;
		}
		return retMap;
	}
		
}
