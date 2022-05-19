package kr.co.o2i.dao.sin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.util.CommonUtil;

@Repository
public class SIN001P_04DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_04DAO.";
	
	
	
	
	
	public Map<String, Object> saveUnionFam( CommonMap param					    
								 			,List<Map<String, Object>> addList ){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("success", true);
		resultMap.put("msg"    , Const.SUC_MSG);
		
		Map testMap = new HashMap<>();
		testMap.put("V_TEMPLE_CD", "000154");
		testMap.put("V_BUD_CODE", "01-00001-0");
		
		try {
			CommonUtil commonUtil = new CommonUtil();
			
			boolean V_SELECT_ALL = StringUtil.ObjToBol( param.getString("V_SELECT_ALL") );
			if(V_SELECT_ALL){
				//영가
				Result result = new Result();
				List<Map<String, Object>>  listDeath = result.resultList;
				sqlSession.select(NAMEPSACE+"SELECT_SIN_DEATH_LIST",param,result );
				
				
				
				if(listDeath.size() > 0){
					for(int index=0; index < listDeath.size(); index++){
						Map<String, Object> mapSindo = listDeath.get(index);
						mapSindo.put("V_TEMPLE_CD"	   , param.getString("V_TEMPLE_CD"));
						mapSindo.put("V_REMOTE"   	   , param.getString("V_REMOTE"));
						mapSindo.put("V_USER_ID"  	   , param.getString("V_USER_ID"));
						mapSindo.put("V_DAEJU_BUD_NO"  , param.getString("V_DAEJU_BUD_NO"));
						
						String NEW_BUD_CODE = StringUtil.ObjToStr(mapSindo.get("NEW_BUD_NO")).substring(0,10);
						mapSindo.put("NEW_BUD_CODE", NEW_BUD_CODE);
						
						
						
						
						/* 새 신도 번호 입력 */
						sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER_CHANGE", mapSindo);
						
						/* 신도번호 전체 변경 */
						Map<String, Object> changeInfo = new HashMap<String, Object>();
						changeInfo.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
						changeInfo.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
						changeInfo.put("O_BudCd"     , mapSindo.get("V_BUD_NO"));
						changeInfo.put("N_BudCd"     , mapSindo.get("NEW_BUD_NO"));
						changeInfo.put("PMFlag"      , "");
						changeInfo.put("CRT_USER"    , param.getString("V_USER_ID"));
						changeInfo.put("REMOTE"      , param.getString("V_REMOTE"));
						
						System.out.println("changeInfo = "+changeInfo);
						
						CommonUtil.changeBudCd2(sqlSession, changeInfo);
						
						/* 기존 신도 삭제 */
						sqlSession.insert(NAMEPSACE+"GET_DELETE_SIN_CARD_MASTER_SEQ", mapSindo);
						
					}// for
				}//listDeath
				
				// 기존삭제 신도 번호 비우기
				result = new Result();
				List<Map<String, Object>>  listDelete = result.resultList;
				
				
				sqlSession.select(NAMEPSACE+"SELECT_SIN_DELETE_LIST",param,result );
				
				if(listDelete.size() > 0 ){
					
					for(int index=0; index < listDelete.size(); index++){
						Map mapSindo = (Map)listDelete.get(index);
						mapSindo.put("V_TEMPLE_CD"	   , param.getString("V_TEMPLE_CD"));
						mapSindo.put("V_REMOTE"   	   , param.getString("V_REMOTE"));
						mapSindo.put("V_USER_ID"  	   , param.getString("V_USER_ID"));
						mapSindo.put("V_DAEJU_BUD_NO"  , param.getString("V_DAEJU_BUD_NO"));
						
						/* 새 신도 번호 입력 */
						sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER_CHANGE", mapSindo);
						
						
						/* 신도번호 전체 변경 */
						Map<String, Object> changeInfo = new HashMap<String, Object>();
						changeInfo.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
						changeInfo.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
						changeInfo.put("O_BudCd"     , mapSindo.get("V_BUD_NO"));
						changeInfo.put("N_BudCd"     , mapSindo.get("NEW_BUD_NO"));
						changeInfo.put("PMFlag"      , "");
						changeInfo.put("CRT_USER"    , param.getString("V_USER_ID"));
						changeInfo.put("REMOTE"      , param.getString("V_REMOTE"));
						
						/* 기존 신도 삭제 */
						sqlSession.insert(NAMEPSACE+"GET_DELETE_SIN_CARD_MASTER_SEQ", mapSindo);
						
					}// for
				}
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_PROPOSAL1", param);
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_PROPOSAL2", param);
				
			}// V_SELECT_ALL
			
			
		
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_BUD_CODE"  , param.getString("V_BUD_CODE"));
				
				
				
				String V_SORT_SEQ = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_BRANCH_BUD_NO", info);
				info.put("V_SORT_SEQ"  , V_SORT_SEQ);
				
				String V_BUD_NO = info.get("BUD_CODE") + "-"+commonUtil.emptyTozero(Integer.parseInt(V_SORT_SEQ),2);
				
				info.put("V_BUD_NO"  , V_BUD_NO);
				
												
				sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER_UNION", info);
				
				
				Map<String, Object> changeInfo = new HashMap<String, Object>();
				changeInfo.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				changeInfo.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				changeInfo.put("O_BudCd"     , info.get("BUD_NO"));
				changeInfo.put("N_BudCd"     , info.get("V_BUD_NO"));
				changeInfo.put("PMFlag"      , "2");
				changeInfo.put("CRT_USER"    , param.getString("V_USER_ID"));
				changeInfo.put("REMOTE"      , param.getString("V_REMOTE"));				
				boolean result1 = commonUtil.changeBudCd2(sqlSession, changeInfo); 
				
				
				changeInfo.put("PMFlag"      , "1");
				boolean result2 = commonUtil.changeBudCd2(sqlSession, changeInfo); 
				
				
				if(!result1 && !result2) {
					txManager.rollback(status);
					resultMap.put("success", false);
					resultMap.put("msg","합가 처리시 에러가 발생하였습니다." );
					return resultMap;
				}
				
				sqlSession.delete(NAMEPSACE+"DELETE_UNION_FAM", info);
				
			}//for
			
			String V_BRANCH_BUD_CODE = StringUtil.ObjToStr( param.get("V_BRANCH_BUD_CODE"),"" );
			if(!"".equals(V_BRANCH_BUD_CODE) && !V_SELECT_ALL ){
				
				String V_DAEJU_BUD_NO = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_BRANCH_UNION_DAEJU_BUD_NO", param);
				param.put("V_DAEJU_BUD_NO", V_DAEJU_BUD_NO );				
				param.put("V_BUD_CODE"    , V_BRANCH_BUD_CODE );	
				
				sqlSession.update(NAMEPSACE+"UPDATE_BRANCH_DAEJU_NO", param);
			}
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			resultMap.put("success", false);
			resultMap.put("msg","합가 처리시 에러가 발생하였습니다." );
			return resultMap;
		}
		return resultMap;
	}
	
}

