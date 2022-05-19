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
public class REC000P_05DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC000p_05DAO.";
	
	public List<Map<String, Object>> SELECT_REC_PAYMENT_HIS(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_REC_PAYMENT_HIS",param,result );
		
		return list;
	}
	
	
}
