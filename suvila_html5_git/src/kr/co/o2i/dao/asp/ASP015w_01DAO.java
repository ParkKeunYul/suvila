package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class ASP015w_01DAO extends DefaultDAO {
	
	public String NAMEPSACE = "ASP015w_01DAO.";
	
	public List<Map<String, Object>> SELECT_V_SMS_LOG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_V_SMS_LOG",param,result );
		return list;
	}
	
	
	
}
