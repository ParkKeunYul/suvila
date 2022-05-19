package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class SIN001P_07DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_07DAO.";
	
	
	public List<Map<String, Object>> cheanHonSelect(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"cheanHonSelect",param,result );
		return list;
	}
	
	public List<Map<String, Object>> cheanHonSelectGbn(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"cheanHonSelectGbn",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_SIN_DEATH_BOKWIJA(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_DEATH_BOKWIJA",param,result );
		return list;
	}
	
	public List<Map<String, Object>> cheanHonSelect_20120306(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"cheanHonSelect_20120306",param,result );
		return list;
	}
	
	public List<Map<String, Object>> selectcheanHonGbn(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"selectcheanHonGbn",param,result );
		return list;
	}
	
	
	
}//SIN001p_07DAO
