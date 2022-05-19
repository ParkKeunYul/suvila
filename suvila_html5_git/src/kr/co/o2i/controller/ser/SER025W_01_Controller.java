package kr.co.o2i.controller.ser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.ser.SER021W_01DAO;
import kr.co.o2i.dao.ser.SER025W_01DAO;

@Controller
@RequestMapping ("/ser/SER025w_01/*")
public class SER025W_01_Controller extends DefaultController {

	@Autowired
	SER025W_01DAO SER025W_01dao;
	
	@RequestMapping(value="recCancleList.suvila")
	public @ResponseBody Map<String,Object> recCancleList( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			storeInfo.put("list", SER025W_01dao.SELECT_REC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	@RequestMapping(value="recReturn.suvila")
	public @ResponseBody Map<String,Object> recReturn( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response ){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_ADMIN_ID" , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			System.out.println("uptList = " + uptList.size());
			
			
			boolean dbFlag  = SER025W_01dao.UPDAET_CANCEL(param, uptList);
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
}//SER021W_01_Controller
