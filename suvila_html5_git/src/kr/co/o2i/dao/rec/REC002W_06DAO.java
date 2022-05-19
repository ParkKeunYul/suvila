package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC002W_06DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC002w_06DAO.";
	
	public List<Map<String, Object>> SELECT_GDREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GDREC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_GDREC_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_GDREC_PRINT",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_BSREC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSREC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BSREC_CH1(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSREC_CH1",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BSREC_CH3(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BSREC_CH3",param,result );
		return list;
	}
	
}
