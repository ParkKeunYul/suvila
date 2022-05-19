package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CreateAreaCode;
import kr.co.o2i.util.StringUtil;

@Repository
public class ASP044w_10DAO extends DefaultDAO{

	
	public String NAMEPSACE = "ASP044w_10DAO.";
	
	
	public List<Map<String, Object>> SELECT_LOG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_LOG",param,result );
		
		return list;
	}	
	
}
