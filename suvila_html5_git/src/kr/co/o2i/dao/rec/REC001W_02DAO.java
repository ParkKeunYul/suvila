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
public class REC001W_02DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC001w_02DAO.";
	
	public List<Map<String, Object>> SELECT_IDKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_IDKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_JUNGAKKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_JUNGAKKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GETLIGHT(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_GETLIGHT",param,result );
		
		return list;
	}
	
	public void UPDATE_GETLIGHT(CommonMap param){
		sqlSession.update(NAMEPSACE+"UPDATE_GETLIGHT",param );
	}
	
	
	public List<Map<String, Object>> SELECT_LIGHT_USEDCHK(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_LIGHT_USEDCHK",param,result );
		
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object>  save( CommonMap param
								     ,List<Map<String, Object>> idList
								     ,List<Map<String, Object>> ydList
								     ,Map<String, Object>       accRecInfo
								     ,List<Map<String, Object>> smsList
								     ,List<Map<String, Object>> cardList){
			
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		Map<String, Object> rtnMap = new HashMap<String, Object>();
		
		try {
	
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
			
			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			
			System.out.println("accRecInfo = "+ accRecInfo);
			
			
			
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
			
			
			int V_SEQ = 0;
			
			System.out.println("2222222222222222222");
			String PRE_JUNGAKCD    = "";
			String PRE_LIGHTNO     = "";
			String PRE_JUNGAK_GBN  = "";
			
			for(int j = 0; j< idList.size(); j++) {
				Map<String, Object> info = idList.get(j);
				
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				info.put("DEL_YN"  	   , "F");
				
				String DONGCHAMJA_GBN = StringUtil.ObjToStr(info.get("DONGCHAMJA_GBN"));
				if(!"*".equals(DONGCHAMJA_GBN)) {
					V_SEQ = V_SEQ + 1;
					PRE_JUNGAKCD 	 = StringUtil.ObjToStr(info.get("JUNGAK_CD"));
					PRE_LIGHTNO  	 = StringUtil.ObjToStr(info.get("LIGHT_NO"));
					PRE_JUNGAK_GBN   = StringUtil.ObjToStr(info.get("JUNGAK_GBN"));	
				}				
				info.put("JUNGAK_CD"  , PRE_JUNGAKCD);
				info.put("LIGHT_NO"   , PRE_LIGHTNO);
				info.put("JUNGAK_GBN" , PRE_JUNGAK_GBN);
				
				
				info.put("SEQ"	        , V_SEQ);
				info.put("V_ACCEPT_GBN" , "2");
				info.put("V_JUNGAK_CD"  , PRE_JUNGAKCD);
				info.put("V_LIGHT_NO"   , PRE_LIGHTNO);
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				
				
				if(!"*".equals(DONGCHAMJA_GBN)) {
					List<Map<String, Object>>  list = sqlSession.selectList("REC000w_03DAO.selectLightUsedChk",info); 
					
					if(list.size() > 0 ){
						Map<String, Object> Row = (Map<String, Object>)list.get(0);
						
						if("P".equals(Row.get("ADD_FLAG"))){
							if("F".equals(Row.get("CLOSE_YN"))){
								rtnMap.put("msg", PRE_JUNGAKCD+"번은 사용중인 등번호 입니다.");
								throw new Exception();
							}
						}
						else{
							rtnMap.put("msg", PRE_JUNGAKCD+"번은 존재하지 않는 등번호 입니다.");
							throw new Exception();
						}
						
						if( "F".equals(Row.get("USE_YN")) ){  // 파기된 인등번호체크
							rtnMap.put("msg", PRE_JUNGAKCD+"번은 파기된 등번호 입니다.");
							throw new Exception();
						}
					}else {
						rtnMap.put("msg", PRE_JUNGAKCD+"번은 존재하지 않는 등번호 입니다.");
						throw new Exception();
					}// if list.size() 					 
				
					sqlSession.insert(NAMEPSACE+"INSERT_SEQ" , info);
					sqlSession.insert(NAMEPSACE+"INSERT_IDREC" , info);
					
					
					String LIMIT_YN = StringUtil.ObjToStr( info.get("LIMIT_YN") );
					if("F".equals(LIMIT_YN)) { // 무기한인 경우 (F)
						
						int yyyy = StringUtil.ObjectToInt( info.get("INDEUNG_YEAR") );
						int mm   = StringUtil.ObjectToInt( info.get("INDEUNG_MONTH") );
						
					
						int PAYMENT_AMT 	 = StringUtil.ObjectToInt( info.get("PAYMENT_AMT") );
						int BASE_PAYMENT_AMT = StringUtil.ObjectToInt( info.get("BASE_PAYMENT_AMT") );
						
						System.out.println("PAYMENT_AMT = "+ PAYMENT_AMT);
						System.out.println("BASE_PAYMENT_AMT = "+ BASE_PAYMENT_AMT);
						
						if( PAYMENT_AMT == 0 ){
							
							info.put("V_BASE_PAYMENT_AMT", String.valueOf(PAYMENT_AMT) );
							info.put("V_PAYMENT_YYYYMM"  , yyyy +  CommonUtil.emptyTozero(mm,2) );
							sqlSession.insert(NAMEPSACE+"INSERT_MISU_NO_LIMIT" , info);
							
						}else {
							
							int month = (int)( PAYMENT_AMT / BASE_PAYMENT_AMT );
							if(month>0){ 
								
								for(int i=0 ; i<month; i++){
									Thread.sleep(10);
									info.put("V_BASE_PAYMENT_AMT", String.valueOf(BASE_PAYMENT_AMT) );
									info.put("V_PAYMENT_YYYYMM"  , yyyy +  CommonUtil.emptyTozero(mm,2) );

									
									System.out.println("INSERT_MISU_NO_LIMIT ="+ info);
									
									sqlSession.insert(NAMEPSACE+"INSERT_MISU_NO_LIMIT" , info);
									mm++;
									if(mm > 12){
										yyyy += 1;
										mm    = 1;
									}
								}// for
							}else {
								sqlSession.insert(NAMEPSACE+"INSERT_MISU" , info);
							}
						} // PAYMENT_AMT
					}else{
						sqlSession.insert(NAMEPSACE+"INSERT_MISU" , info);
					}//  if LIMIT_YN
				}// * if
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_IDREC_DONGCHAM" , info);
				
				info.put("V_RESERVATION_YN", "F");
				sqlSession.insert(NAMEPSACE+"UPDATE_GETLIGHT" , info);
				
			}// for
			
			
			for(int j = 0; j< ydList.size(); j++) {
				Map<String, Object> info = ydList.get(j);
				
				
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				info.put("DEL_YN"  	   , "F");
				
				
				String DONGCHAMJA_GBN = StringUtil.ObjToStr(info.get("DONGCHAMJA_GBN"));
				
				if(!"*".equals(DONGCHAMJA_GBN)) {
					V_SEQ = V_SEQ + 1;
					PRE_JUNGAKCD 	 = StringUtil.ObjToStr(info.get("JUNGAK_CD"));
					PRE_LIGHTNO  	 = StringUtil.ObjToStr(info.get("LIGHT_NO"));
					PRE_JUNGAK_GBN   = StringUtil.ObjToStr(info.get("JUNGAK_GBN"));	
				}				
				info.put("JUNGAK_CD"  , PRE_JUNGAKCD);
				info.put("LIGHT_NO"   , PRE_LIGHTNO);
				info.put("JUNGAK_GBN" , PRE_JUNGAK_GBN);
				
				
				info.put("SEQ"	        , V_SEQ);
				info.put("V_ACCEPT_GBN" , "4");
				info.put("V_JUNGAK_CD"  , PRE_JUNGAKCD);
				info.put("V_LIGHT_NO"   , PRE_LIGHTNO);
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				
				
				/* 동참자 구분이 (*)이 아니면 연등 접수 세부내역 Table에 저장 */								
				if(!"*".equals(DONGCHAMJA_GBN)) {
					List<Map<String, Object>>  list = sqlSession.selectList("REC000w_03DAO.selectLightUsedChk",info); 
					
					if(list.size() > 0 ){
						Map<String, Object> Row = (Map<String, Object>)list.get(0);
						
						/* ADD_FLAG가 P 이면 사용가능 등번호 */
						if("P".equals(Row.get("ADD_FLAG"))){
							/* CLOSE_YN이 T 이면 사용중인 등번호 */
							if("F".equals(Row.get("CLOSE_YN"))){
								rtnMap.put("msg", PRE_JUNGAKCD+"번은 사용중인 등번호 입니다.");
								throw new Exception();
							}
						}
						/* ADD_FLAG가 M 이면 사용불가 등번호 */
						else{
							rtnMap.put("msg", PRE_JUNGAKCD+"번은 존재하지 않는 등번호 입니다.");
							throw new Exception();
						}
						
						if( "F".equals(Row.get("USE_YN")) ){  
							rtnMap.put("msg", PRE_JUNGAKCD+"번은 파기된 등번호 입니다.");
							throw new Exception();
						}
					}else {
						rtnMap.put("msg", PRE_JUNGAKCD+"번은 존재하지 않는 등번호 입니다.");
						throw new Exception();
					}// if list.size() 					 
				
					sqlSession.insert(NAMEPSACE+"INSERT_SEQ"   , info);
					sqlSession.insert(NAMEPSACE+"INSERT_YDREC" , info);
					
					
					int YEONDEUNG_PERIOD    = StringUtil.ObjToInt(info.get("YEONDEUNG_PERIOD"));
					int PAYMENT_PLAN_AMT    = StringUtil.ObjToInt(info.get("PAYMENT_PLAN_AMT"));
					String V_APPROVAL_GBN   = StringUtil.ObjToStr(accRecInfo.get("CASH_TYPE"));
					
					if(YEONDEUNG_PERIOD  > 1  &&  "3".equals(V_APPROVAL_GBN)) {
						
						int yyyy 	    =  StringUtil.ObjToInt(info.get("YEONDEUNG_YEAR"));
						int mm		    =  StringUtil.ObjToInt(info.get("YEONDEUNG_MONTH"));
						int PAYMENT_AMT =  StringUtil.ObjToInt(info.get("PAYMENT_AMT"));
						
						if(PAYMENT_AMT == 0) {
							info.put("V_BASE_PAYMENT_AMT", PAYMENT_AMT);
							info.put("V_PAYMENT_YYYYMM"  , yyyy + CommonUtil.emptyTozero(mm,2));
							
							sqlSession.insert(NAMEPSACE+"INSERT_MISU_NO_LIMIT" , info);
						}else{
							
							int base_payment_amt = PAYMENT_PLAN_AMT / YEONDEUNG_PERIOD;
							int month            = PAYMENT_AMT / base_payment_amt;
							
							if(month>0){
								for(int i=0 ; i<month; i++){
									
									Thread.sleep(10);
									info.put("V_BASE_PAYMENT_AMT"  , String.valueOf(base_payment_amt));
									info.put("V_PAYMENT_YYYYMM"    , yyyy + CommonUtil.emptyTozero(mm,2));
									sqlSession.insert(NAMEPSACE+"INSERT_MISU_NO_LIMIT" , info);
									
									mm++;
									if(mm > 12){
										yyyy += 1;
										mm = 1;
									}
									
								}// for
							}else {
								sqlSession.insert(NAMEPSACE+"INSERT_MISU" , info);
							}// month
						}
					}else {
						sqlSession.insert(NAMEPSACE+"INSERT_MISU" , info);
					}
					
				}// * if 동참자
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_YDREC_DONGCHAM" , info);
				
				info.put("V_RESERVATION_YN", "F");
				sqlSession.insert(NAMEPSACE+"UPDATE_GETLIGHT" , info);
				
			}// 연등 for
			
			System.out.println("11111111111111111111111111111111");
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			if(  "T".equals( SMS_YN )  ){ // 문자
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			CommonUtil.saveRecSMS(sqlSession, accRecInfo);
			
			
			rtnMap.put("suc", true);
			
			// txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			rtnMap.put("suc", false);
			rtnMap.put("msg", Const.ERR_MSG);
			return rtnMap;
		}
		return rtnMap;
	}

}
