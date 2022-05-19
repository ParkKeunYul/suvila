package kr.co.o2i.controller.asp;

import java.net.URLDecoder;
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
import kr.co.o2i.dao.asp.ASP021w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp021w_01/*")
public class ASP021w_01_Controller extends DefaultController {

	@Autowired
	ASP021w_01DAO ASP021w_01dao;
	
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> select(Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println(param);
			
			
			String PGNAME  =  URLDecoder.decode(param.getString("PGNAME"), "UTF-8");
			param.put("PGNAME", PGNAME);
			
			
			storeInfo.put("list", ASP021w_01dao.selectPgInfo(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectHis.suvila")
	public @ResponseBody Map<String,Object> selectHis(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP021w_01dao.selectPgInfoHis(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="savePG.suvila")
	public @ResponseBody Map<String,Object> savePG(Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			String newData = param.getString("newData","");
			
			param.put("CRT_USER", adminSession.get("USER_ID"));
			param.put("UPT_USER", adminSession.get("USER_ID"));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			System.out.println(param);
			
			
			boolean dbFlag =  ASP021w_01dao.savePg(param, addList);
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
	
	
	@RequestMapping(value="savePgHis.suvila")
	public @ResponseBody Map<String,Object> savePgHis(Map<String, Object> map
									                 ,HttpServletRequest request
									                 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("CRT_USER", adminSession.get("USER_ID"));
			param.put("UPT_USER", adminSession.get("USER_ID"));
			
			boolean dbFlag = ASP021w_01dao.savePgHis(param);
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

