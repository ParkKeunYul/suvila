package kr.co.o2i.dao.cad;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class CAD001P_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "CAD001p_01DAO.";
	
	public List<Map<String, Object>> SELECT_SINDO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println("param = "+ param);
		
		sqlSession.select(NAMEPSACE+"SELECT_SINDO",param,result );
		return list;
	}
	
	
}
