package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.LunarCalendar;
import kr.co.o2i.util.StringUtil;


@Repository
public class REC003W_35DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC003w_35DAO.";
	
	
	public List<Map<String, Object>> SELECT_GIJE(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GIJE",param,result );
		
		return list;
	}
	

	
	
}
