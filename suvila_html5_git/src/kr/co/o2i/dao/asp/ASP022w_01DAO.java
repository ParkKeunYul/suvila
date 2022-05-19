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
public class ASP022w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP022w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_TEMPLE_PG_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TEMPLE_PG_INFO",param,result );
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_TEMPLE_PG_INFO_HIS(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_TEMPLE_PG_INFO_HIS",param,result );
		
		return list;
	}
	
	
	public boolean save(CommonMap param
			            ,List<Map<String, Object>> addList
			            ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			System.out.println(param);
	//		sqlSession.insert(NAMEPSACE+"INSERT_ASP_PG_INFO", param);
			
			String PGCODE = param.getString("PGCODE", "");
			if("".equals(PGCODE)){
				param.put("PGCODE", "01");
			}
			
			int existCard = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_PG_CNT", param);
			System.out.println("existCard = "+ existCard);
			String TOP_TP_COMMISSION_TO = StringUtil.ObjToStr(param.get("TP_COMMISSION_TO"), "");
			if("".equals(TOP_TP_COMMISSION_TO)){
				param.put("TP_COMMISSION_TO", "00000000");
			}
			
			if(existCard  == 0){
				sqlSession.insert(NAMEPSACE+"INSERT_TEMPLE_PG_INFO", param);
			}
			else{
				sqlSession.update(NAMEPSACE+"UPDATE_TEMPLE_PG_INFO", param);
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				String TP_COMMISSION_TO = StringUtil.ObjToStr(info.get("TP_COMMISSION_TO"), "");
				if( "".equals( TP_COMMISSION_TO )) info.put("TP_COMMISSION_TO", "00000000");
				
				sqlSession.update(NAMEPSACE+"UPDATE_TEMPLE_PG_INFO_HIS", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				
				String TP_COMMISSION_TO = StringUtil.ObjToStr(info.get("TP_COMMISSION_TO"), "");
				if( "".equals( TP_COMMISSION_TO )) info.put("TP_COMMISSION_TO", "00000000");
				
				sqlSession.insert(NAMEPSACE+"INSERT_TEMPLE_PG_INFO_HIS", info);
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
	
}//ASP022w_01DAO
