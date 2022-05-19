package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class SeqDAO extends DefaultDAO {

	
	public String NAMEPSACE = "SeqDAO.";
	
	
	public List<Map<String, Object>> SELECT_SYS_DATE(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SYS_DATE",param,result );
		
		return list;
	}
	
	
	
}
