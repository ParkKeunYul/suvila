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
import kr.co.o2i.util.StringUtil;

@Repository
public class REC020W_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC020w_02DAO.";
	
	public List<Map<String, Object>> SELECT_TSKIND(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TSKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_TSKIND_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TSKIND_DETAIL",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_TEMPLE_STAY_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TEMPLE_STAY_HIS",param,result );
		
		return list;
	}
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> RecList
			            ,Map<String, Object>       accRecInfo
			            ,List<Map<String, Object>> smsList
			            ,List<Map<String, Object>> cardList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			
			sqlSession.insert("REC000w_03DAO.INSERT_MASTER", accRecInfo);
			
			
			String V_PGCODE   = "";
			String V_AUTHCODE = "";
			if(cardList.size() > 0) {
				String strCashType = StringUtil.ObjToStr( cardList.get(0).get("V_CASH_TYPE")  ); 
				if ("2".equals(strCashType)) {
					Map<String, Object> cardVo = cardList.get(0);
					
					V_PGCODE   = StringUtil.ObjToStr(cardVo.get("PGCODE"));
					V_AUTHCODE = StringUtil.ObjToStr(cardVo.get("PGAUTHCODE"), "");
					
					cardVo.put("RESULTMSG"     ,  StringUtil.ObjToStr(cardVo.get("PGCODE"), ""));
					cardVo.put("GETRESULTPRICE",  "0");
					
					cardVo.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
					
					sqlSession.insert("REC000w_03DAO.INSERT_REC_CARDPAY", cardVo);
					sqlSession.insert("REC000w_03DAO.INSERT_REC_CARDPAY_HIS", cardVo);
				}
			}// cardList.size()
			
			
			for(int i = 0; i< RecList.size(); i++) {
				int V_SEQ = (i+1);
				
				Map<String, Object> info = RecList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , V_SEQ);
				info.put("ACCEPT_GBN"  , 11);
				info.put("V_PGCODE"    , V_PGCODE);
				info.put("V_AUTHCODE"  , V_AUTHCODE);
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				
				
				sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
				sqlSession.insert(NAMEPSACE+"INSERT_TEMPLE_STAY_DETAIL", info);
				
				sqlSession.insert("REC000w_03DAO.INSERT_MISU", info);
				
			}// for i
			
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			if(  "T".equals( SMS_YN )  ){ // 문자
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			CommonUtil.saveRecSMS(sqlSession, accRecInfo);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// save
	
}
