package kr.co.o2i.dao.rec;

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
public class REC002W_12DAO  extends DefaultDAO{

	
	public String  NAMEPSACE = "REC002W_12DAO.";
	
	
	public List<Map<String, Object>> SELECT_BSKIND(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select("REC002w_03DAO.SELECT_BSKIND",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BSREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSREC",param,result );
		return list;
	}
	
}
