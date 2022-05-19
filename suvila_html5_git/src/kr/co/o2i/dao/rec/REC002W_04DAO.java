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
import kr.co.o2i.util.StringUtil;


@Repository
public class REC002W_04DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC002w_04DAO.";
	
	public List<Map<String, Object>> SELECT_MISU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MISU",param,result );
		return list;
	}
	
	
}
