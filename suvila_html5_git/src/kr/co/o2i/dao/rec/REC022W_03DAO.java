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
public class REC022W_03DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC022w_03DAO.";
	
	public List<Map<String, Object>> SELECT_WONBUL_REC_NAB(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_WONBUL_REC_NAB",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_WONBUL_REC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_WONBUL_REC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_DONGCHAM(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DONGCHAM",param,result );
		return list;
	}
	
}
