package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC011W_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC011w_02DAO.";
	
	public List<Map<String, Object>> SELECT_REC_SUPPORT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_SUPPORT_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SUPPORT_MGT_BACKUP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SUPPORT_MGT_BACKUP",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_FAMILY_INFO_BACKUP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_FAMILY_INFO_BACKUP",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SUPPORT_DETAIL_BACKUP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SUPPORT_DETAIL_BACKUP",param,result );
		return list;
	}
	
	public boolean save( CommonMap param
			            ,List<Map<String, Object>> spList
			            ,Map<String, Object>       accRecInfo
			            ,List<Map<String, Object>> smsList
			            ,List<Map<String, Object>> cardList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
			
			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			sqlSession.insert("REC000w_03DAO.INSERT_MASTER", accRecInfo);
			
			
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
			
			// 상세
			for(int i = 0; i< spList.size(); i++) {
				Map<String, Object> info = spList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				
				int V_SEQ = (i+1);
				info.put("SEQ"	       , V_SEQ);
				
				sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
				sqlSession.insert(NAMEPSACE+"INSERT_REC_SUPPORT_DETAIL", info);
				
				int BASE_AMT      = StringUtil.ObjectToInt( info.get("BASE_AMT") );
				
				
				String FIRST_PAYMENT_YYYYMM = StringUtil.ObjToStr(info.get("FIRST_PAYMENT_YYYYMM"));
				
				info.put("V_CASH_TYPE"   , accRecInfo.get("CASH_TYPE"));
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				
				if( StringUtil.ObjToInt(info.get("PAYMENT_AMT"), 0) == 0 ){
					
					info.put("V_PAYMENT_YYYYMM", FIRST_PAYMENT_YYYYMM);
					info.put("V_AMOUNT" , 0);
					
					sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS", info);
				}else {
					
					
					info.put("V_AMOUNT" , BASE_AMT);
					int PAYMENT_AMT             = StringUtil.ObjectToInt(info.get("PAYMENT_AMT"));
					
					int yyyy = Integer.parseInt(   FIRST_PAYMENT_YYYYMM.substring(0,4));
					int mm   = Integer.parseInt(   FIRST_PAYMENT_YYYYMM.substring(4) );
					
					
					int month       =  (int)PAYMENT_AMT / BASE_AMT;
					if(month>0){
						
						for(int q=0 ; q<month; q++){
							Thread.sleep(10);
							info.put("V_PAYMENT_YYYYMM"  , yyyy + CommonUtil.emptyTozero(mm,2));
							info.put("V_AMOUNT"  		 , BASE_AMT);
							
							System.out.println("INSERT_REC_PAYMENT_HIS = "+ info);
							sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS", info);
							
							mm++;
							if(mm > 12){
								yyyy += 1;
								mm = 1;
							}
							
						}// for q
						
					}else {
						sqlSession.insert("REC000w_03DAO.INSERT_REC_PAYMENT_HIS_ZERO", info);
					}// if month
				}
				
			}// for
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			System.out.println("SMS_YN= "+ SMS_YN);
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
	}// save
	
}
