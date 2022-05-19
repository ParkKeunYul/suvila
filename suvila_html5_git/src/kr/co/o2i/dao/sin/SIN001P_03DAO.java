package kr.co.o2i.dao.sin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.util.CommonUtil;

@Repository
public class SIN001P_03DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_03DAO.";
	
	public List<Map<String, Object>> SELECT_BOKWI(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_BOKWI",param,result );
		return list;
	}
	
	public List<Map<String, Object>> SELECT_BOKWI_GBN(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		if("".equals(param.getString("V_DEATH_BUD_NO", ""))) {
			sqlSession.select(NAMEPSACE+"SELECT_BOKWI_GBN",param,result );
		}else {
			sqlSession.select(NAMEPSACE+"SELECT_BOKWI2_GBN",param,result );
		}
		
		
		return list;
	}
	
	public List<Map<String, Object>> SELECT_SIN_DEATH_INFO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		sqlSession.select(NAMEPSACE+"SELECT_SIN_DEATH_INFO",param,result );
		return list;
	}
	
	public Map<String, Object> saveSindoDeath( CommonMap param					    
								  ,List<Map<String, Object>> addList
								  ,List<Map<String, Object>> uptList
								  ,List<Map<String, Object>> delList){
		
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
		
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("success", true);
		resultMap.put("msg"    , Const.SUC_MSG);
		
		try{
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));

				
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER" , info);
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_DEATH_INFO" , info);
				sqlSession.delete(NAMEPSACE+"DELETE_SIN_DEATH_BOKWI_INFO" , info);
				
			}// for
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER" , info);
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_DEATH_INFO" , info);
				sqlSession.update(NAMEPSACE+"UPDATE_SIN_DEATH_BOKWI_INFO" , info);
				sqlSession.update(NAMEPSACE+"UPDATE_REC_YOUNGTOP_YOUNGGA" , info);
			}// for
			
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_ADMIN_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				
				String DECE_BUD_NO = StringUtil.ObjToStr( info.get("DECE_BUD_NO") , "" );
				
				
				if("".equals( DECE_BUD_NO )){
					
					Map<String, Object> rtnInfo  = getDeceBudNo(sqlSession , info);
					
					System.out.println("rtnInfo = "+ rtnInfo);
					
					boolean  success =  StringUtil.ObjToBol( rtnInfo.get("success") );
					if(!success){
						resultMap.put("success", success);
						resultMap.put("msg"    , rtnInfo.get("msg"));
						
						txManager.rollback(status);
						return resultMap;
					}else{
						DECE_BUD_NO =  StringUtil.ObjToStr( rtnInfo.get("DECE_BUD_NO") ); 
						
						info.put("DECE_BUD_NO", DECE_BUD_NO);
						info.put("V_BUD_CODE" , DECE_BUD_NO.substring(0,10));
					}
					
					
					sqlSession.insert(NAMEPSACE+"INSERT_SIN_CARD_MASTER" , info);
					
					
					
				}else{
					sqlSession.update(NAMEPSACE+"UPDATE_SIN_CARD_MASTER" , info);
					sqlSession.update(NAMEPSACE+"UPDATE_REC_YOUNGTOP_YOUNGGA" , info);
				}
				
				int DUPLE_YOUNT = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_DUPLE_YOUNG" , info);
				
				if( DUPLE_YOUNT > 0){
					sqlSession.update(NAMEPSACE+"UPDATE_SIN_DEATH_INFO" , info);
				}else{
					sqlSession.insert(NAMEPSACE+"INSERT_SIN_DEATH_INFO" , info);
				}
				
				
				int DUPLE_BOKWI = (Integer)sqlSession.selectOne(NAMEPSACE+"SELECT_DUPLE_BOKWI" , info);
				if( DUPLE_BOKWI > 0){
					sqlSession.update(NAMEPSACE+"UPDATE_SIN_DEATH_BOKWI_INFO" , info);
				}else{
					sqlSession.insert(NAMEPSACE+"INSERT_SIN_DEATH_BOKWI_INFO" , info);
				}
				
			}// for
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			
			resultMap.put("success", false);
			resultMap.put("msg",Const.ERR_MSG );
			
			return resultMap;
		}
		return resultMap;
		
	}
	
	
	public Map<String, Object> getDeceBudNo( SqlSession sqlSession 
			                    		    ,Map<String, Object> info)throws Exception{
		
		
		Map<String, Object> rtn = new HashMap<String, Object>();
		
		rtn.put("success", false);
		try{
			
			String sDEceBudNo = "";
			String sTempno    = (String)sqlSession.selectOne(NAMEPSACE+"SELECT_MAX_DECE_BUD_NO",info) ;
			String[] chekNo   = sTempno.split("-");
			
			if(CommonUtil.str2int(chekNo[3]) < 99){
				sDEceBudNo = chekNo[0] + "-" + chekNo[1] + "-" + chekNo[2] + "-" + CommonUtil.emptyTozero(CommonUtil.str2int(chekNo[3])+1, 2);
			}
			else if(CommonUtil.str2int(chekNo[2]) < 9){
				sDEceBudNo = chekNo[0] + "-" + chekNo[1] + "-" + (CommonUtil.str2int(chekNo[2])+1) + "-00";
			}
			else if(CommonUtil.str2int(chekNo[1]) < 99999){
				sDEceBudNo = chekNo[0] + "-" + CommonUtil.emptyTozero(CommonUtil.str2int(chekNo[1])+1, 5) +  "-0-00";
			}else if(CommonUtil.str2int(chekNo[0].substring(1,2)) < 9){
				sDEceBudNo = "영" + (CommonUtil.str2int(chekNo[0].substring(1,2))+1) + "-00000-0-00";
			}else{
				//throw new Exception("더이상 영가번호를 생성 할 수 없습니다.");
				rtn.put("msg"        , "더이상 영가번호를 생성 할 수 없습니다.");
				return rtn;
			}
			
			rtn.put("DECE_BUD_NO", sDEceBudNo);
			rtn.put("success"    , true);
			
		}catch (Exception e) {
			e.printStackTrace();
			
			rtn.put("success"    , false);
			rtn.put("msg"        , "오류가 발생했습니다.");
		}
		return rtn;
	}
	
	
	
}
