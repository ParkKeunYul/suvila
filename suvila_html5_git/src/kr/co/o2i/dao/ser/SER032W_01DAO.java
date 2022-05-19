package kr.co.o2i.dao.ser;

import java.util.*;

import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class SER032W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER032w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SMS_LOG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_SMS_LOG",param,result );
		return list;
	}
	
	
}//SER032W_01DAO
