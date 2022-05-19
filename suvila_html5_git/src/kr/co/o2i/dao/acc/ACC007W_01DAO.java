package kr.co.o2i.dao.acc;

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
public class ACC007W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "ACC007w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ACC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ACC",param,result );
		return list;
	}
	
	public boolean save( CommonMap param					    
		    			,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		try{
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER"  , param.getString("V_USER_ID"));
				info.put("UPT_USER"  , param.getString("V_USER_ID"));
				info.put("REMOTE"    , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				String SQL_MODE = StringUtil.ObjToStr(info.get("SQL_MODE"));
				if( "I".equals(SQL_MODE) ) {
					String ACT_DATE = StringUtil.ObjToStr(info.get("ACT_DATE"));
					info.put("ACT_DATE", ACT_DATE.substring(0,10).replaceAll("-",""));
				}
				
				String ACT_NO = StringUtil.ObjToStr(info.get("ACT_NO") , "");
				//System.out.println("ACT_NO = "+ ACT_NO);
				
				if(ACT_NO == null  || "".equals(ACT_NO)){
					String sTempActNo = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_GET_TEMP_ACTNO",info);
					
					//System.out.println("sTempActNo = "+ sTempActNo);
					
					info.put("ACT_NO", sTempActNo);
				}
				
				int duple = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_DUPLE_BOGO",info);
				
				//System.out.println("duple = "+ duple);
				
				
				if(duple == 0){
					System.out.println("info = "+ info);
					sqlSession.insert(NAMEPSACE+"INSERT_ACT_BOGO", info);
				}
				
				
			}//for
			// txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//  save
	
}
