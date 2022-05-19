package kr.co.o2i.dao.sin;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class SIN001P_08DAO extends DefaultDAO{

	
	public String NAMEPSACE = "SIN001p_08DAO.";
	
	
	public List<Map<String, Object>> SELECT_BUDNO(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		
		
		sqlSession.select(NAMEPSACE+"SELECT_BUDNO",param,result );
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public boolean save( CommonMap param ){
		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());
			
		
		InputStream is = null;
		try{
			
			CommonUtil.insertBudCodeChangeHis(sqlSession, param);
			CommonUtil.updateRecMasterProposal(sqlSession, param);
			
			
			int size = 0;
			
			List<Map<String, Object>> list = sqlSession.selectList(NAMEPSACE+"SELECT_SAVE_BUDNO", param);
			
			if(list.size() > 0 ){
				for(int index=0; index < list.size(); index++){
					Map map = (Map)list.get(index); 
					
					map.put("V_TEMPLE_CD", param.getString("V_TEMPLE_CD"));
					
					/* 신도사진 조회 */
					List listimage = CommonUtil.selectImage(sqlSession, map);
					System.out.println(listimage.size());
					
					if(listimage.size() >0){
						Map<String, Object> blobmap = (Map<String, Object>)listimage.get(0);
						
						if(blobmap != null) {
							if(!"".equals( StringUtil.ObjToStr(blobmap.get("LEN"), "")) && !"null".equals( StringUtil.ObjToStr(blobmap.get("LEN").toString(), ""))  ){
								size = Integer.parseInt(blobmap.get("LEN").toString());
								if(size>0){
									is	= (InputStream)blobmap.get("PICTURE");	
								}
							}	
						}
						
												
					}// if listimage
					
					map.put("new_budCd", param.getString("V_BUD_CODE_AFTER"));
					map.put("old_budCd", map.get("V_BUD_NO"));
					
					
					sqlSession.insert(NAMEPSACE+"insertSinCardMaster",map);
					
					if(size>0){
						byte[] filebyte = new byte[size];
						is.read(filebyte);	
						map.put("filebyte", filebyte);
						sqlSession.update(NAMEPSACE+"updatePicture", map);
						
						is.close();
					}
					
					/* 신도번호 전체 변경 */
					Map<String, Object> changeInfo = new HashMap<String, Object>();
					changeInfo.put("V_TEMPLE_CD", map.get("V_TEMPLE_CD"));
					changeInfo.put("TEMPLE_CD"  , map.get("V_TEMPLE_CD"));
					changeInfo.put("O_BudCd"    , map.get("V_BUD_NO"));
					changeInfo.put("N_BudCd"    , map.get("NEW_BUD_NO"));
					changeInfo.put("CRT_USER"   , param.getString("V_USER_ID"));
					changeInfo.put("REMOTE"     , param.getString("V_REMOTE"));
					
					System.out.println("changeInfo = "+ changeInfo);
					
					boolean rtnFlag = CommonUtil.changeBudCd2(sqlSession, changeInfo);;
					
					if(!rtnFlag) {
						throw new Exception();
					}
					
					sqlSession.delete(NAMEPSACE+"deleteSinCardMaster", map);
					
				}// for
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
}//SIN001P_08DAO
