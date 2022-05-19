package kr.co.o2i.controller.sin;

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
import kr.co.o2i.dao.sin.SIN004W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN004W_01/*")
public class SIN004W_01_Controller extends DefaultController{
	

	@Autowired
	SIN004W_01DAO Sin004w_01dao;
	
	
	@RequestMapping(value="selectBuddhismInfo.suvila")
	public @ResponseBody Map<String,Object> selectBuddhismInfo( Map<String, Object> map
															   ,HttpServletRequest request
												   		 	   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			
			storeInfo.put("list", Sin004w_01dao.SELECT_SIN_BUDDHISM_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectSindoCard
	
	@RequestMapping(value="saveBuddhismInfo.suvila")
	public @ResponseBody Map<String,Object> saveBuddhismInfo( Map<String, Object> map
												   		     ,HttpServletRequest request
												   		     ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try {
			
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = Sin004w_01dao.saveBuddhismInfo(param, addList, uptList, delList);
			
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
	
}
