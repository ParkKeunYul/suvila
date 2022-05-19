package kr.co.o2i.dao.asp;

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
public class ASP008w_02DAO extends DefaultDAO {

	
	public String NAMEPSACE = "ASP008w_02DAO.";
	
	
	public List<Map<String, Object>> SELECT_ACCT_GBN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ACCT_GBN",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_KWAN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_KWAN",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_KWAN_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_KWAN_DETAIL",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_HANG(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_HANG",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_HANG_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_HANG_DETAIL",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_MOK(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MOK",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_MOK_DETAIL(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MOK_DETAIL",param,result );					
		return list;
	}
	
	public List<Map<String, Object>> SELECT_MOK_USE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_MOK_USE",param,result );					
		return list;
	}
	
	
	
	public boolean transactKwanSave(CommonMap param
								   ,List<Map<String, Object>> addList
								   ,List<Map<String, Object>> uptList
			   					   ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				System.out.println("info = "+ info);
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_KWAN", info);
			}
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("uptinfo = "+ info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_KWAN", info);
			}
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("add info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_KWAN", info);
			}
			
			//txManager.rollback(status);
			txManager.commit(status);
			System.out.println("1111111111111111111");
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}
	
	public boolean transactHangSave(CommonMap param
								   ,List<Map<String, Object>> addList
								   ,List<Map<String, Object>> uptList
								   ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				System.out.println("info = "+ info);
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_HANG", info);
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("uptinfo = "+ info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_HANG", info);
			}
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("add info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_HANG", info);
			}
			
			
			//txManager.rollback(status);
			txManager.commit(status);			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	
	}//
	
	public boolean transactMokSave(CommonMap param
								  ,List<Map<String, Object>> addList
								  ,List<Map<String, Object>> uptList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				
				String CHANGE = StringUtil.ObjToStr( info.get("CHANGE")  );
				
				if("이동중".equals(CHANGE)){
					
					/*info.put("V_KWAN", param.getString("PROMPT_K"));
					info.put("V_HANG", param.getString("PROMPT_H"));
					info.put("V_MOK" , param.getString("PROMPT_M"));*/
					
					System.out.println(param);
					System.out.println("이동중 = "+ info);
					
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_ACC_BUDGET", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_ACC_CHONGMU_MONEY_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_ACC_MONEY_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_ACC_MONEY_TEMP_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_ASP_TEMPLE_CMS_INFO", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_ALWAYS_PRAY_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_BULSA_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_DEUNG_CLASS_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_PRAY_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_SUPPORT_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_TEMPLE_STAY_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_REC_WEPAE_CHONHON_MGT", info);
					sqlSession.update(NAMEPSACE+"CHANGE_MOK_CODE_SIN_GROUP_MGT", info);
				}else{
					sqlSession.update(NAMEPSACE+"UPDATE_MOK", info);
				}
			}// upt
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				info.put("V_ACCT_GBN_NM" , param.getString("V_ACCT_GBN_NM"));
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("add info = "+ info);
				
				sqlSession.insert(NAMEPSACE+"INSERT_MOK", info);
			}//add
			
			
			//txManager.rollback(status);
			txManager.commit(status);			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}//
	
	public boolean transactMokDetailSave(CommonMap param
								        ,List<Map<String, Object>> uptList
								        ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
		
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				
				System.out.println("transactMokDetailSave = "+ info);
				
				sqlSession.delete(NAMEPSACE+"DELETE_MOK_DETAIL", info);
			}
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				
				info.put("V_IE_GBN"      , param.getString("lc_IeGbn"));
				info.put("V_ACCT_GBN"    , param.getString("lc_AcctGbn"));
				info.put("V_USER_ID"     , param.getString("V_USER_ID"));
				info.put("V_REMOTE"      , param.getString("V_REMOTE"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_MOK_DETAIL", info);
				
			}
			
			//txManager.rollback(status);
			txManager.commit(status);			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
	}//
	
	
	public boolean saveAcctGbn(CommonMap param){
		try{
			
			//System.out.println(param);
			sqlSession.update(NAMEPSACE+"UPDATE_ACCT_GBN", param);
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
}
