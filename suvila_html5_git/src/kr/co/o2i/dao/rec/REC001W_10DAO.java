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
public class REC001W_10DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC001w_10DAO.";
	
	public List<Map<String, Object>> SELECT_Jungak(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Jungak",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> select_Grade(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Grade",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> selectAmount(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_DEUNG_PRICE_MGT",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_Building(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Building",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SindoInfo(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		if("2".equals(param.getString("V_ACCEPT_GBN"))) {
			sqlSession.select(NAMEPSACE+"SELECT_SindoInfo"+param.getString("V_ACCEPT_GBN"),param,result );
		}else {
			sqlSession.select(NAMEPSACE+"SELECT_SindoInfo",param,result );
		}
		
		return list;
	}
	
	
	public boolean REC_002W_10_A(CommonMap param){
	
		try{
			sqlSession.update(NAMEPSACE+"REC_002W_10_A",param);
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
	public boolean REC_002W_10_B(CommonMap param){
		
		try{
			sqlSession.update(NAMEPSACE+"REC_002W_10_B",param);
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean REC_002W_10_D(CommonMap param){
		
		try{
			
			String V_ACCEPT_GBN = param.getString("V_ACCEPT_GBN");
			
			
			if("2".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_INDEUNG_D",param);
			}
			else if("4".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_YEONDEUNG_D",param);
			}
			else if("12".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_WONBUL_D",param);
			}
			else if("14".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_YOUNGTOP_D",param);
			}else {
				return false;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean REC_002W_10_C(CommonMap param){
		
		try{
			
			String V_ACCEPT_GBN = param.getString("V_ACCEPT_GBN");
			
			
			if("2".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_INDEUNG_C",param);
			}
			else if("4".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_YEONDEUNG_C",param);
			}
			else if("12".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_WONBUL_C",param);
			}
			else if("14".equals(V_ACCEPT_GBN)) {
				sqlSession.update(NAMEPSACE+"REC_002W_10_YOUNGTOP_C",param);
			}else {
				return false;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<Map<String, Object>> SELECT_DEUNG_PERIOD_INFO(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println("SELECT_DEUNG_PERIOD_INFO = "+ param);
		
		sqlSession.select(NAMEPSACE+"SELECT_DEUNG_PERIOD_INFO",param,result );
		
		return list;
	}
	
	public boolean savePeriodInfo( CommonMap param
								  ,List<Map<String, Object>> uptList){
		
		try{
			
			Map<String, Object> info = uptList.get(0);
			
			info.put("V_TEMPLE_CD", param.get("V_TEMPLE_CD"));
			info.put("V_USER_ID"  , param.get("V_USER_ID"));
			info.put("V_REMOTE"   , param.get("V_REMOTE"));
			
			
			System.out.println("savePeriodInfo info = "+ info);
			
			sqlSession.update(NAMEPSACE+"UPDATE_REC_INDEUNG_DETAIL_PEROID",info);
			
			
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}// savePeriodInfo
	
	

}
