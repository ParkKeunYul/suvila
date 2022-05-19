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
public class REC014W_00DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC014w_00DAO.";
	
	public List<Map<String, Object>> SELECT_YOUNGTOP_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YOUNGTOP_DETAIL",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YOUNGTOP_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_YOUNGTOP_PRINT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YOUNGTOP_YOUNGGA(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YOUNGTOP_YOUNGGA",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_JUNGAK(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_JUNGAK",param,result );
		
		return list;
	}
	
	
	
	public boolean saveRecYoungTop( CommonMap param
			            		   ,List<Map<String, Object>> yyList
			            		   ,List<Map<String, Object>> ydList
			            		   ,Map<String, Object>       accRecInfo
			            		   ,List<Map<String, Object>> smsList
			            		   ,List<Map<String, Object>> cardList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
			String SEQ        = "1";
			
			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			System.out.println("accRecInfo = "+ accRecInfo);
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			
			
			
			String V_PGCODE   = "";
			String V_AUTHCODE = "";
			
			
			// 카드결제  2014.12.22
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
			
			
			
			
			/*상세*/
			Map<String, Object> info = ydList.get(0);
			info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
			info.put("REMOTE"      , param.getString("V_REMOTE"));
			info.put("V_USER_ID"   , param.getString("V_USER_ID"));
			info.put("CRT_USER"    , param.getString("V_USER_ID"));
			info.put("UPT_USER"    , param.getString("V_USER_ID"));
			info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			info.put("ACCEPT_GBN"  , "14");
			info.put("SEQ"	       , 1);
			info.put("V_PGCODE"  , V_PGCODE);
			info.put("V_AUTHCODE", V_AUTHCODE);
			info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
			//info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
			
			System.out.println(info.get("CASH_TYPE"));
			
			sqlSession.insert("REC000w_03DAO.INSERT_MASTER", accRecInfo);
			sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
			sqlSession.insert(NAMEPSACE+"INSERT_YOUNGTOP_DETAIL", info);
			
			System.out.println(info);
			sqlSession.insert(NAMEPSACE+"INSERT_REC_PAYMENT_HIS", info);
			sqlSession.update(NAMEPSACE+"UPDATE_LIGHT", info);
			
			/*영가*/
			for(int i = 0; i< yyList.size(); i++) {
				Map<String, Object> sInfo = yyList.get(i);
				sInfo.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				sInfo.put("REMOTE"      , param.getString("V_REMOTE"));
				sInfo.put("V_USER_ID"   , param.getString("V_USER_ID"));
				sInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				sInfo.put("SEQ"   		, SEQ);
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_YOUNGTOP_YOUNGGA", sInfo);
			}
			
			if(  "T".equals( SMS_YN )  ){ // 문자
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
		
	}// 
	
	public boolean saveYoungTopList( CommonMap param
 		   						   ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
	   		
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				System.out.println("saveYoungTopList = "+info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_YOUNGTOP_DETAIL", info);
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
	
	public boolean saveYoungTopListInfo( CommonMap param
				   						,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
		
			System.out.println("addList.size() = "+ addList.size());
			
			for(int i = 0; i< addList.size(); i++) {
				Map<String, Object> info = addList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				
				
				if(i == 0) {
					System.out.println("DELETE_YOUNGTOP_YOUNGGA = "+ info);
					sqlSession.delete(NAMEPSACE+"DELETE_YOUNGTOP_YOUNGGA", info);
				}
				
				sqlSession.insert(NAMEPSACE+"INSERT_YOUNGTOP_YOUNGGA", info);
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
 		   
	
	public List<Map<String, Object>> SELECT_FAMILYINFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		System.out.println("SELECT_FAMILYINFO");
		sqlSession.select(NAMEPSACE+"SELECT_FAMILYINFO",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YOUNGTOP_PRINT_YOUNGGA(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YOUNGTOP_PRINT_YOUNGGA",param,result );
		return list;
	}
	
}
