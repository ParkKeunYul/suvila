package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC002W_05DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC002w_05DAO.";
	
	public List<Map<String, Object>> SELECT_ALL(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ALL",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRAY(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRAY",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BULSA(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_BULSA",param,result );
		return list;
	}
	
	
}
