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
public class REC000P_06DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC000p_06DAO.";
	
	public List<Map<String, Object>> SELECT_REC_INDEUNG(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_REC_INDEUNG",param,result );
		
		return list;
	}
	
	
	public boolean saveSunab( CommonMap param					    
							 ,List<Map<String, Object>> misuRecList
							 ,List<Map<String, Object>> smsList
							 ,List<Map<String, Object>> cardList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			String V_PGCODE   = "";
			String V_AUTHCODE = "";
			
			if(cardList.size() > 0){
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
			}
			
			
			for(int i = 0; i<misuRecList.size(); i++){
				Map<String, Object> info  = misuRecList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("V_CASH_TYPE" , info.get("TEMP_APPROVAL_GBN"));
				info.put("V_PGCODE"    , V_PGCODE);
				info.put("V_AUTHCODE"  , V_AUTHCODE);
				
				String LIMIT_YN = StringUtil.ObjToStr(info.get("LIMIT_YN"));
				
				if("T".equals(LIMIT_YN)) {
					sqlSession.insert("REC001w_02DAO.INSERT_MISU",info );
				}else if("F".equals(LIMIT_YN)) {
					
					String START_MONTH = StringUtil.ObjToStr(info.get("START_MONTH"));
					String LAST_MONTH  = StringUtil.ObjToStr(info.get("LAST_MONTH"));
					
					int yyyy = Integer.parseInt( LAST_MONTH.substring(0,4) );
					int mm   = Integer.parseInt( LAST_MONTH.substring(4) );
					
					if("000000".equals(LAST_MONTH)){
						//지금까지 납부한적이 없다면 yyyy mm 초기화
						yyyy = Integer.parseInt( START_MONTH.substring(0,4) );
						mm   = Integer.parseInt( START_MONTH.substring(4) );
					}
					
					int month = StringUtil.ObjToInt( info.get("SUNAP_MONTH") );
					for(int j=0 ; j<month; j++){
						Thread.sleep(10);
						
						info.put("V_PAYMENT_YYYYMM" , yyyy +  CommonUtil.emptyTozero(mm,2) );
						info.put("LIGHT_CODE"       , info.get("INDEUNG_GBN"));
						
						// 해당월의 금액관리 금액을 찾는다 
						String month_amount = StringUtil.ObjToStr(sqlSession.selectOne(NAMEPSACE+"GET_DEUNG_PRICE_MGT",info)) ;
//						//System.out.println("month_amount = "+ month_amount);
						
						
						info.put("V_BASE_PAYMENT_AMT", month_amount);
						
						
						if("".equals(month_amount)) {
							info.put("V_BASE_PAYMENT_AMT", info.get("BASE_AMT"));
						}
						sqlSession.insert("REC001w_02DAO.INSERT_MISU_NO_LIMIT",info );
						
						mm++;
						if(mm > 12){
							yyyy += 1;
							mm = 1;
						}
					}// for j
				}// LIMIT_YN
			}
			
			
			
			txManager.commit(status);
			//txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}// saveSunab
	
	
}
