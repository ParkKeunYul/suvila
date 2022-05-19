package kr.co.o2i.controller.cms;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.cms.CMS001W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/cms/CMS001W_01/*")
public class CMS001W_01_Controller extends DefaultController {

	@Autowired
	CMS001W_01DAO CMS001W_01dao;
	
	@RequestMapping(value="selectTempleCMSInfo.suvila")
	public @ResponseBody Map<String,Object> selectTempleCMSInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			
			storeInfo.put("list", CMS001W_01dao.SELECT_ASP_TEMPLE_CMS_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectSindoCMSInfo.suvila")
	public @ResponseBody Map<String,Object> selectSindoCMSInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			param.put("page",  param.getInt("page", 1) );
			param.put("limit",  param.getInt("limit", 100) );
			
			
			//storeInfo.put("totalCount", CMS001W_01dao.SELECT_SIN_CMS_INFO_CNT(param));
			storeInfo.put("list", CMS001W_01dao.SELECT_SIN_CMS_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectSindoCmsRecInfo.suvila")
	public @ResponseBody Map<String,Object> selectSindoCmsRecInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", CMS001W_01dao.SELECT_SIN_CMS_REC_CNT(param));
			storeInfo.put("file", CMS001W_01dao.SELECT_SIN_CMS_AUTH_FILE(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
			
	
	
	@RequestMapping(value="onTerminate.suvila" , method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> onTerminate(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response)throws Exception{
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		
		param.put("V_USER_ID", adminSession.get("USER_ID"));
		param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
		
		try{
			String uptData = param.getString("uptData","");
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			//CMS001W_01dao.onTerminate(param,  uptList);
			
			boolean dbFlag =  CMS001W_01dao.onTerminate(param,  uptList);
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
	
	
	@RequestMapping(value="onDel.suvila" , method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> onDel(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response)throws Exception{
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		
		param.put("V_USER_ID", adminSession.get("USER_ID"));
		param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
		
		try{
			String uptData = param.getString("delData","");
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			//CMS001W_01dao.onTerminate(param,  uptList);
			
			boolean dbFlag =  CMS001W_01dao.onDel(param,  uptList);
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
	
	@RequestMapping(value="onSave.suvila" , method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> onSave(Map<String, Object> map
												  ,HttpServletRequest request
												  ,HttpServletResponse response
												  ,@RequestParam("FILE_NAME") MultipartFile FILE_NAME)throws Exception{
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			
			
			String newData = param.getString("newData");
			
			Map<String, Object> info =  StringUtil.jsonToArray(newData).get(0);
			
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE",    param.getString("V_REMOTE"));
			
			
			
			String sqlMode = StringUtil.ObjToStr( info.get("SQL_MODE") );
			
			
			info.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			info.put("V_USER_ID"  , adminSession.get("USER_ID"));
			info.put("V_REMOTE"   , param.getString("V_REMOTE"));
			
			boolean dbFlag = false;
			if("I".equals(sqlMode)){
				dbFlag = CMS001W_01dao.insertCms( info ,FILE_NAME);		
			}else{
				dbFlag = CMS001W_01dao.updateCms( info ,FILE_NAME);
			}
			
			//dbFlag = false;
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
	
	@RequestMapping(value="selectRecSindoCMSInfo.suvila")
	public @ResponseBody Map<String,Object> selectRecSindoCMSInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE",    param.getString("V_REMOTE"));
			
			storeInfo.put("list", CMS001W_01dao.SELECT_REC_SIN_CMS_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
}
