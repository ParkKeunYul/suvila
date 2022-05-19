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
public class SIN001P_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_01DAO.";
	
	
	public String SELECT_BRANCH_CD(Map<String, Object> info){
				
		
		return (String)sqlSession.selectOne(NAMEPSACE+"SELECT_BRANCH_CD",info );
	}
	
	
	public Map<String, Object> saveBranchFam( CommonMap param					    
								 ,List<Map<String, Object>> addList ){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("success", true);
		resultMap.put("msg"    , Const.SUC_MSG);
		
		try {
			
			CommonUtil commonUtil = new CommonUtil();
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_BUD_CODE"  , param.getString("V_BUD_CODE"));
				
				
				String V_BUD_NO = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_BRANCH_BUD_NO",info );
				
				System.out.println("V_BUD_NO = "+ V_BUD_NO);
				
				info.put("V_BUD_NO"  , info.get("V_BUD_CODE").toString() +"-"+ commonUtil.emptyTozero(Integer.parseInt(V_BUD_NO),2));
				info.put("V_SORT_SEQ", (i+1));
				
				sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER_BRANCH",info );
				
				
				Map<String, Object> changeInfo = new HashMap<String , Object>();
				changeInfo.put("V_TEMPLE_CD" , info.get("V_TEMPLE_CD"));
				changeInfo.put("TEMPLE_CD"   , info.get("V_TEMPLE_CD"));
				changeInfo.put("O_BudCd"     , info.get("BUD_NO"));
				changeInfo.put("N_BudCd"     , info.get("V_BUD_NO"));
				changeInfo.put("PMFlag"      , "2");
				changeInfo.put("CRT_USER"    , info.get("V_USER_ID"));
				changeInfo.put("REMOTE"      , info.get("V_REMOTE"));

				boolean result = commonUtil.changeBudCd2(sqlSession , changeInfo);
				
				if(!result){
					resultMap.put("success", false);
					resultMap.put("msg"    , "분가 처리시 에러가 발생하였습니다." );
					
					txManager.rollback(status);
					return resultMap;
				}
				
				sqlSession.delete(NAMEPSACE+"DELETE_SIN_CARD_MASTER_BRANCH",info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_NO_CHANGE",info);
			}//for
			
			// 마무리후 대주번호 체인지
			param.put("V_DAEJU_BUD_NO", (String)sqlSession.selectOne(NAMEPSACE+"SELECT_BRANCH_DAEJU_BUD_NO",param));
			sqlSession.update(NAMEPSACE+"UPDATE_BRANCH_DAEJU_BUD_NO",param);
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			resultMap.put("success", false);
			resultMap.put("msg",Const.ERR_MSG );
		}
		return resultMap;
	}
	
}
