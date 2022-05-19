package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class ASP033w_02DAO extends DefaultDAO{

	public String NAMEPSACE = "ASP033w_02DAO.";
	
	
	public List<Map<String, Object>> SELECT_ISSUE_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ISSUE_INFO",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ISSUE_INFO_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ISSUE_INFO_DETAIL",param,result );
		
		return list;
	}
}
