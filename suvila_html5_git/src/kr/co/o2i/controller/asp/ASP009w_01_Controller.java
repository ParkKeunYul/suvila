package kr.co.o2i.controller.asp;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.asp.ASP009w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp009w_01/*")
public class ASP009w_01_Controller extends DefaultController {

	@Autowired
	ASP009w_01DAO ASP009w_01dao;
	
	
	@RequestMapping(value="selectAcc.suvila")
	public @ResponseBody Map<String,Object> selectAcc(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", param.getString("TEMP_V_TEMPLE_CD"));
			
			System.out.println(param);
			
			storeInfo.put("list", ASP009w_01dao.SELECT_ACC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="deleteAcc.suvila")
	public @ResponseBody Map<String,Object> deleteAcc(Map<String, Object> map
	                                         		 ,HttpServletRequest request
	                                         		 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_TEMPLE_CD", param.get("lc_templeCd"));
			
			
			
			boolean dbFlag = ASP009w_01dao.transactSave(param);
			
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
	}//
	
	
	
	
	
}

