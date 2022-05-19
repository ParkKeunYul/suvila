package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC011W_05DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC011w_05DAO.";
	
	public List<Map<String, Object>> SELECT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT",param,result );
		return list;
	}
	
	
	
}
