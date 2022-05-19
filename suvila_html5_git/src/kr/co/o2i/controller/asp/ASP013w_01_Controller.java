package kr.co.o2i.controller.asp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.common.Const;
import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.asp.ASP013w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp013w_01/*")
public class ASP013w_01_Controller extends DefaultController {

	@Autowired
	ASP013w_01DAO ASP013w_01dao;
	
	
	/* CMS 조회  */
	@RequestMapping(value="selectCMS.suvila")
	public @ResponseBody Map<String,Object> selectCMS(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP013w_01dao.SELECT_CMS(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/* SMS 조회  */
	@RequestMapping(value="selectSMS.suvila")
	public @ResponseBody Map<String,Object> selectSMS(Map<String, Object> map
	                                         		 ,HttpServletRequest request
	                                         		 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("GV_SMS_U"	,  	Const.SMS_TO_USER);			
			param.put("GV_SMS_E"	,  	7.2);						
			param.put("GV_LMS_U"	,  	Const.LMS_TO_USER);			
			param.put("GV_LMS_E"	,  	23.64);						
			
			
			List<Map<String, Object>> list = ASP013w_01dao.SELECT_SMS(param);
			
			storeInfo.put("list", list);
			
			
			rtnData.put("msg", Const.SUC_MSG);
			rtnData.put("success", true);
			rtnData.put("data", storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	/* SMS 통신사별합계조회  */
	@RequestMapping(value="selectSMSsummary.suvila")
	public @ResponseBody Map<String,Object> selectSMSsummary(Map<String, Object> map
			                                         		,HttpServletRequest request
			                                         		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("GV_SMS_U"	,  	Const.SMS_TO_USER);								// SMS 청구요금 20
			param.put("GV_SMS_E"	,  	Const.SMS_TO_ENTERPRISE);						// SMS 지불요금 9.5
			param.put("GV_LMS_U"	,  	Const.LMS_TO_USER);								// LMS 청구요금 41
			param.put("GV_LMS_E"	,  	Const.LMS_TO_ENTERPRISE);						// LMS 지불요금 26
			
			
			System.out.println(param);
			storeInfo.put("list", ASP013w_01dao.SELECT_SMS_SUMMARY(param));
			rtnData.put("msg", Const.SUC_MSG);
			rtnData.put("success", true);
			rtnData.put("data", storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
}

