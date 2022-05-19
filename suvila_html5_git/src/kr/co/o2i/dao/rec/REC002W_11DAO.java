package kr.co.o2i.dao.rec;

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
public class REC002W_11DAO  extends DefaultDAO{

	
	public String  NAMEPSACE = "REC002W_11DAO.";
	
	
	public List<Map<String, Object>> SELECT_Ing(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Ing",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_General(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_General",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_Detail(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_Detail",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_pray_code(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_pray_code",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_bulsa_cd(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_bulsa_cd",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_bulsa_nm(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_bulsa_nm",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_bulsa_nm_all(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_bulsa_nm_all",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_bulsa_nm_sel(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_bulsa_nm_sel",param,result );
		return list;
	}
	
	
	public boolean GeneralSave( CommonMap param
							   ,List<Map<String, Object>> newList
							   ,List<Map<String, Object>> uptList
							   ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try {
			for(int i = 0; i< delList.size(); i++) {
				Map<String, Object> info = delList.get(i);

				info.put("V_BULSA_CD" , info.get("BULSA_CD"));
				info.put("V_TEMPLE_CD", info.get("TEMPLE_CD"));
				
				@SuppressWarnings("unchecked")
				List<Map<String, Object>>  list = sqlSession.selectList(NAMEPSACE+"SELECT_Detail", info);
				
				if(list.size() == 0) {
					sqlSession.update(NAMEPSACE+"DELETE_General", info);
				}else {
					throw new Exception(); 
				}
				
			}// for uptList
			
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("USE_YN"      , "T");
				info.put("ACPT_CLOSE"  , "");
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_General", info);
				
			}// for uptList
			
			
			for(int i = 0; i< newList.size(); i++) {
				Map<String, Object> info = newList.get(i);
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				info.put("USE_YN"      , "T");
				info.put("ACPT_CLOSE"  , "");
				
				
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"INSERT_General", info);
				
			}// for newList
			
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//GeneralSave
	
	public boolean DetailSave ( CommonMap param
							   ,List<Map<String, Object>> newList
							   ,List<Map<String, Object>> uptList
							   ,List<Map<String, Object>> delList){

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i< delList.size(); i++) {
				Map<String, Object> info = delList.get(i);

				info.put("V_BULSA_CD" , info.get("BULSA_CD"));
				info.put("V_TEMPLE_CD", info.get("TEMPLE_CD"));
				

				sqlSession.update(NAMEPSACE+"DELETE_Detail", info);

				
			}// for uptList
			
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("USE_YN"	   , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("AMOUNT"      , StringUtil.ObjectToInt( info.get("AMOUNT") ) );
				
				
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_Detail", info);
				
			}// for uptList
			
			
			for(int i = 0; i< newList.size(); i++) {
				Map<String, Object> info = newList.get(i);
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				
				
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"INSERT_Detail", info);
				
			}// for newList
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//DetailSave
	
	public boolean IngSave ( CommonMap param
							,List<Map<String, Object>> newList
							,List<Map<String, Object>> uptList
							,List<Map<String, Object>> delList){
				
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try {
			
			for(int i = 0; i< delList.size(); i++) {
				Map<String, Object> info = delList.get(i);

				info.put("V_BULSA_CD" , info.get("BULSA_CD"));
				info.put("V_TEMPLE_CD", info.get("TEMPLE_CD"));
				info.put("ACPT_FDATE", StringUtil.ObjToStr( info.get("ACPT_FDATE") ).replaceAll("-", "").substring(0, 8) );	
				info.put("ACPT_EDATE", StringUtil.ObjToStr( info.get("ACPT_EDATE") ).replaceAll("-", "").substring(0, 8) );

				sqlSession.update(NAMEPSACE+"DELETE_Ing", info);

				
			}// for uptList
			
			
			for(int i = 0; i< uptList.size(); i++) {
				Map<String, Object> info = uptList.get(i);
				
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("AMOUNT"      , StringUtil.ObjectToInt( info.get("AMOUNT") ) );
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				info.put("ACPT_FDATE", StringUtil.ObjToStr( info.get("ACPT_FDATE") ).replaceAll("-", "").substring(0, 8) );	
				info.put("ACPT_EDATE", StringUtil.ObjToStr( info.get("ACPT_EDATE") ).replaceAll("-", "").substring(0, 8) );
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("ACPT_CLOSE"  , StringUtil.StrBolToTF( info.get("ACPT_CLOSE")+"" ));
				
				
				sqlSession.update(NAMEPSACE+"UPDATE_Ing", info);
				
			}// for uptList
			
			
			for(int i = 0; i< newList.size(); i++) {
				Map<String, Object> info = newList.get(i);
				info.put("CRT_USER"    , param.getString("V_USER_ID"));
				info.put("UPT_USER"    , param.getString("V_USER_ID"));
				info.put("REMOTE"      , param.getString("V_REMOTE"));
				info.put("TEMPLE_CD"   , param.getString("V_TEMPLE_CD"));
				
				info.put("USE_YN"      , StringUtil.StrBolToTF( info.get("USE_YN")+"" ));
				info.put("ACPT_CLOSE"  , StringUtil.StrBolToTF( info.get("ACPT_CLOSE")+"" ));
				info.put("ACPT_FDATE"  , StringUtil.ObjToStr( info.get("ACPT_FDATE") ).replaceAll("-", "").substring(0, 8) );	
				info.put("ACPT_EDATE"  , StringUtil.ObjToStr( info.get("ACPT_EDATE") ).replaceAll("-", "").substring(0, 8) );
				
				
				sqlSession.update(NAMEPSACE+"INSERT_Ing", info);
				
			}// for newList
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		return true;
	}//IngSave
}
