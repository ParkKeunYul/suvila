package kr.co.o2i.dao.cms;

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
public class CMS002W_01DAO extends DefaultDAO{
	
	
	
	public String NAMEPSACE = "CMS002w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_CMS_INFO_LIST(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_CMS_INFO_LIST",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ALL_ASP_TEMPLE_CMS_INFO_LIST(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ALL_ASP_TEMPLE_CMS_INFO_LIST",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_CMS_INFO_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_CMS_INFO_DETAIL",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_CMS_PAYMENT_DAY_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_CMS_PAYMENT_DAY_MGT",param,result );
		return list;
	}
	
	public boolean UPDATE_ASP_TEMPLE_CMS_INFO(CommonMap param){
		try{
			sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_CMS_INFO",param);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	
	
	
}
