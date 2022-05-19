package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC010W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC010w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_REC_USER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_REC_USER",param,result );
		
		return list;
	}
	public List<Map<String, Object>> SELECT_SELECT_BREAKDOWN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SELECT_BREAKDOWN",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SELECT_DAILYREPORT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SELECT_DAILYREPORT",param,result );
		
		return list;
	}
	
	
	/*public  List<Map<String,Object>> SELECT_REC_USER(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_SELECT_BREAKDOWN(@Param("param")CommonMap param);
	
	 일일접수내역 사찰별 조회 
	public  List<Map<String,Object>> SELECT_SELECT_DAILYREPORT(@Param("param")CommonMap param);*/
	
	
}
