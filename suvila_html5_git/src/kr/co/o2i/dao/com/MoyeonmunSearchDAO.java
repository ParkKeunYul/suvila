package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;
@Repository
public class MoyeonmunSearchDAO extends DefaultDAO{
	
	public String NAMEPSACE = "MoyeonmunSearchDAO.";
	
	
	public List<Map<String, Object>> SELECT_MOYEON(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_MOYEON",param,result );
		return list;
	}
	
}// MoyeonmunSearchDAO
