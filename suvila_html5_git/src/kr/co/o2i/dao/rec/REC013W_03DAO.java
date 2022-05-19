package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC013W_03DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC013w_03DAO.";
	
	public List<Map<String, Object>> SELECT_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_DETAIL",param,result );
		
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_MANAGE_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MANAGE_MGT",param,result );
		
		return list;
	}
	public boolean saveDetail( CommonMap param					    
				  			  ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				String MANAGE_END_DATE = StringUtil.ObjToStr(info.get("MANAGE_END_DATE"),"");
				if(!"".equals(MANAGE_END_DATE)){
					MANAGE_END_DATE = MANAGE_END_DATE.replaceAll("-", "").replaceAll("/", "");				
					MANAGE_END_DATE = MANAGE_END_DATE.substring(0, 6);
					info.put("MANAGE_END_DATE", MANAGE_END_DATE);
				}
				sqlSession.update(NAMEPSACE+"UPDATE_REC_MANAGE_DETAIL"    , info);
			}// for
		
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}
	
}
