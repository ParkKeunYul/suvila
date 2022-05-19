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
public class REC022W_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC022w_02DAO.";
	
	
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> save( CommonMap param
						            ,List<Map<String, Object>> wbList
						            ,Map<String, Object>       accRecInfo
						            ,List<Map<String, Object>> smsList
						            ,List<Map<String, Object>> cardList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		Map<String, Object> rtnMap = new HashMap<String, Object>();
		
		try {
			rtnMap.put("suc", false);
			rtnMap.put("msg", Const.ERR_MSG);
			
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);
			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			
			sqlSession.insert("REC000w_03DAO.INSERT_MASTER", accRecInfo);
			
			
			String PRE_JUNGAKCD    = "";
			String PRE_LIGHTNO     = "";
			String PRE_JUNGAK_GBN  = "";
			
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
			
			
			for(int i = 0; i< wbList.size(); i++) {
				int V_SEQ = (i+1);
				
				Map<String, Object> info = wbList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , V_SEQ);
				info.put("ACCEPT_GBN"  , 12);
				
				String DONGCHAMJA_GBN = StringUtil.ObjToStr(info.get("DONGCHAMJA_GBN"));
				if(!"*".equals(DONGCHAMJA_GBN)) {
					V_SEQ = V_SEQ + 1;
					PRE_JUNGAKCD 	 = StringUtil.ObjToStr(info.get("JUNGAK_CD"));
					PRE_LIGHTNO  	 = StringUtil.ObjToStr(info.get("LIGHT_NO"));
					PRE_JUNGAK_GBN   = StringUtil.ObjToStr(info.get("JUNGAK_GBN"));	
				}				
				info.put("JUNGAK_CD"    , PRE_JUNGAKCD);
				info.put("LIGHT_NO"     , PRE_LIGHTNO);
				info.put("JUNGAK_GBN"   , PRE_JUNGAK_GBN);
				info.put("SEQ"	        , V_SEQ);
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				
				/*selectLightUsedChk*/
				info.put("V_TEMPLE_CD"  , param.getString("V_TEMPLE_CD"));
				info.put("V_ACCEPT_GBN" , 12);
				info.put("V_JUNGAK_CD"  , PRE_JUNGAKCD);
				info.put("V_LIGHT_NO"   , PRE_LIGHTNO);
				
				/* 동참자 구분이 (*)이 아니면 인등 접수 세부내역 Table에 저장 */								
				if(!"*".equals(DONGCHAMJA_GBN)) {
					List<Map<String, Object>>  list = sqlSession.selectList("REC000w_03DAO.selectLightUsedChk",info); 
					
					if(list.size() > 0 ){
						Map<String, Object> Row = (Map<String, Object>)list.get(0);
						
						/* ADD_FLAG가 P 이면 사용가능 등번호 */
						if("P".equals(Row.get("ADD_FLAG"))){
							/* CLOSE_YN이 T 이면 사용중인 등번호 */
							if("F".equals(Row.get("CLOSE_YN"))){
								rtnMap.put("msg", PRE_LIGHTNO+"번은 사용중인 등번호 입니다.");
								throw new Exception();
							}
						}
						/* ADD_FLAG가 M 이면 사용불가 등번호 */
						else{
							rtnMap.put("msg", PRE_LIGHTNO+"번은 존재하지 않는 등번호 입니다.");
							throw new Exception();
						}
						if( "F".equals(Row.get("USE_YN")) ){ 
							rtnMap.put("msg", PRE_LIGHTNO+"번은 파기된 등번호 입니다.");
							throw new Exception();
						}
					}else {
						rtnMap.put("msg", PRE_LIGHTNO+"번은 존재하지 않는 등번호 입니다.");
						throw new Exception();
					}// if list.size() 					 
				
					sqlSession.insert("REC000w_03DAO.INSERT_SUB" , info);
					System.out.println("info = "+ info);
					sqlSession.insert(NAMEPSACE+"INSERT_WBREC" , info);
					sqlSession.insert("REC000w_03DAO.INSERT_MISU" , info);
					
				}// * if
				
				sqlSession.insert(NAMEPSACE+"INSERT_WONBUL_DONGCHAM" , info);
				info.put("V_RESERVATION_YN", "F");
				sqlSession.insert("REC001w_02DAO.UPDATE_GETLIGHT" , info);
				
			}// for i
			
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			if(  "T".equals( SMS_YN )  ){ // 문자
				CommonUtil.smsSend(sqlSession, param, smsList);
			}
			//CommonUtil.saveRecSMS(sqlSession, accRecInfo);
			
			
			rtnMap.put("suc", true);
			rtnMap.put("msg", Const.SUC_MSG);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			rtnMap.put("suc", false);
			return rtnMap;
		}
		return rtnMap;
	}// save
	
}
