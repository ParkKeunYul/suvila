package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC000W_02DAO extends DefaultDAO {
	
	public String NAMEPSACE = "REC000w_02DAO.";
	
	public List<Map<String, Object>> SELECT_BUDINFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_BUDINFO",param,result );
		return list;
	}
	public List<Map<String, Object>> SELECT_SPIRITINFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SPIRITINFO",param,result );
		return list;
	}
	public List<Map<String, Object>> SELECT_REC_MASTER(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_MASTER",param,result );
		return list;
	}
	public List<Map<String, Object>> SELECT_SPIRITINFO_EQUAL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SPIRITINFO_EQUAL",param,result );
		return list;
	}


	
	/*
	 대주 신도 조회 
	public  List<Map<String,Object>> SELECT_BUDINFO(@Param("param")CommonMap param);
	
	 신도 영가 조회 
	public  List<Map<String,Object>> SELECT_SPIRITINFO(@Param("param")CommonMap param);
	
	 접수 조회 
	public  List<Map<String,Object>> SELECT_REC_MASTER(@Param("param")CommonMap param);
	
	 신도 영가 조회 
	public  List<Map<String,Object>> SELECT_SPIRITINFO_EQUAL(@Param("param")CommonMap param);
	*/
}
