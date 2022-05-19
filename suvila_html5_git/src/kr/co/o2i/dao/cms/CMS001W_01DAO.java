package kr.co.o2i.dao.cms;

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
public class CMS001W_01DAO extends DefaultDAO{
	
	
	
	
	public String NAMEPSACE = "CMS001w_01DAO.";
	
	
	public List<Map<String, Object>> SELECT_ASP_TEMPLE_CMS_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		System.out.println(param);
		
		sqlSession.select(NAMEPSACE+"SELECT_ASP_TEMPLE_CMS_INFO",param,result );
		return list;
	}
	
	
	/*  접수 신도 CMS 정보 조회  */
	public List<Map<String, Object>> SELECT_SIN_CMS_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		if("T".equals(param.getString("V_CMS_DEL_YN",""))){
			sqlSession.select(NAMEPSACE+"SELECT_SIN_CMS_INFO_T",param,result );
		}else{
			sqlSession.select(NAMEPSACE+"SELECT_SIN_CMS_INFO_ALL",param,result );
			
			/*if( "9999999".equals(param.getString("limit"))  ){
				
			}else{
				sqlSession.select(NAMEPSACE+"SELECT_SIN_CMS_INFO",param,result );
			}*/
		}
		return list;
	}

	
	public int SELECT_SIN_CMS_INFO_CNT(CommonMap param){
		
		if("T".equals(param.getString("V_CMS_DEL_YN",""))){
			return (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_SIN_CMS_INFO_CNT",param );
		}else{
			return (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_SIN_CMS_INFO_CNT",param );
		}
		
	}
	
	public List<Map<String, Object>> SELECT_SIN_CMS_AUTH_FILE(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_SIN_CMS_AUTH_FILE",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_REC_SIN_CMS_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_REC_SIN_CMS_INFO",param,result );
		return list;
	}
	
	
	
	public int SELECT_SIN_CMS_REC_CNT(CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_SIN_CMS_REC_CNT",param );
	}
	
	
	public boolean onTerminate(CommonMap param
					          ,List<Map<String, Object>> uptList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			CMS001W_01PRO cms001w_01pro = new CMS001W_01PRO();
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				System.out.println(info);
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CMS_INFO", info);
				
				
				cms001w_01pro.insertSindoCMSInfoHis(sqlSession, NAMEPSACE, info);
				
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
	
	
	
	
	
	public boolean onDel(CommonMap param
	                    ,List<Map<String, Object>> delList){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"  , param.getString("V_USER_ID"));
				info.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"DELETE_SIN_CMS_INFO", info);
				sqlSession.delete(NAMEPSACE+"DELETE_SIN_CMS_MEMBER_HIS", info);
				
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
	
	
	public int getSinCmsInfoAccountSeq(CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"getSinCmsInfoAccountSeq",param );
	}
	
	public int getDupleMemberId(CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"getDupleMemberId",param );
	}
	
	public int getNewAccountSeq(CommonMap param){
		return (Integer)sqlSession.selectOne(NAMEPSACE+"getNewAccountSeq",param );
	}
	
	public String SELECT_NEW_CMS_TRADE_CD(CommonMap param){
		return (String)sqlSession.selectOne(NAMEPSACE+"SELECT_NEW_CMS_TRADE_CD",param );
	}
	
	public void INSERT_SIN_CMS_INFO(CommonMap param){
		sqlSession.update(NAMEPSACE+"INSERT_SIN_CMS_INFO", param);
	}
	
	
	public boolean insertCms(Map<String, Object> info
			                ,MultipartFile FILE_NAME){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		CMS001W_01PRO cms001w_01pro = new CMS001W_01PRO();
		try{
			
			cms001w_01pro.insertSindoCMSInfo(sqlSession, NAMEPSACE, info, FILE_NAME);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return false;
		}
		
		return true;
	}
	
	public boolean updateCms( Map<String, Object> info 
			                 ,MultipartFile FILE_NAME){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		CMS001W_01PRO cms001w_01pro = new CMS001W_01PRO();
		try{
			
			String ORG_CMS_STATUS = StringUtil.ObjToStr( info.get("ORG_CMS_ACCOUNT_STATUS") );
			String CMS_STATUS     = StringUtil.ObjToStr( info.get("CMS_ACCOUNT_STATUS") );
			
			cms001w_01pro.updateSindoInfo(sqlSession, NAMEPSACE, info); // 신도 주민번호 핸드폰번호 변경
			
			// CMS 계좌 상태 - (1 : 신청, 2 : 정상, 3 : 해지, 4 : 실패)
			if("2".equals(ORG_CMS_STATUS) && "3".equals(CMS_STATUS)){
				/*
				 해지로직은 따로 넣어놈음.. 작동 안하도록 막자
				System.out.println("cms001w_01pro.updateSindoCMSInfo");
				cms001w_01pro.updateSindoCMSInfo(sqlSession, NAMEPSACE, info);
				*/
			}
			else if(!"4".equals(ORG_CMS_STATUS)){
				System.out.println("cms001w_01pro.updateFailCmsChange");
				cms001w_01pro.updateBasicCmsInfo(sqlSession, NAMEPSACE, info);
			}
			else{
				// 인증에 실패한 경우 모든 정보 UPDATE
				System.out.println("updateSindoCMSInfoFail");
				cms001w_01pro.updateSindoCMSInfoFail(sqlSession, NAMEPSACE, info ,FILE_NAME);
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
