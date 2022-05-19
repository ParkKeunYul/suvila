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
public class SER001W_01DAO extends DefaultDAO{
	
	
	public String NAMEPSACE = "SER001w_01DAO.";
	
	
	public List<Map<String, Object>> UserSelect(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"UserSelect",param,result );
		return list;
	}
	
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_USER_FAMILY_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_USER_FAMILY_MGT",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_USER_SCHOLAR(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_USER_SCHOLAR",param,result );
		return list;
	}
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_USER_EDU_MGT(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_USER_EDU_MGT",param,result );
		return list;
	}
	
	
	
	
	
	
	public List<Map<String, Object>> fileUserDao(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"fileUserDao",param,result );
		return list;
	}
	public List<Map<String, Object>> FamilyinfoDao(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"FamilyinfoDao",param,result );
		return list;
	}
	public List<Map<String, Object>> AchievemtDao(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"AchievemtDao",param,result );
		return list;
	}
	public List<Map<String, Object>> HistconfDao(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"HistconfDao",param,result );
		return list;
	}
	
	
	public int save( CommonMap param
			            ,List<Map<String, Object>> addList
			            ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		try{
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String BIRTHDAY      = StringUtil.ObjToStr(info.get("BIRTHDAY"), "");
				String ENTRCOMP_DATA = StringUtil.ObjToStr(info.get("ENTRCOMP_DATA"), "");
				
				
				if(BIRTHDAY.length() > 10){
					BIRTHDAY = BIRTHDAY.substring(0, 10).replaceAll("-", "");
					info.put("BIRTHDAY", BIRTHDAY);
				}
				
				if(ENTRCOMP_DATA.length() > 10){
					ENTRCOMP_DATA = ENTRCOMP_DATA.substring(0, 10).replaceAll("-", "");
					info.put("ENTRCOMP_DATA", ENTRCOMP_DATA);
				}

				
				sqlSession.update(NAMEPSACE+"UserUpdate", info);
				
				String AUTH_GROUP_TEMP = StringUtil.ObjToStr( info.get("AUTH_GROUP_TEMP"));
				String AUTH_GROUP      = StringUtil.ObjToStr( info.get("AUTH_GROUP"));
				
				if(!AUTH_GROUP.equals(AUTH_GROUP_TEMP)){
					
					info.put("AUTH_GRADE", "S");
					
					sqlSession.delete(NAMEPSACE+"DELETE_SY_BUDMENU", info);
					sqlSession.insert(NAMEPSACE+"INSERT_SY_BUDMENU", info);
				}
			}// for
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				int dupleCnt = (Integer)sqlSession.selectOne(NAMEPSACE + "DUPLE_USER_ID" , info);
				
				System.out.println("dupleCnt = "+ dupleCnt);
				
				if(dupleCnt > 0){
					txManager.rollback(status);
					return -1;
				}else{
					sqlSession.insert(NAMEPSACE+"UserInsert", info);
					sqlSession.insert(NAMEPSACE+"User_INSERT_SYBUDMENU", info);
				}
			}// for
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return 0;
		}
		return 1;
	}
	
	
	
	public boolean saveTab( CommonMap param
						   ,List<Map<String, Object>> addList1 ,List<Map<String, Object>> addList2 ,List<Map<String, Object>> addList3
						   ,List<Map<String, Object>> uptList1 ,List<Map<String, Object>> uptList2 ,List<Map<String, Object>> uptList3
	          			   ,List<Map<String, Object>> delList1 ,List<Map<String, Object>> delList2 ,List<Map<String, Object>> delList3){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			
			for(int i = 0; i<delList1.size(); i++){
				Map<String, Object> info  = delList1.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_TEMPLE_USER_FAMILY_MGT", info);
			}
			
			for(int i = 0; i<uptList1.size(); i++){
				Map<String, Object> info  = uptList1.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String BIRTHDAY = StringUtil.ObjToStr(info.get("BIRTHDAY"), "");
				
				if(BIRTHDAY.length() > 10){
					BIRTHDAY = BIRTHDAY.substring(0, 10).replaceAll("-", "");
					info.put("BIRTHDAY", BIRTHDAY);
				}
				sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_USER_FAMILY_MGT", info);
			}
			
			
			for(int i = 0; i<addList1.size(); i++){
				Map<String, Object> info  = addList1.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				String BIRTHDAY = StringUtil.ObjToStr(info.get("BIRTHDAY"), "");
				if(BIRTHDAY.length() > 10){
					BIRTHDAY = BIRTHDAY.substring(0, 10).replaceAll("-", "");
					info.put("BIRTHDAY", BIRTHDAY);
				}
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_TEMPLE_USER_FAMILY_MGT", info);
			}
			
			
			
			
			
			
			for(int i = 0; i<delList2.size(); i++){
				Map<String, Object> info  = delList2.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_TEMPLE_USER_SCHOLAR", info);
			}
			
			for(int i = 0; i<uptList2.size(); i++){
				Map<String, Object> info  = uptList2.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String SDATE = StringUtil.ObjToStr(info.get("SDATE"), "");
				String EDATE = StringUtil.ObjToStr(info.get("EDATE"), "");
				
				if(SDATE.length() > 10){
					SDATE = SDATE.substring(0, 10).replaceAll("-", "");
					info.put("SDATE", SDATE);
				}
				if(EDATE.length() > 10){
					EDATE = EDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDATE", EDATE);
				}
				System.out.println(info);
				
				sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_USER_SCHOLAR", info);
			}
			
			
			for(int i = 0; i<addList2.size(); i++){
				Map<String, Object> info  = addList2.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String SDATE = StringUtil.ObjToStr(info.get("SDATE"), "");
				String EDATE = StringUtil.ObjToStr(info.get("EDATE"), "");
				
				if(SDATE.length() > 10){
					SDATE = SDATE.substring(0, 10).replaceAll("-", "");
					info.put("SDATE", SDATE);
				}
				if(EDATE.length() > 10){
					EDATE = EDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDATE", EDATE);
				}
				
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_TEMPLE_USER_SCHOLAR", info);
			}
			
			
			
			for(int i = 0; i<delList3.size(); i++){
				Map<String, Object> info  = delList3.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				sqlSession.delete(NAMEPSACE+"DELETE_ASP_TEMPLE_USER_EDU_MGT", info);
			}
			
			for(int i = 0; i<uptList3.size(); i++){
				Map<String, Object> info  = uptList3.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String EDU_SDATE = StringUtil.ObjToStr(info.get("EDU_SDATE"), "");
				String EDU_EDATE = StringUtil.ObjToStr(info.get("EDU_EDATE"), "");
				
				if(EDU_SDATE.length() > 10){
					EDU_SDATE = EDU_SDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDU_SDATE", EDU_SDATE);
				}
				if(EDU_EDATE.length() > 10){
					EDU_EDATE = EDU_EDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDU_EDATE", EDU_EDATE);
				}
				
				sqlSession.update(NAMEPSACE+"UPDATE_ASP_TEMPLE_USER_EDU_MGT", info);
			}
			
			
			
			for(int i = 0; i<addList3.size(); i++){
				Map<String, Object> info  = addList3.get(i);
				info.put("C_USER_ID"  , param.getString("C_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				info.put("V_REMOTE"   , param.getString("V_REMOTE"));
				
				
				String EDU_SDATE = StringUtil.ObjToStr(info.get("EDU_SDATE"), "");
				String EDU_EDATE = StringUtil.ObjToStr(info.get("EDU_EDATE"), "");
				
				if(EDU_SDATE.length() > 10){
					EDU_SDATE = EDU_SDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDU_SDATE", EDU_SDATE);
				}
				if(EDU_EDATE.length() > 10){
					EDU_EDATE = EDU_EDATE.substring(0, 10).replaceAll("-", "");
					info.put("EDU_EDATE", EDU_EDATE);
				}
				
				sqlSession.insert(NAMEPSACE+"INSERT_ASP_TEMPLE_USER_EDU_MGT", info);
			}
			
			
			
			
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
