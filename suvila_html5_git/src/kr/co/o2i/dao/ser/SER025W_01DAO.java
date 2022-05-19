package kr.co.o2i.dao.ser;

import java.util.*;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class SER025W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER025w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_REC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_REC",param,result );
		return list;
	}
	
	public boolean UPDAET_CANCEL(CommonMap param
			                    ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("UPT_USER"    , param.getString("V_ADMIN_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("REMOTE"      , StringUtil.ObjToBol(info.get("SEL_YN")));
				
				sqlSession.update(NAMEPSACE+"UPDAET_CANCEL"        , info);
				sqlSession.update(NAMEPSACE+"UPDAET_CANCEL_DETAIL" , info);
				
			}// for
			
			txManager.rollback(status);
			//txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//
	
	
}//SER025W_01DAO
