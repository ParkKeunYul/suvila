package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class SIN012W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN012w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_SINDO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		String SQL = "SELECT_SINDO_T";
		
		
		
		if( !"1".equals( param.getString("V_POST_TRANS") ) )  SQL = "SELECT_SINDO_F";
		
		
		
		sqlSession.select(NAMEPSACE+SQL,param,result );
		return list;
	}
	
	
}//SIN012W_01DAO
