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
import kr.co.o2i.dao.asp.ASP012w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp012w_01/*")
public class ASP012w_01_Controller extends DefaultController {

	@Autowired
	ASP012w_01DAO ASP012w_01dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP012w_01dao.SELECT_ACC_ACCOUNTS_MAPPER(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save(Map<String, Object> map
	                                         		 ,HttpServletRequest request
	                                         		 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
		
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag = ASP012w_01dao.transactSave(param, uptList);
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

