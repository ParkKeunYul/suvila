package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC030W_01DAO  extends DefaultDAO{

	
	public String  NAMEPSACE = "REC030W_01DAO.";
	

	public boolean saveSindoCard( CommonMap param
			                     ,Map<String, Object> addMap) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			addMap.put("V_TEMPLE_CD"	, param.getString("V_TEMPLE_CD"));
			addMap.put("V_REMOTE"		, param.getString("V_REMOTE"));
			addMap.put("V_USER_ID"		, param.getString("V_USER_ID"));
			addMap.put("MEMO"			, param.getString("memo"));
			
			
			
			
			String SEQ    = StringUtil.ObjToStr( addMap.get("SEQ") );
			String DEL_YN = StringUtil.ObjToStr( addMap.get("DEL_YN") );
			
			
			int V_TEMPLE_PRICE = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECTE_CARD_PRICE", param);
			
			System.out.println("V_TEMPLE_PRICE = "+ V_TEMPLE_PRICE);
			
			addMap.put("V_TEMPLE_PRICE", V_TEMPLE_PRICE);
			
			if(!"".equals(SEQ) && !"0".equals(SEQ)) {
				sqlSession.insert(NAMEPSACE+"updateSindoCardNewQuery", addMap);
			}else {
				if("F".equals(DEL_YN)) {
					sqlSession.insert(NAMEPSACE+"insertSindoCardNewQuery", addMap);
				}
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
	}// saveSindoCard
	
	public boolean cancelSinCard( CommonMap param
					             ,List<Map<String, Object>> uptList) {
					
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"CANCEL_SINDO_CARD",info);
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}
	
	public boolean deleteSinCard( CommonMap param
            					 ,List<Map<String, Object>> uptList) {
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i < uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				
				sqlSession.update(NAMEPSACE+"DELETE_SINDO_CARD",info);
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}
	
}
