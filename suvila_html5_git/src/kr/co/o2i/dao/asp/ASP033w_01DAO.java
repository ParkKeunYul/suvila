package kr.co.o2i.dao.asp;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CreateAreaCode;
import kr.co.o2i.util.StringUtil;

@Repository
public class ASP033w_01DAO extends DefaultDAO{

	public String NAMEPSACE = "ASP033w_01DAO.";
	
	
	public List<Map<String, Object>> selectSindoCardNew(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"selectSindoCardNew",param,result );
		
		return list;
	}
	
	
	public boolean save( CommonMap param					    
						,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			int CARD_CNT = 0;
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				String ISSUE_STATE = StringUtil.ObjToStr( info.get("ISSUE_STATE") );
				
				String DELIVERY_DATE = StringUtil.ObjToStr(info.get("DELIVERY_DATE"));
				if(DELIVERY_DATE.length() >= 10) {
					DELIVERY_DATE = (DELIVERY_DATE.substring(0,10)).replaceAll("-", "");
				}
				info.put("DELIVERY_DATE", DELIVERY_DATE);
				
				
				if("2".equals(ISSUE_STATE)){
					
					
					String SEC_SEQ = StringUtil.ObjToStr(info.get("SEC_SEQ"), "");
					
					
					if(!"".equals(SEC_SEQ) && !"0".equals(SEC_SEQ)) {
						sqlSession.update(NAMEPSACE+"UPDATE_ISSUE_SIN_CARD", info );
					}else {
						sqlSession.update(NAMEPSACE+"UPDATE_ISSUE_SIN_CARD", info );
						
						Map<String, Object> mapDetail = (Map<String, Object>)sqlSession.selectOne(NAMEPSACE+"SELECT_SECRECT_CODE", info);
						
						System.out.println("mapDetail = "+ mapDetail);
						
						String sSecSeq = StringUtil.ObjToStr( mapDetail.get("SEQ") ,"" ).replace(".0", "");
						
						info.put("SEC_SEQ"    , sSecSeq);
						info.put("V_CARD_CODE", mapDetail.get("CARD_CODE") );
						
						
						String sCard_No1 = StringUtil.ObjToString(  info.get("TEMPLE_CD") , "").substring(2,6);
						String sCard_No2 = "";
						String sCard_No3 = CARD_CNT+"";
						
						Date today = new Date();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
						sCard_No3 = sdf.format(today).substring(2,4);
						
						Map<String, Object> addrDetail = (Map<String, Object>)sqlSession.selectOne(NAMEPSACE+"SELECT_ADDR", info);
						
						sCard_No2 = CreateAreaCode.getAreaCode( StringUtil.ObjToString( addrDetail.get("ADDR1"), "") );
						System.out.println(addrDetail);
						info.put("CARD_NO", sCard_No1+sCard_No2+sCard_No3);
						
						System.out.println("CARD_NO1 = "+ sCard_No1);
						System.out.println("CARD_NO2 = "+ sCard_No2);
						System.out.println("CARD_NO3 = "+ sCard_No3);
						
						CARD_CNT ++;
						
						sqlSession.update(NAMEPSACE+"UPDATE_ISSUE_SIN_CARD_ALL", info );
						sqlSession.update(NAMEPSACE+"UPDATE_SEC_MGT", info );
					}
				}else{
					sqlSession.update(NAMEPSACE+"UPDATE_ISSUE_SIN_CARD", info );
				}
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
}
