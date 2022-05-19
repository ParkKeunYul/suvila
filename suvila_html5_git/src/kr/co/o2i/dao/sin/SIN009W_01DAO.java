package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class SIN009W_01DAO extends DefaultDAO{
	
	public String NAMEPSACE = "SIN009w_01DAO.";
	
	public List<Map<String, Object>> SELECT_V_SMS_LOG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_V_SMS_LOG",param,result );
		return list;
	}
	
}//SIN009W_01DAO
