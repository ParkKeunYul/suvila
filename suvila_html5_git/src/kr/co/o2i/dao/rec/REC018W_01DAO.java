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
public class REC018W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC018w_01DAO.";
	
	public List<Map<String, Object>> SELECT_General(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_General",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DONATION_PRINT_EXCEL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select("REC015w_01DAO.SELECT_DONATION_PRINT_EXCEL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DONATION_PRINT_EXCEL2(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select("REC015w_01DAO.SELECT_DONATION_PRINT_EXCEL2",param,result );
		return list;
	}
	
	
	
	public List<Map<String, Object>> SELECT_Detail(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_Detail",param,result );
		return list;
	}
	
	
	public boolean UPDATE_DONATION_ADDR(CommonMap param) {
		try {
			sqlSession.update(NAMEPSACE+"UPDATE_DONATION_ADDR",param);
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean UPDATE_DONATION_CANCEL_DETAIL(CommonMap param) {
		try {
			sqlSession.update(NAMEPSACE+"UPDATE_DONATION_CANCEL_DETAIL",param);
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<Map<String, Object>> SELECT_DONATION_PRINT(CommonMap param
														  ,List<Map<String, Object>> addList){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		for(int i = 0; i<addList.size() ; i++) {
			Map<String, Object> info = new HashMap<String, Object>();
			info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
			info.put("V_BUD_NO"    , addList.get(i).get("BUD_NO"));
			info.put("V_YEAR"      , addList.get(i).get("GIBU_DAY"));
			info.put("V_GIBU_NO"   , addList.get(i).get("GIBU_NO"));
			
			
			sqlSession.select("REC015w_01DAO.SELECT_DONATION_PRINT",info,result );
		}			
		//
		return list;
	}
	
	
}
