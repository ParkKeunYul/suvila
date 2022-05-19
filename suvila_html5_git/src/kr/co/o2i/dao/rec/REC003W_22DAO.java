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
public class REC003W_22DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC003w_22DAO.";
	
	public List<Map<String, Object>> SELECT_49KIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		sqlSession.select(NAMEPSACE+"SELECT_49KIND",param,result );
		
		return list;
	}
	
	public boolean save( CommonMap param
						,List<Map<String, Object>> ds_saguJaeList
						,List<Map<String, Object>> ds_saguJaeSpiritList
						,List<Map<String, Object>> ds_saguJaeBokwiList
						,List<Map<String, Object>> ds_saguJaeKindList
			            ,Map<String, Object>       accRecInfo
			            ,List<Map<String, Object>> smsList
			            ,List<Map<String, Object>> cardList   ) throws Exception{
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			String ACCEPT_SEQ = CommonUtil.selectAcceptSeq(sqlSession, param);

			accRecInfo.put("CRT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("UPT_USER"	 , param.getString("V_USER_ID"));
			accRecInfo.put("REMOTE"   	 , param.getString("V_REMOTE"));
			accRecInfo.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
			
			sqlSession.insert("REC000w_03DAO.INSERT_MASTER", accRecInfo);
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			
			
			
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
			
			
			System.out.println("ds_saguJaeList.size = "+ ds_saguJaeList.size());
			
			for(int i = 0; i< ds_saguJaeList.size(); i++) {
				Map<String, Object> info = ds_saguJaeList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("ACCEPT_GBN"  , 5);
				info.put("SEQ"	       , 1);
				
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				info.put("V_CASH_TYPE" , accRecInfo.get("CASH_TYPE"));
				
				//System.out.println(info);
				
				sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
				sqlSession.insert(NAMEPSACE+"INSERT_49DETAIL", info);
				sqlSession.insert("REC000w_03DAO.INSERT_MISU", info);
			}// for ds_saguJaeList
			
			
			/*#49재 영가정보 입력#*/
			for(int i = 0; i< ds_saguJaeSpiritList.size(); i++) {
				Map<String, Object> info = ds_saguJaeSpiritList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , 1);
				
				
				sqlSession.insert(NAMEPSACE+"INSERT_49SPIRIT", info);
			}// for ds_saguJaeSpiritList
			
			/*#49재 복위자정보 입력#*/
			System.out.println("ds_saguJaeBokwiList.size = "+ ds_saguJaeBokwiList.size());
			for(int i = 0; i< ds_saguJaeBokwiList.size(); i++) {
				Map<String, Object> info = ds_saguJaeBokwiList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , 1);
				
				String REP_YN = StringUtil.StrBolToTF(info.get("REP_YN")+"");
				if("F".equals(REP_YN)) {
					REP_YN = "";
				}
				info.put("REP_YN"      , REP_YN);
				//ACCEPT_YN
				System.out.println("ds_saguJaeBokwiList info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_49BOKWI", info);
			}// for ds_saguJaeBokwiList
			
			/*#49재 제사정보 입력#*/
			for(int i = 0; i< ds_saguJaeKindList.size(); i++) {
				Map<String, Object> info = ds_saguJaeKindList.get(i);
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("SEQ"	       , 1);
				info.put("EVENT_TIME"  , StringUtil.ObjToStr(info.get("EVENT_TIME"), "").replaceAll(":", ""));
				
				String EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE"), "").replaceAll("-", "").replaceAll("/", "");				
				info.put("EVENT_DATE"  , EVENT_DATE.substring(0, 8));
				info.put("ACCEPT_YN"   , StringUtil.StrBolToTF(info.get("ACCEPT_YN")+""));
				
				sqlSession.insert(NAMEPSACE+"INSERT_49KIND", info);
			}
			
			
			if(  "T".equals( SMS_YN )  ){ // 문자
				System.out.println("smsList = "+ smsList.get(0));
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
	}
			
	
}
