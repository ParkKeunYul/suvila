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
import kr.co.o2i.dao.asp.ASP033w_01DAO;
import kr.co.o2i.dao.asp.ASP044w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/ASP044W_01/*")
public class ASP044w_01_Controller extends DefaultController {

	@Autowired
	ASP044w_01DAO ASP044w_01Dao;
	
	@RequestMapping(value="selectID.suvila")
	public @ResponseBody Map<String,Object> selectID( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println(param);
			
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			
			param.put("V_USER_ID", "");
			
			System.out.println(param);
			
			storeInfo.put("list", ASP044w_01Dao.SELECT_IDREC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="Building.suvila")
	public @ResponseBody Map<String,Object> Building( Map<String, Object> map
			                                      	 ,HttpServletRequest request
			                                      	 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			storeInfo.put("list", ASP044w_01Dao.SELECT_Building(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="Deung.suvila")
	public @ResponseBody Map<String,Object> Deung( Map<String, Object> map
			                                      ,HttpServletRequest request
			                                      ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			
			storeInfo.put("list", ASP044w_01Dao.SELECT_Deng_NEW(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="ideungSave")
	public @ResponseBody Map<String,Object> ideungSave( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = ASP044w_01Dao.save(param, uptList);			
			
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
	}//save
	
	
	@RequestMapping(value="selectYD.suvila")
	public @ResponseBody Map<String,Object> selectYD( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println(param);
			
			
			param.put("V_TEMPLE_CD", param.getString("VV_TEMPLE_CD"));
			
			
			param.put("V_USER_ID", "");
			
			System.out.println(param);
			
			storeInfo.put("list", ASP044w_01Dao.SELECT_YDREC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="ydeungSave")
	public @ResponseBody Map<String,Object> ydeungSave( Map<String, Object> map
												 	   ,HttpServletRequest request
												 	   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE",    request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = ASP044w_01Dao.ydsave(param, uptList);			
			
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
	}//save
}

