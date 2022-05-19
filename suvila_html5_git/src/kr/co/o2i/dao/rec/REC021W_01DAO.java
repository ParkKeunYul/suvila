package kr.co.o2i.dao.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.DefaultDAO;
import kr.co.o2i.handler.Result;
import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.CommonUtil;
import kr.co.o2i.util.StringUtil;

@Repository
public class REC021W_01DAO extends DefaultDAO {

	
	public String NAMEPSACE = "REC021w_01DAO.";
	
	public List<Map<String, Object>> SELECT_ACC(CommonMap param){
		Result result = new Result();
		List<Map<String, Object>>  list = result.resultList;
		sqlSession.select(NAMEPSACE+"SELECT_ACC",param,result );
		
		return list;
	}
	
	
	
	public Map<String, Object> save_acc( CommonMap param
							,List<Map<String, Object>> addList
							,List<Map<String, Object>> uptList
			  				,List<Map<String, Object>> delList) {

		TransactionStatus status = txManager.getTransaction(new DefaultTransactionDefinition());

		Map<String, Object> rtnInfo = new HashMap<String, Object>();
		
		rtnInfo.put("suc", false);
		rtnInfo.put("msg", Const.ERR_MSG);
		try{
			int FLAG_MGT = StringUtil.ObjectToInt( sqlSession.selectOne(NAMEPSACE+"FLAG_MGT", param) );
			if( FLAG_MGT > 0 ) {
				
				String yyyMMdd = param.getString("select_actdate").substring(0, 4)+"년 "+param.getString("select_actdate").substring(4, 6)+"월 "+param.getString("select_actdate").substring(6);
				
				rtnInfo.put("msg", yyyMMdd+"일은 마감처리된 일자입니다.<BR>마감처리된 일자의 데이터는 변경 할 수 없습니다.");
				return rtnInfo;
			}
			
			
			for(int i = 0; i<delList.size(); i++){
				Map<String, Object> info  = delList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				System.out.println(info);
				System.out.println(info);
				System.out.println(info);
				
				sqlSession.delete(NAMEPSACE+"DELETE_ACC", info);
			}
			
			
			for(int i = 0; i<uptList.size(); i++){
				Map<String, Object> info  = uptList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.update(NAMEPSACE+"UPDATE_ACC", info);
			}
			
			
			for(int i = 0; i<addList.size(); i++){
				Map<String, Object> info  = addList.get(i);
				info.put("V_USER_ID"   , param.getString("V_USER_ID"));
				info.put("V_REMOTE"    , param.getString("V_REMOTE"));
				info.put("V_TEMPLE_CD" , param.getString("V_TEMPLE_CD"));
				
				sqlSession.insert(NAMEPSACE+"INSERT_ACC", info);
			}
			
			rtnInfo.put("suc", true);
			rtnInfo.put("msg", Const.SUC_MSG);
			
			//txManager.rollback(status);
			txManager.commit(status);
		}catch (Exception e) {
			e.printStackTrace();
			txManager.rollback(status);
			return rtnInfo;
		}
		return rtnInfo;
	}
	
}// REC021W_01DAO
