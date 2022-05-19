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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.ser.SER020W_01DAO;
import kr.co.o2i.dao.ser.SER021W_01DAO;

@Controller
@RequestMapping ("/ser/SER020W_01/*")
public class SER020W_01_Controller extends DefaultController {

	@Autowired
	SER020W_01DAO SER020W_01dao;
	
	@RequestMapping(value="announceSelect.suvila")
	public @ResponseBody Map<String,Object> announceSelect( Map<String, Object> map
			                                          	   ,HttpServletRequest request
			                                               ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			
			
			storeInfo.put("list", SER020W_01dao.SELECT_ASP_ANNOUNCE(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="announceSave.suvila")
	public @ResponseBody Map<String,Object> announceSave( Map<String, Object> map
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
			
			boolean dbFlag  = SER020W_01dao.announceSave(param, addList ,uptList , delList);
			
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
	
}//SER021W_01_Controller
