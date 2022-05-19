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
public class REC001W_06DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC001w_06DAO.";
	
	public List<Map<String, Object>> SELECT_IDREC_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_IDREC_PRINT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ID_CH_REC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ID_CH_REC",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ID_CH_PRINT_01(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ID_CH_PRINT_01",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ID_CH_PRINT_02_2(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ID_CH_PRINT_02_2",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_YD_REC_PRINT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD_REC_PRINT",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_YD_REC_PRINT_01(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD_REC_PRINT_01",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YD_REC_PRINT_02(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD_REC_PRINT_02",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YD_REC_PRINT_03(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD_REC_PRINT_03",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YD2_REC_PRINT_02(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD2_REC_PRINT_02",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_YD_REC_PRINT_02_NEW(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_YD_REC_PRINT_02_NEW",param,result );
		return list;
	}
	
}
