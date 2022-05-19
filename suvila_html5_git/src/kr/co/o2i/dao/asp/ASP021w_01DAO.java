package kr.co.o2i.dao.asp;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;

@Repository
public class ASP021w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP021w_01DAO.";
	
	
	public List<Map<String, Object>> selectPgInfo(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PG_INFO",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> selectTemplePgInfo(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TEMPLE_PG_INFO_HIS",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> selectPgInfoHis(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_PG_INFO_HIS",param,result );
		
		return list;
	}
	
	public boolean savePg(CommonMap param
			             ,List<Map<String, Object>> addList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			String PG_CODE =  sqlSession.selectOne(NAMEPSACE+"SELECT_PGCODE")+"";
			System.out.println("PG_CODE = "+ PG_CODE);
			param.put("PGCODE", PG_CODE);
			
			
			sqlSession.insert(NAMEPSACE+"INSERT_ASP_PG_INFO", param);
			
			
			//for(int i = 0; i<1; i++){
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("CRT_USER", param.getString("CRT_USER"));
				info.put("UPT_USER", param.getString("UPT_USER"));
				info.put("V_REMOTE", param.getString("V_REMOTE"));
				info.put("PGCODE"  , param.getString("PGCODE"));
				
				String COMMISSION_TO = StringUtil.ObjToStr(info.get("COMMISSION_TO"), "");
				
				if( "".equals( COMMISSION_TO )) info.put("COMMISSION_TO", "00000000");
				
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_PG_INFO_HIS", info);
			}
			
			// txManager.rollback(status);
			 txManager.commit(status);
			
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	public boolean savePgHis(CommonMap param){
		
		try{
			System.out.println(param);
			sqlSession.insert(NAMEPSACE+"INSERT_ASP_PG_INFO_HIS", param);
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
}//ASP005w_01DAO
