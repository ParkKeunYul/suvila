package kr.co.o2i.controller.ser;

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
import kr.co.o2i.dao.ser.SER023W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/ser/SER023W_01/*")
public class SER023W_01_Controller extends DefaultController {

	@Autowired
	SER023W_01DAO SER023W_01dao;
	
	@RequestMapping(value="confCodeSelect.suvila")
	public @ResponseBody Map<String,Object> confCodeSelect( Map<String, Object> map
			                                       		   ,HttpServletRequest request
			                                       		   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			
			String V_FIND_CONFNAME = URLDecoder.decode(param.getString("V_FIND_CONFNAME"), "UTF-8");
			param.put("V_FIND_CONFNAME", V_FIND_CONFNAME);
			
			
			storeInfo.put("list", SER023W_01dao.SELECT_SIN_BUDDHISM_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="confCodeSave.suvila")
	public @ResponseBody Map<String,Object> confCodeSave( Map<String, Object> map
			                                     		 ,HttpServletRequest request
			                                     		 ,HttpServletResponse response ){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_ADMIN_ID" , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag  = SER023W_01dao.confCodeSave(param, addList , uptList , delList);
			
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
	
	@RequestMapping(value="getconfCodeSelect.suvila")
	public @ResponseBody Map<String,Object> getconfCodeSelect( Map<String, Object> map
															  ,HttpServletRequest request
			                                       		   	  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			
			String V_FIND_CONFNAME = URLDecoder.decode(param.getString("V_FIND_CONFNAME"), "UTF-8");
			param.put("V_FIND_CONFNAME", V_FIND_CONFNAME);
			
			
			storeInfo.put("list", SER023W_01dao.SELECT_SIN_BUDDHISM_MGT_SELECT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//getconfCodeSelect
	
	
	@RequestMapping(value="getconfCodeAll.suvila")
	public @ResponseBody Map<String,Object> getconfCodeAll( Map<String, Object> map
														   ,HttpServletRequest request
			                                       		   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			
			String V_FIND_CONFNAME = URLDecoder.decode(param.getString("V_FIND_CONFNAME"), "UTF-8");
			param.put("V_FIND_CONFNAME", V_FIND_CONFNAME);
			
			
			storeInfo.put("list", SER023W_01dao.SELECT_SIN_BUDDHISM_MGT_ALL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//getconfCodeAll
	
	
	
	
	
	
}//SER023W_01_Controller
