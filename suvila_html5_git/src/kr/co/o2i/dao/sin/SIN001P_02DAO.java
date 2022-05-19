package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class SIN001P_02DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_02DAO.";
	
	
	public List<Map<String, Object>> SELECT_SIN_BRANCH_FAMILY_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println("param = "+ param);
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_BRANCH_FAMILY_HIS",param,result );
		return list;
	}
	
	
}//SIN001P_02DAO
