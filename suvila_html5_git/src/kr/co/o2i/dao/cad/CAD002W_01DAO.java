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
public class CAD002W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "CAD002w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_NAME_CARD_GROUP_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD_GROUP_MGT",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_NAME_CARD_GROUP(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD_GROUP",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_NAME_CARD_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_NAME_CARD_INFO",param,result );
		return list;
	}
	
	
	public boolean saveGroup( CommonMap param
							 ,List<Map<String, Object>> newList
							 ,List<Map<String, Object>> uptList
							 ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			
			System.out.println("addList = "+ newList.size());
			System.out.println("uptList = "+ uptList.size());
			System.out.println("delList = "+ delList.size());
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				sqlSession.update(NAMEPSACE+"DELETE_NAME_CARD_GROUP_MGT_INFO", info);
				sqlSession.update(NAMEPSACE+"DELETE_NAME_CARD_GROUP_MGT", info);
				
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				info.put("TRUE_PARAM" , true);
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_NAME_CARD_GROUP_MGT", info);
				
			}
			
			
			for(int i = 0; i<newList.size(); i++){
				Map<String, Object> info  = newList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				info.put("TRUE_PARAM" , true);
				
				sqlSession.update(NAMEPSACE+"INSERT_NAME_CARD_GROUP_MGT", info);
				
			}
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			txManager.rollback(status);
			e.printStackTrace();
			return false;
		}
		return true;
		
	}// saveGroup
	
	
	public boolean saveCard( CommonMap param
							,List<Map<String, Object>> newList
							,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			System.out.println("addList = "+ newList.size());
			System.out.println("delList = "+ delList.size());
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_NAME_CARD_INFO", info);
				
			}// for
			
			
			for(int i = 0; i<newList.size(); i++){
				Map<String, Object> info  = newList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String STORE_STATUS = StringUtil.ObjToStr(info.get("STORE_STATUS"), "1");
				
				
				if("1".equals(STORE_STATUS)){
					int countRow = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_NAME_CARD_CNT", info);
					if("0".equals(countRow+"")){
						sqlSession.insert(NAMEPSACE+"INSERT_NAME_CARD_INFO", info);
					}
				}else{
					System.out.println("["+i +"] Move Delete = " + info);
					sqlSession.delete(NAMEPSACE+"DELETE_NAME_CARD_INFO", info);
				}
				
				
				
			}// for
			
			
			//txManager.rollback(status);
			txManager.commit(status);
			
		}catch (Exception e) {
			txManager.rollback(status);
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	
}
