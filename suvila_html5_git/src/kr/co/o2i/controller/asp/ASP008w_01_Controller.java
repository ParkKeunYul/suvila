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
import kr.co.o2i.dao.asp.ASP008w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp008w_01/*")
public class ASP008w_01_Controller extends DefaultController {

	@Autowired
	ASP008w_01DAO ASP008w_01dao;
	
	
	@RequestMapping(value="selectKwan.suvila")
	public @ResponseBody Map<String,Object> selectCMS(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP008w_01dao.SELECT_KWAN(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	@RequestMapping(value="selectHang.suvila")
	public @ResponseBody Map<String,Object> selectHang(Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP008w_01dao.SELECT_HANG(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="leftSave.suvila")
	public @ResponseBody Map<String,Object> baseTempleMenuSave(Map<String, Object> map
												              ,HttpServletRequest request
												              ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String newData = param.getString("leftNewData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			boolean dbFlag =  ASP008w_01dao.transactLeftSave(param, addList);
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
	
	
	@RequestMapping(value="rightSave.suvila")
	public @ResponseBody Map<String,Object> rightSave(Map<String, Object> map
												     ,HttpServletRequest request
												     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String newData = param.getString("rightNewData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			boolean dbFlag =  ASP008w_01dao.transactRightSave(param, addList);
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

