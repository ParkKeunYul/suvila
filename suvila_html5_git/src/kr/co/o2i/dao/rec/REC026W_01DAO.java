package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;

@Repository
public class REC026W_01DAO extends DefaultDAO {

	public String NAMEPSACE = "REC026W_01DAO.";
	
	public List<Map<String, Object>> SELECT_REC_PAYMENT_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_PAYMENT_HIS",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_FAMILY_REC_PAYMENT_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_FAMILY_REC_PAYMENT_HIS",param,result );
		return list;
	}
	
}// REC026W_01DAO
