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
public class ASP003w_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP003w_01DAO.";
	
	public List<Map<String, Object>> GroupSelect(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"GroupSelect",param,result );
		return list;
	}
	
	public boolean transactGroupSave(List<Map<String, Object>> addList
								   ,List<Map<String, Object>> uptList
								   ,CommonMap param){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String , Object> info = uptList.get(i);
				info = StringUtil.setTractBaseParam(info, param);
				sqlSession.insert(NAMEPSACE+"GroupUpdate", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String , Object> info = addList.get(i);
				info = StringUtil.setTractBaseParam(info, param);
				sqlSession.insert(NAMEPSACE+"GroupInsert", info);
			}
			
			txManager.commit(status);
			// txManager.rollback(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
	public List<Map<String, Object>> CodeSelect(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"CodeSelect",param,result );
		return list;
	}
	
	public boolean transactCodeSave(List<Map<String, Object>> addList
            					   ,List<Map<String, Object>> uptList
            					   ,CommonMap param){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String , Object> info = uptList.get(i);
				info = StringUtil.setTractBaseParam(info, param);
				
				System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"CodeUpdate", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String , Object> info = addList.get(i);
				info = StringUtil.setTractBaseParam(info, param);
				
				System.out.println(info);
				
				sqlSession.insert(NAMEPSACE+"CodeInsert", info);
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
}
