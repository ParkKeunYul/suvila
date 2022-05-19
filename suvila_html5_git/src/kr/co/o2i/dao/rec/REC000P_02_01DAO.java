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
public class REC000P_02_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "REC000P_02_01DAO.";
	
	public List<Map<String, Object>> SELECT_PRINT_GD(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GD",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_ID(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_ID",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_SAGU(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SAGU",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_SAGU_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SAGU_MASTER",param,result );
		return list;
	}
	
	public String getDeungGbn(CommonMap param) {
		return (String)sqlSession.selectOne(NAMEPSACE+"getDeungGbn", param);
	}
	
	
	
	
	public List<Map<String, Object>> SELECT_PRINT_SAGU_EVENT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SAGU_EVENT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_SAGU_DEATH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SAGU_DEATH",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_SAGU_BOKWI(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SAGU_BOKWI",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_GIJE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GIJE",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_GIJE_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GIJE_MASTER",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_GIJE_EVENT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GIJE_EVENT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_GIJE_DEATH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GIJE_DEATH",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_GIJE_BOKWI(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_GIJE_BOKWI",param,result );
		return list;
	}
	
	
	
	
	
	public List<Map<String, Object>> SELECT_PRINT_CDJ(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_CDJ",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_CDJ_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_CDJ_MASTER",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_CDJ_EVENT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_CDJ_EVENT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_CDJ_DEATH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_CDJ_DEATH",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_CDJ_BOKWI(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_CDJ_BOKWI",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_PRINT_WC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_WC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_SGD(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_SGD",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_YD_LIVE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_YD_LIVE",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_PRINT_YD_DEATH(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_PRINT_YD_DEATH",param,result );
		return list;
	}
	
	
}
