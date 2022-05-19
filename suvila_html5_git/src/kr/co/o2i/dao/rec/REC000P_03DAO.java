package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.ibm.icu.text.IDNA.Info;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC000P_03DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC000p_03DAO.";
	
	
	public List<Map<String, Object>> SELECT_DENG(CommonMap param){
		
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DENG",param,result );
		
		return list;
	}
	
	
	public void UPDATE_GETLIGHT(CommonMap param){
		System.out.println("param = "+ param);
		sqlSession.update(NAMEPSACE+"UPDATE_GETLIGHT",param);
	}
	
}
