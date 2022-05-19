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

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.asp.ASP010w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp010w_01/*")
public class ASP010w_01_Controller extends DefaultController {

	@Autowired
	ASP010w_01DAO ASP010w_01dao;
	
	
	@RequestMapping(value="selectCMSInfo.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println("param = "+ param);
			
			storeInfo.put("list", ASP010w_01dao.SELECT_CMS_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	
	
	@RequestMapping(value="selectPaymentDay.suvila")
	public @ResponseBody Map<String,Object> selectPaymentDay(Map<String, Object> map
			                                         		,HttpServletRequest request
			                                         		,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println("selectPaymentDay = " + param);
			
			storeInfo.put("list", ASP010w_01dao.SELECT_PAYMENT_DAY(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="saveCMSInfo.suvila")
	public @ResponseBody Map<String,Object> saveCMSInfo(Map<String, Object> map
	                                         		   ,HttpServletRequest request
	                                         		   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			System.out.println("USE_YN_FIELD = "+  param.getString("USE_YN_FIELD"));
			
			param.put("USE_YN", param.getString("USE_YN_FIELD"));
			
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = ASP010w_01dao.transactSave(param, uptList);
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

