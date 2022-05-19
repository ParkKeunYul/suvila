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
public class REC024W_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC024w_02DAO.";
	
	public List<Map<String, Object>> SELECT_REC_ALWAYS_PRAY_MGT(CommonMap param){
		
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_REC_ALWAYS_PRAY_MGT",param,result );
		
		return list;
	}
	
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> prayList
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
			
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			if(  "T".equals( SMS_YN )  ){ // 문자
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			
			
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
			for(int i = 0; i< prayList.size(); i++) {
				Map<String, Object> info = prayList.get(i);
				
				int V_SEQ = (i+1);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , V_SEQ);
				
				
				String START_YYYYMM = StringUtil.ObjToStr(info.get("START_YYYYMM")).replaceAll("/", "");
				info.put("V_PAYMENT_YYYYMM"  , START_YYYYMM);
				info.put("START_YYYYMM" 	 , START_YYYYMM);
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				
				sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
				
				
				int Base_Plan_Amt = StringUtil.ObjectToInt( info.get("BASE_PLAN_AMT") );  
				int Base_Amt      = StringUtil.ObjectToInt( info.get("BASE_AMT") );
				
				System.out.println("Base_Plan_Amt = "+ Base_Plan_Amt);
				System.out.println("Base_Amt = "+ Base_Amt);
				
				if(Base_Plan_Amt == Base_Amt) {
					info.put("BASE_AMT", 0);
				}
				System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_REC_ALWAYS_PRAY_DETAIL", info);
				
				
				info.put("V_CASH_TYPE"   , accRecInfo.get("CASH_TYPE"));
				
				
				
				if( StringUtil.ObjToInt(info.get("PAYMENT_AMT"), 0) == 0 ){
					info.put("V_AMOUNT"  		 , 0);
					
					sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS", info);
				}else {
					info.put("V_AMOUNT" , Base_Amt);
					
					
					int yyyy = Integer.parseInt(   START_YYYYMM.substring(0,4));
					int mm   = Integer.parseInt(   START_YYYYMM.substring(4) );
					
					int PAYMENT_AMT = StringUtil.ObjectToInt(info.get("PAYMENT_AMT"));
					
					int month       =  (int)PAYMENT_AMT / Base_Amt;
					
					if(month>0){
						for(int q=0 ; q<month; q++){
							
							Thread.sleep(10);
							info.put("V_PAYMENT_YYYYMM"  , yyyy + CommonUtil.emptyTozero(mm,2));
							info.put("V_AMOUNT"  		 , Base_Amt);
							
							System.out.println("INSERT_REC_PAYMENT_HIS = "+ info);
							
							sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS", info);
							
							mm++;
							if(mm > 12){
								yyyy += 1;
								mm = 1;
							}
							
						}// for
					}else {
						sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS_ZERO", info);
					}// month > 0
					
				}
			}//for
			
		//	txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			return false;
		}
		return true;
	}
	
	
}
