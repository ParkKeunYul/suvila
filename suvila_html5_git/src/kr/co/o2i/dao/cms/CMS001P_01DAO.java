package kr.co.o2i.dao.cms;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;


@Repository
public class CMS001P_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "CMS001p_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_CMS_UPT_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_CMS_UPT_HIS",param,result );
		return list;
	}
	
}
