package kr.co.o2i.dao.sin;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class SIN010W_01DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN010w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_INFO",param,result );
		return list;
	}
	
	
	public boolean saveGroup( CommonMap param
							 ,List<Map<String, Object>> newList
							 ,List<Map<String, Object>> uptList
							 ,List<Map<String, Object>> delList){
	
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
	
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("REMOTE"   , param.getString("V_REMOTE"));

				sqlSession.update(NAMEPSACE+"DELETE_INFO_ALL", info);
				sqlSession.update(NAMEPSACE+"DELETE_MGT", info);
			}
		
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("UPT_USER" , param.getString("V_USER_ID"));
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("REMOTE"   , param.getString("V_REMOTE"));
				
				boolean USE_YN = StringUtil.ObjToBol( info.get("USE_YN") );
				info.put("USE_YN", "F");
				if(USE_YN) info.put("USE_YN", "T");
			
				sqlSession.update(NAMEPSACE+"UPDATE_MGT", info);
			}
	
	
			for(int i = 0; i<newList.size(); i++){
				Map<String, Object> info  = newList.get(i);
				info.put("UPT_USER" , param.getString("V_USER_ID"));
				info.put("CRT_USER" , param.getString("V_USER_ID"));
				info.put("REMOTE"   , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				boolean USE_YN = StringUtil.ObjToBol( info.get("USE_YN") );
				info.put("USE_YN", "F");
				if(USE_YN) info.put("USE_YN", "T");
				
				sqlSession.insert(NAMEPSACE+"INSERT_MGT", info);
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
	
	public boolean saveSindo( CommonMap param
							 ,List<Map<String, Object>> newList
							 ,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
	
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				
				sqlSession.update(NAMEPSACE+"DELETE_INFO", info);
			}// for
		
		
			for(int i = 0; i<newList.size(); i++){
				Map<String, Object> info  = newList.get(i);
				info.put("UPT_USER" , param.getString("V_USER_ID"));
				info.put("CRT_USER" , param.getString("V_USER_ID"));
				info.put("REMOTE"   , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				
				
				String STORE_STATUS = StringUtil.ObjToStr(info.get("STORE_STATUS"), "1");
				System.out.println("STORE_STATUS = "+ STORE_STATUS);
				
				if("1".equals(STORE_STATUS)){
					int Duple = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_DUPLE_INFO", info);
					if(Duple == 0) {
						sqlSession.insert(NAMEPSACE+"INSERT_INFO", info);
					}
				}else{
					System.out.println("["+i +"] Move Delete = " + info);
					sqlSession.delete(NAMEPSACE+"DELETE_INFO", info);
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
	}// saveGroup
	
}//SIN010W_01DAO
