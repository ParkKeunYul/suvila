package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC013W_05DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC013w_05DAO.";
	
	public List<Map<String, Object>> SELECT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT",param,result );
		
		return list;
	}
	
	
	
}
