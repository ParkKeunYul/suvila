package kr.co.o2i.dao.rec;

import java.util.HashMap;
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
public class REC015W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC015w_01DAO.";
	
	public List<Map<String, Object>> SELECT_YEAR(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_YEAR",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_Detail(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_Detail",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_REC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_REC",param,result );
		return list;
	}
	
	public Map<String, Object> DetailSave( CommonMap param					    
							  ,List<Map<String, Object>> addList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		Map<String, Object> rtnMap = new HashMap<String, Object>();
		rtnMap.put("flag", false);
		
		try{
			
			String V_GIBU_NO = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_GIBU_NO", param);
			param.put("V_GIBU_NO", V_GIBU_NO);
			
			rtnMap.put("GIBU_NO", V_GIBU_NO);
			
			if("T".equals(param.getString("SEL_GBN"))){
				sqlSession.update(NAMEPSACE+"UPDATE_General", param);
			}
			
			System.out.println(param);
			sqlSession.insert(NAMEPSACE+"INSERT_General", param);
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				info.put("V_GIBU_NO"   , V_GIBU_NO);
				
				info.put("ZIP_CD"  , param.getString("ZIP_CD"));
				info.put("ADDR1"   , param.getString("ADDR1"));
				info.put("ADDR2"   , param.getString("ADDR2"));
				info.put("BLDG_NUM", param.getString("BLDG_NUM"));
				info.put("NAME_KOR", param.getString("NAME_KOR"));
				
				if("T".equals(param.getString("SEL_GBN"))){
					info.put("JUMIN_NO", param.getString("JUMIN_NO"));
				}else {
					info.put("SAUP_NO", param.getString("SAUP_NO"));
				}
				sqlSession.insert(NAMEPSACE+"INSERT_Detail"    , info);
				
				
				rtnMap.put("BUD_NO"   , info.get("BUD_NO"));
				rtnMap.put("GIBU_DAY" , info.get("GIBU_DAY"));
			}// for
			
			//txManager.rollback(status);
			txManager.commit(status);
			rtnMap.put("flag", true);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
		}
		return rtnMap;
		
	}
	
	
	public List<Map<String, Object>> SELECT_DONATION_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_DONATION_PRINT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_TEMPLE_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_TEMPLE_INFO",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_IMAGE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_IMAGE",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_IMAGE_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_IMAGE_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GIBU_TOTAL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_GIBU_TOTAL",param,result );
		return list;
	}
	
}
