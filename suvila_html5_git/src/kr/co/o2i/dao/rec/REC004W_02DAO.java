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
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC004W_02DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC004w_02DAO.";
	
	
	
	public List<Map<String, Object>> SELECT_WEPAEKIND(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_WEPAEKIND",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_WEPAEKINDDATE(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_WEPAEKINDDATE",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DETAIL(CommonMap param){
	
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL",param,result );
		
		return list;
	}
	
	
	public boolean save( CommonMap param
						,List<Map<String, Object>> ds_detailList
						,List<Map<String, Object>> ds_dongChamJaList
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
			
			String V_PGCODE   = "";
			String V_AUTHCODE = "";
			String V_CASH_TYPE = "";
			/* 카드결제  2014.12.22*/
			System.out.println("cardList.size() = "+ cardList.size());
			System.out.println("cardList.size() = "+ cardList.size());
			System.out.println("cardList.size() = "+ cardList.size());
			System.out.println("cardList.size() = "+ cardList.size());
			if(cardList.size() > 0) {
				String strCashType = StringUtil.ObjToStr( cardList.get(0).get("V_CASH_TYPE")  ); 
				System.out.println("V_CASH_TYPE =  " + strCashType);
				System.out.println("V_CASH_TYPE =  " + strCashType);
				System.out.println("V_CASH_TYPE =  " + strCashType);
				if ("2".equals(strCashType)) {
					Map<String, Object> cardVo = cardList.get(0);
					
					V_PGCODE    = StringUtil.ObjToStr(cardVo.get("PGCODE"));
					V_AUTHCODE  = StringUtil.ObjToStr(cardVo.get("PGAUTHCODE"), "");
					V_CASH_TYPE = "2";
					
					cardVo.put("RESULTMSG"     ,  StringUtil.ObjToStr(cardVo.get("PGCODE"), ""));
					cardVo.put("GETRESULTPRICE",  "0");
					
					cardVo.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
					
					sqlSession.insert("REC000w_03DAO.INSERT_REC_CARDPAY", cardVo);
					sqlSession.insert("REC000w_03DAO.INSERT_REC_CARDPAY_HIS", cardVo);
				}
			}// cardList.size()
			
			
			
			
			String SMS_YN = StringUtil.ObjToStr( accRecInfo.get("SMS_YN") );
			
			String EVENT_DATE = "";
			String EVENT_CD   = "";
			String WEPAECNT   = "";
			
			for(int i = 0; i< ds_detailList.size(); i++) {
				Map<String, Object> info = ds_detailList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("ACCEPT_GBN"  , 8);
				info.put("SEQ"	       , 1);
				
				/*
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				System.out.println( "---->" + StringUtil.ObjToStr(info.get("EVENT_DATE")) );
				*/
				EVENT_DATE = StringUtil.ObjToStr(info.get("EVENT_DATE")) ;
				EVENT_CD   = StringUtil.ObjToStr(info.get("EVENT_CD")) ;
				WEPAECNT   = StringUtil.ObjToStr(info.get("WEPAECNT")) ;
				
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				
				sqlSession.insert("REC000w_03DAO.INSERT_SUB", info);
				
			     System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_DETAIL", info);
				sqlSession.insert("REC000w_03DAO.INSERT_MISU", info);
				
			}//
			
			
			int WEPAE_SEQ = 0;
			int EVENT_SEQ = 0;
			
			for(int i = 0; i< ds_dongChamJaList.size(); i++) {
				Map<String, Object> info = ds_dongChamJaList.get(i);
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("ACCEPT_SEQ"  , ACCEPT_SEQ);
				info.put("EVENT_DATE"  , EVENT_DATE);
				info.put("EVENT_CD"    , EVENT_CD);
				info.put("WEPAECNT"    , WEPAECNT);
				info.put("ACCEPT_GBN"  , 8);
				info.put("SEQ"	       , 1);
				
				info.put("V_PGCODE"  , V_PGCODE);
				info.put("V_AUTHCODE", V_AUTHCODE);
				
				
				String DONGCHAMJA_GBN = StringUtil.ObjToStr(info.get("DONGCHAMJA_GBN")) ;
				
				if(!"*".equals(DONGCHAMJA_GBN)){
					
					/*System.out.println("===================================");
					System.out.println("TEMPLE_CD = "+ info.get("TEMPLE_CD"));
					System.out.println("ACCEPT_SEQ = "+ info.get("ACCEPT_SEQ"));
					System.out.println("EVENT_DATE = "+ info.get("EVENT_DATE"));
					System.out.println("EVENT_CD = "+ info.get("EVENT_CD"));
					System.out.println("WEPAECNT = "+ info.get("WEPAECNT"));
					System.out.println("info = "+ info);*/
					
					WEPAE_SEQ = StringUtil.ObjectToInt(sqlSession.selectOne(NAMEPSACE+"selecWepaeSeq", info));
					
					EVENT_SEQ = StringUtil.ObjectToInt(sqlSession.selectOne(NAMEPSACE+"selecEventSeq", info));
				}
				info.put("WEPAE_SEQ", WEPAE_SEQ);
				info.put("EVENT_SEQ", EVENT_SEQ);
				
				int JOIN_SEQ = StringUtil.ObjectToInt(sqlSession.selectOne(NAMEPSACE+"selecJoinSeq", info));
				info.put("JOIN_SEQ", JOIN_SEQ);
				
				System.out.println(info);
				sqlSession.insert(NAMEPSACE+"INSERT_DONGCHAMJA", info);
				
			}// for i
			
			
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
		
	}
}
