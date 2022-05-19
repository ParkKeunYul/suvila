package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class MenuDAO extends DefaultDAO{

	
	
	public String NAMEPSACE = "MenuDAO.";
	
	
	public List<Map<String, Object>> selectmenuDao(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"selectmenuDao",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> TreeMenuDao(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"TreeMenuDao",param,result );
		
		return list;
	}
	
	/*
	public List<Map<String,Object>> selectmenuDao( @Param("param")CommonMap param
												  ,@Param("session")Map<String, Object> session );
	
	public List<Map<String,Object>> TreeMenuDao( @Param("param")CommonMap param
			                                    ,@Param("session")Map<String, Object> session );
	
	*/
}
