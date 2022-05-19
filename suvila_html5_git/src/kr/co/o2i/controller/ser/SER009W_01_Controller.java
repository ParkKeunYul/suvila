package kr.co.o2i.controller.ser;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.ser.SER009W_01DAO;

@Controller
@RequestMapping ("/ser/SER009W_01/*")
public class SER009W_01_Controller extends DefaultController {

	@Autowired
	SER009W_01DAO SER009W_01dao;
	
	@RequestMapping(value="menuSelect.suvila")
	public @ResponseBody Map<String,Object> menuSelect(Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			storeInfo.put("list", SER009W_01dao.SELECT_SY_MENU(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	@RequestMapping(value="menuSelectAuth.suvila")
	public @ResponseBody Map<String,Object> menuSelectAuth(Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"  , request.getRemoteAddr());
			
			storeInfo.put("list", SER009W_01dao.SELECT_SY_AUTHMENU(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelectAuth
	
	
	@RequestMapping(value="authMenuSave.suvila")
	public @ResponseBody Map<String,Object> authMenuSave( Map<String, Object> map
			                                             ,HttpServletRequest request
			                                             ,HttpServletResponse response ){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData = param.getString("newData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag  = SER009W_01dao.authMenuSave(param, addList, delList);
			
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
	
}//SER009W_01_Controller
