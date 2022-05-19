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
import kr.co.o2i.dao.asp.ASP022w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp022w_01/*")
public class ASP022w_01_Controller extends DefaultController {

	@Autowired
	ASP022w_01DAO ASP022w_01dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println(param);
			
			
			storeInfo.put("list", ASP022w_01dao.SELECT_TEMPLE_PG_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectHis.suvila")
	public @ResponseBody Map<String,Object> selectPgInfoHis(Map<String, Object> map
					                                       ,HttpServletRequest request
					                                       ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP022w_01dao.SELECT_TEMPLE_PG_INFO_HIS(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save(Map<String, Object> map
									            ,HttpServletRequest request
									            ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("CRT_USER", adminSession.get("USER_ID"));
			param.put("UPT_USER", adminSession.get("USER_ID"));
			
			
			String appNewData = param.getString("newData");
			String appUptData = param.getString("uptData");
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(appNewData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(appUptData);
			
			boolean dbFlag = ASP022w_01dao.save(param , addList,uptList);
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
	}//savePG
	
}//ASP006w_01_Controller

