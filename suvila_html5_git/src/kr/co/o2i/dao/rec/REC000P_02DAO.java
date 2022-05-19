package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.ibm.icu.text.IDNA.Info;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC000P_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC000p_02DAO.";
	
	
	public List<Map<String, Object>> SELECT_MISU(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MISU",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_MISU_NO_LIMIT(CommonMap param){
		
		System.out.println("SELECT_MISU_NO_LIMIT = "+ param);
		System.out.println("SELECT_MISU_NO_LIMIT = "+ param);
		System.out.println("SELECT_MISU_NO_LIMIT = "+ param);
		System.out.println("SELECT_MISU_NO_LIMIT = "+ param);
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MISU_NO_LIMIT",param,result );

		
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PAYMENT_PERIOD(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PAYMENT_PERIOD",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PAYMENT_PERIOD_NO_LIMIT(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PAYMENT_PERIOD_NO_LIMIT",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_REC_AMOUNT(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		String V_ACCEPT_GBN = param.getString("V_ACCEPT_GBN");
		String sqlNm        = "SELECT_REC_DEUNG_CLASS_MGT_AMOUNT";
		
		if("13".equals(V_ACCEPT_GBN)) sqlNm = "SELECT_REC_ALWAYS_PRAY_PRICE_MGT";
		
		sqlSession.select(NAMEPSACE+sqlNm,param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> selectLightOut(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		String V_ACCEPT_GBN = param.getString("V_ACCEPT_GBN");
		String sqlNm        = "";
		
		switch (V_ACCEPT_GBN) {
			case "3":
				sqlNm = "SELECT_BULSA";
				break;
			case "8":
				sqlNm = "SELECT_WEPAE";
				break;
			case "14":
				sqlNm = "SELECT_YOUNGTOP";
				break;
			default :
				sqlNm = "SELECT_DEUNG";
				break;
		}
		sqlSession.select(NAMEPSACE+sqlNm,param,result );
		
		return list;
	}
	
	
	
	public boolean saveCmsInfo(CommonMap param					    
							   ,List<Map<String, Object>> addList) {
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			System.out.println("addList = "+ addList.size());
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_REC_CMSINFO_HIS",info );
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_CMSINFO",info );
			}// for
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
			return true;
	}//saveCmsInfo
	
	
	public boolean saveCell( CommonMap param					    
							,List<Map<String, Object>> addList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
	
			System.out.println("addList = "+ addList.size());
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_SMS_YN",info );
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CELL_INFO",info );
			}// for
			txManager.commit(status);
			// txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
			return true;
	}//saveCell
	
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> misuRecList
						,List<Map<String, Object>> misuRecUptList
						,List<Map<String, Object>> smsList
						,List<Map<String, Object>> cardList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			
			String V_PGCODE = "";
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
			
			
			

			for(int i = 0; i<misuRecUptList.size(); i++){
				Map<String, Object> info  = misuRecUptList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				//info.put("V_CASH_TYPE" , info.get("APPROVAL_GBN"));
				
				
				sqlSession.insert(NAMEPSACE+"UPDATE_MISU",info );
			}
			
			
			for(int i = 0; i<misuRecList.size(); i++){
				Map<String, Object> info  = misuRecList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE" , info.get("APPROVAL_GBN"));
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				
				if(cardList.size() > 0){
					info.put("V_CASH_TYPE" , "2");
				}
				
				sqlSession.insert(NAMEPSACE+"INSERT_MISU",info );
				
			}// for
			
			if(smsList.size() > 0 && misuRecList.size() > 0 ){
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
			return true;
	}//saveLimit
	
	public boolean saveLimit( CommonMap param					    
							 ,List<Map<String, Object>> misuRecList
							 ,List<Map<String, Object>> smsList
							 ,List<Map<String, Object>> cardList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			String V_PGCODE = "";
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
			
			System.out.println("misuRecList.size() = "+ misuRecList.size());
			
			for(int i = 0; i<misuRecList.size(); i++){
				Map<String, Object> info  = misuRecList.get(i);
				
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE" , info.get("APPROVAL_GBN"));
				info.put("V_PGCODE"    , V_PGCODE);
				info.put("V_AUTHCODE"  , V_AUTHCODE);
				
				
				if(cardList.size() > 0){
					info.put("V_CASH_TYPE" , "2");
				}
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_MISU_LIMIT",info );
				
				
			}// for
			
			if(smsList.size() > 0 && misuRecList.size() > 0 ){
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
			return true;
	}//saveLimit
	
	public boolean recCancel( CommonMap param					    
							 ,List<Map<String, Object>> ds_recCancelList
							 ,List<Map<String, Object>> smsList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			
			for(int i = 0; i<ds_recCancelList.size(); i++){
				Map<String, Object> info  = ds_recCancelList.get(i);
				
				info.put("UPT_USER"   	, param.getString("V_USER_ID"));
				info.put("REMOTE"    	, param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" 	, param.getString("V_TEMPLE_CD"));
				//info.put("V_CASH_TYPE" , info.get("APPROVAL_GBN"));
				
				System.out.println("info = "+ info);
				
				sqlSession.update(NAMEPSACE+"UPDAET_CANCEL",info );
				sqlSession.update(NAMEPSACE+"UPDAET_CANCEL_DETAIL",info );
				
				
				String ACCEPT_GBN = StringUtil.ObjToStr( info.get("ACCEPT_GBN") );
				if( "5".equals(ACCEPT_GBN) || "6".equals(ACCEPT_GBN) || "7".equals(ACCEPT_GBN)  ){
					sqlSession.delete(NAMEPSACE+"DELETE_RESERVED_SMS",info );
				}// if
				
				
			}// for
			
			if(smsList.size() > 0){
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//recCancel
	
	public boolean saveLightOut( CommonMap param					    
								,Map<String, Object> uptInfo){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			String V_ACCEPT_GBN = StringUtil.ObjToStr( uptInfo.get("V_ACCEPT_GBN") ); 
			String sqlNm        = "UPDATE_DEUGN";
			
			if("8".equals(V_ACCEPT_GBN)){
				sqlNm = "UPDATE_WEPAE_OUT";
			}
			
			sqlSession.update(NAMEPSACE+sqlNm,uptInfo );
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//saveLightOut
	
	public boolean updateRecRemark( CommonMap param					    
								,Map<String, Object> uptInfo){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			sqlSession.update(NAMEPSACE+"UPDATE_REC_MASTER_MEMO",uptInfo );
			sqlSession.update(NAMEPSACE+"UPDATE_REC_DETAIL_REMARK",uptInfo );
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//saveLightOut
	
	
	public boolean saveCash( CommonMap param					    
							,List<Map<String, Object>> misuAmtList
							,List<Map<String, Object>> smsList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
	
			for(int i = 0; i<misuAmtList.size(); i++){
				Map<String, Object> info  = misuAmtList.get(i);
				
				info.put("V_USER_ID"   	, param.getString("V_USER_ID"));
				info.put("V_REMOTE"    	, param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" 	, param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE" 	, "1");
				info.put("V_PGCODE" 	, "" );
				info.put("V_AUTHCODE" 	, "" );
				
				System.out.println(info);
				
				sqlSession.update(NAMEPSACE+"INSERT_MISU",info );
				
			}// for
			
			if(smsList.size() > 0 && misuAmtList.size() > 0 ){
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//recCancel

	
	public List<Map<String, Object>> SELECT_JESA_INFO(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_JESA_INFO",param,result );
		
		return list;
	}
	
	public boolean smsSend( CommonMap param					    						
						   ,List<Map<String, Object>> smsList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			CommonUtil.smsSend(sqlSession, param, smsList);
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
		
	}
	
	
	public List<Map<String, Object>> SELECT_PRAY_ORGINATE(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRAY_ORGINATE",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_REC_DEUNG_CLASS_ALL_MGT_AMOUNT(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_DEUNG_CLASS_ALL_MGT_AMOUNT",param,result );
		
		return list;
	}
	
	public boolean save_indeungLimit( CommonMap param					    
									 ,List<Map<String, Object>> misuAmtList
									 ,List<Map<String, Object>> pgCardInfoList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			
			for(int i = 0; i<misuAmtList.size(); i++){
				Map<String, Object> info  = misuAmtList.get(i);
				info.put("V_USER_ID"   	, param.getString("V_USER_ID"));
				info.put("V_REMOTE"    	, param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" 	, param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE"  , info.get("APPROVAL_GBN"));
				
				if(pgCardInfoList.size() > 0){
					info.put("V_CASH_TYPE" , "2");
				}
				
				sqlSession.insert("REC000p_02DAO.INSERT_MISU_LIMIT",info );
				
			}// for i
			txManager.commit(status);
			//txManager.rollback(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
	}
	
	public boolean save_indeung( CommonMap param					    
								,List<Map<String, Object>> misuAmtList
								,List<Map<String, Object>> pgCardInfoList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			
			for(int i = 0; i<misuAmtList.size(); i++){
				Map<String, Object> info  = misuAmtList.get(i);
				info.put("V_USER_ID"   	, param.getString("V_USER_ID"));
				info.put("V_REMOTE"    	, param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" 	, param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE"  , info.get("APPROVAL_GBN"));
				
				if(pgCardInfoList.size() > 0){
					info.put("V_CASH_TYPE" , "2");
				}
				sqlSession.insert("REC000p_02DAO.INSERT_MISU",info );
			}
			
			txManager.commit(status);
			//txManager.rollback(status);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}//save_indeung
	
	
}
