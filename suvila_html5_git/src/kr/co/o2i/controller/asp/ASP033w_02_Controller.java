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
import kr.co.o2i.dao.asp.ASP033w_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/ASP033W_02/*")
public class ASP033w_02_Controller extends DefaultController {

	@Autowired
	ASP033w_02DAO ASP033w_02Dao;
	
	@RequestMapping(value="selectMonth.suvila")
	public @ResponseBody Map<String,Object> selectMonth( Map<String, Object> map
			                                      	    ,HttpServletRequest request
			                                      	    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println(param);
			
			storeInfo.put("list", ASP033w_02Dao.SELECT_ISSUE_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectDay.suvila")
	public @ResponseBody Map<String,Object> selectDay(Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			storeInfo.put("list", ASP033w_02Dao.SELECT_ISSUE_INFO_DETAIL(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
	
}

