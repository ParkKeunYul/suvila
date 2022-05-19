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
public class REC004W_06DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC004w_06DAO.";
	
	public List<Map<String, Object>> SELECT_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SPIRIT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		System.out.println(param);
		System.out.println(param);
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_SPIRIT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_000031(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_000031",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_PRAY(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_PRAY",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_CHUKWON_CHONHON(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_CHUKWON_CHONHON",param,result );
		return list;
	}
	
}
